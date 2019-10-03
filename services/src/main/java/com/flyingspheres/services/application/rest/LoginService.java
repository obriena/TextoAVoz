package com.flyingspheres.services.application.rest;

import com.flyingspheres.services.application.models.Credentials;
import com.flyingspheres.services.application.models.ServerMessage;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("authenticate")
public class LoginService {

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
