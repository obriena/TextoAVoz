package com.flyingspheres.services.application.rest;

import com.flyingspheres.services.application.ModelAdaptor;
import com.flyingspheres.services.application.models.Credentials;
import com.flyingspheres.services.application.models.ServerMessage;
import com.flyingspheres.services.application.models.User;
import com.ibm.websphere.crypto.PasswordUtil;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("authenticate")
public class LoginService {

    @Inject
    MongoDatabase mongoDb;

    @Resource( lookup = "userDataCollection", name= "userDataCollection")
    String userCollection;

    @GET
    @Produces("application/json; charset=UTF-8")
    public Response validate() {
        ServerMessage message = new ServerMessage();

        StringBuffer buffer = new StringBuffer();
        buffer.append("Null Check for DB: ");
        buffer.append(mongoDb == null);
        message.setStatus(mongoDb==null);
        if (mongoDb != null) {
            buffer.append(" collections: ");
            buffer.append("DB Name: ");
            buffer.append(mongoDb.getName());
            message.setMessage(buffer.toString());
            System.out.println(buffer.toString());
        } else {
            message.setMessage("DB Injection failed.  DB Object is null.");
        }
        return Response.ok(message).build();
    }

    @POST
    @Produces("application/json; charset=UTF-8")
    public Response authenticateCredentials(Credentials credentials){
        List<Document> found = new ArrayList<Document>();
        try {
            Document filterUser = new Document();
            Document credFilter = new Document();
            credFilter.put("userId", credentials.getUserId());
            credFilter.put("password", PasswordUtil.encode(credentials.getPassword()));
            filterUser.put("credentials", credFilter);

            FindIterable<Document> result = mongoDb.getCollection(userCollection).find().filter(filterUser);

            for (Document doc : result) {
                found.add(doc);
            }
        } catch (Throwable t){
            t.printStackTrace();
        }

        ServerMessage message = new ServerMessage();
        if (found.size() < 1 || found.size() > 1){
            message.setStatus(false);
            message.setMessage("Usario no encontrado");
        }
        else if (found.size() == 1){
            message.setStatus(true);
            User user = ModelAdaptor.convertDocumentToUser(found.get(0));

            message.setMessage(found.get(0).toJson());
        }

        System.out.println(message.getMessage());

        return Response.ok(message).header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON).header(HttpHeaders.CONTENT_ENCODING, "UTF-8").build();
    }
}
