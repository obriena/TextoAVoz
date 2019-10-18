package com.flyingspheres.services.application;

import com.flyingspheres.services.application.models.Credentials;
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
}
