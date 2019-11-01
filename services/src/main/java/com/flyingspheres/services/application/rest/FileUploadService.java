package com.flyingspheres.services.application.rest;


import com.flyingspheres.services.application.ModelAdaptor;
import com.flyingspheres.services.application.models.Media;
import com.flyingspheres.services.application.models.ServerMessage;
import com.ibm.cloud.sdk.core.http.HttpMediaType;
import com.ibm.cloud.sdk.core.service.security.IamOptions;
import com.ibm.watson.speech_to_text.v1.SpeechToText;
import com.ibm.watson.speech_to_text.v1.model.RecognizeOptions;
import com.ibm.watson.speech_to_text.v1.model.SpeechRecognitionResults;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.commons.io.IOUtils;
import org.bson.Document;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.json.*;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Path("fileUpload")
public class FileUploadService {
    @Inject
    MongoDatabase mongoDb;

    @Resource( lookup = "mediaDataCollection", name= "mediaDataCollection")
    String mediaCollection;

    private final static String archivoNombre = "/credenciales.txt";
    private static String apiKeyString = null;
    private static String urlString = null;
    static {
        InputStream is = FileUploadService.class.getResourceAsStream(archivoNombre);
        if (is != null) {
            JsonReader reader = Json.createReader(is);
            JsonStructure jsonst = reader.read();

            JsonObject object = (JsonObject) jsonst;
            JsonString apiKey = (JsonString) object.get("apikey");
            JsonString url = (JsonString) object.get("url");
            apiKeyString = apiKey.getString();
            urlString = url.getString();
            System.out.println("URL String Initialized: " + urlString);
        }
        else {
            System.out.println("Credenciales es nulo");
        }
    }
    @Context
    private HttpServletRequest httpRequest;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces("application/json; charset=UTF-8")
    public Response uploadFile(){
        boolean isMultiPart = ServletFileUpload.isMultipartContent(httpRequest);
        String transcripcion = "Transcript failed";
        ServletFileUpload upload = new ServletFileUpload();
        ServerMessage message = new ServerMessage();
        String userId = null;
        String notas = null;
        String fileName = null;
        try {
            // Parse the request

            FileItemIterator iter = upload.getItemIterator(httpRequest);

            byte[] uploadedBytes = null;
            while (iter.hasNext()) {
                FileItemStream item = iter.next();
                String name = item.getFieldName();
                InputStream stream = item.openStream();
                if (item.isFormField()) {
                    if (name.equals("userId")){
                        userId = Streams.asString(stream);
                    }
                    else if (name.equals("notas")){
                        notas = Streams.asString(stream);
                    }
                } else {
                    System.out.println("File field " + name + " with file name " + item.getName() + " detected.");
                    fileName = item.getName();
                    uploadedBytes = IOUtils.toByteArray(stream);
                }
            }

            ByteArrayInputStream bis = new ByteArrayInputStream(uploadedBytes);

            try {
                SpeechToText service = new SpeechToText();
                IamOptions options = new IamOptions.Builder()
                        .apiKey(apiKeyString)
                        .build();
                service.setIamCredentials(options);
//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-models#models
                /*
                Language	                Broadband model	        Narrowband model
                Arabic (Modern Standard)	ar-AR_BroadbandModel	Not supported
                Brazilian Portuguese	    pt-BR_BroadbandModel	pt-BR_NarrowbandModel
                Chinese (Mandarin)	        zh-CN_BroadbandModel	zh-CN_NarrowbandModel
                English (United Kingdon)	en-GB_BroadbandModel	en-GB_NarrowbandModel
                English (United States) 	en-US_BroadbandModel	en-US_NarrowbandModelb en-US_ShortForm_NarrowbandModel
                French	                    fr-FR_BroadbandModel	fr-FR_NarrowbandModel
                German	                    de-DE_BroadbandModel	de-DE_NarrowbandModel
                Japanese	                ja-JP_BroadbandModel	ja-JP_NarrowbandModel
                Korean	                    ko-KR_BroadbandModel	ko-KR_NarrowbandModel
                Spanish (Argentinian, Beta)	es-AR_BroadbandModel	es-AR_NarrowbandModel
                Spanish (Castilian)	        es-ES_BroadbandModel	es-ES_NarrowbandModel
                Spanish (Chilean, Beta)	    es-CL_BroadbandModel	es-CL_NarrowbandModel
                Spanish (Colombian, Beta)	es-CO_BroadbandModel	es-CO_NarrowbandModel
                Spanish (Mexican, Beta)	    es-MX_BroadbandModel	es-MX_NarrowbandModel
                Spanish (Peruvian, Beta)	es-PE_BroadbandModel	es-PE_NarrowbandModel
                */
                RecognizeOptions recognizeOptions = new RecognizeOptions.Builder()
                        .audio(bis)
                        .model("es-ES_BroadbandModel")
                        .contentType(HttpMediaType.AUDIO_MP3)
                        .build();
                try {
                    SpeechRecognitionResults transcript = service.recognize(recognizeOptions).execute().getResult();
                    System.out.println(transcript);
                    message.setStatus(true);
                    message.setMessage(transcript.toString());
                    Media media = new Media();
                    media.setMediaId(UUID.randomUUID().toString());
                    media.setUserId(userId);
                    media.setNotas(notas);
                    media.setFileName(fileName);
                    media.setMediaData(uploadedBytes);
                    media.setTranscription(transcript.toString());

                    MongoCollection<Document> collection = mongoDb.getCollection(mediaCollection);
                    collection.insertOne(ModelAdaptor.convertDocumentToMedia(media));
                } catch (Throwable t) {
                    message.setStatus(false);
                    message.setMessage(t.getMessage());
                }
            } catch (RuntimeException e) {
                e.printStackTrace();
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return Response.ok(message).header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON).header(HttpHeaders.CONTENT_ENCODING, "UTF-8").build();
    }
}
