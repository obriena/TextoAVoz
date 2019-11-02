package com.flyingspheres.services.application.rest;

import com.flyingspheres.services.application.ModelAdaptor;
import com.flyingspheres.services.application.models.Media;
import com.flyingspheres.services.application.models.ServerMessage;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Path("media")
public class MediaRetrievalService {
    @Inject
    MongoDatabase mongoDb;

    @Resource( lookup = "mediaDataCollection", name= "mediaDataCollection")
    String mediaCollection;

    @GET
    @Path("/findAllForUser/{userId}")
    @Produces("application/json; charset=UTF-8")
    public Response retrieveMessagesForUser(@PathParam("userId") String userId){
        //TODO using just the user id to retrieve documents is a security risk
        Document mediaFilter = new Document();
        mediaFilter.put("userId", userId);

        FindIterable<Document> result = mongoDb.getCollection(mediaCollection).find().filter(mediaFilter);
        List<Media> mediaList = new ArrayList<>();
        for (Document doc : result) {
            mediaList.add(ModelAdaptor.convertDocumentToMedia(doc));
        }

        ServerMessage message = new ServerMessage();
        message.setStatus(true);
        message.setMessage("Retrieved " + mediaList.size() + " items");
        message.setPayload(mediaList);

        return Response.ok(message).build();
    }


}
