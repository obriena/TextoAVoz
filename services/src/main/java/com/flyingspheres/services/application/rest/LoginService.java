package com.flyingspheres.services.application.rest;

import com.flyingspheres.services.application.models.Credentials;
import com.flyingspheres.services.application.models.ServerMessage;
import com.mongodb.DB;

import javax.annotation.Resource;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("authenticate")
public class LoginService {

    @Resource(name = "mongo/userDb")
    protected DB db;

    @GET
    @Produces("application/json; charset=UTF-8")
    public Response validate() {
        ServerMessage message = new ServerMessage();

        StringBuffer buffer = new StringBuffer();
        buffer.append("DB injected: " + db == null);
        message.setStatus(db==null);
        if (db != null) {
            buffer.append("collections: ");
            buffer.append(db.getCollectionNames()).append("\n");
            buffer.append("DB Name: ");
            buffer.append(db.getName()).append("\n");
            message.setMessage(buffer.toString());
        } else {
            message.setMessage("DB Injection failed.  DB Object is null.");
        }
        return Response.ok(message).build();
    }

    @POST
    @Produces("application/json; charset=UTF-8")
    public Response authenticateCredentials(Credentials credentials){
        ServerMessage message = new ServerMessage();
        if (credentials.getUserId().isEmpty() || credentials.getPassword().isEmpty()){
            message.setStatus(false);
            StringBuffer buff = new StringBuffer();
            if (credentials.getUserId().isEmpty()) {
                buff.append("falta la identificación de usuario\n");
            }
            if (credentials.getPassword().isEmpty()){
                buff.append("falta la contraseña");
            }
            message.setMessage(buff.toString());
        } else {
            message.setStatus(true);
            message.setMessage("Todo está bien. Usario: " + credentials.getUserId());
        }
        System.out.println(message.getMessage());

        return Response.ok(message).header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON).header(HttpHeaders.CONTENT_ENCODING, "UTF-8").build();
    }
}
