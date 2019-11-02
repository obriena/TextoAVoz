package com.flyingspheres.services.application;

import com.flyingspheres.services.application.models.Credentials;
import com.flyingspheres.services.application.models.Media;
import com.flyingspheres.services.application.models.User;
import org.bson.Document;


public class ModelAdaptor {

    public static Document convertUserToDocument(User user) {
        Document userDocument = new Document();
        userDocument.put("email", user.getEmail());
        userDocument.put("firstName", user.getFirstName());
        userDocument.put("lastName", user.getLastName());
        userDocument.put("role", user.getRole());

        Document credentialDocument = new Document();
        credentialDocument.put("userId", user.getCredentials().getUserId());
        credentialDocument.put("password", user.getCredentials().getPassword());

        userDocument.put("credentials", credentialDocument);

        return userDocument;
    }

    public static User convertDocumentToUser(Document userDoc) {
        Document credDoc = (Document) userDoc.get("credentials");
        Credentials cred = new Credentials();
        cred.setUserId(credDoc.getString("userId"));

        User user = new User();
        user.setRole(userDoc.getString("role"));
        user.setCredentials(cred);
        user.setEmail(userDoc.getString("email"));
        user.setFirstName(userDoc.getString("firstName"));
        user.setLastName(userDoc.getString("lastName"));

        return user;
    }

    public static Document convertDocumentToMedia(Media media) {
        Document mediaDocument = new Document();
        mediaDocument.put("userId", media.getUserId());
        mediaDocument.put("notas", media.getNotas());
        mediaDocument.put("transcription", media.getTranscription());
        mediaDocument.put("fileName", media.getFileName());
        mediaDocument.put("mediaData", media.getMediaData());
        mediaDocument.put("mediaId", media.getMediaId());

        return mediaDocument;
    }

    public static Media convertDocumentToMedia(Document mediaDoc) {
        Media media = new Media();
        media.setUserId(mediaDoc.getString("userId"));
        media.setNotas(mediaDoc.getString("notas"));
        media.setTranscription(mediaDoc.getString("transcription"));
        media.setFileName(mediaDoc.getString("fileName"));
        media.setMediaId(mediaDoc.getString("mediaId"));
        return media;
    }

}
