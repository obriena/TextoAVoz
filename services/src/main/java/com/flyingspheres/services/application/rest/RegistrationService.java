package com.flyingspheres.services.application.rest;

import com.flyingspheres.services.application.models.Credentials;
import com.flyingspheres.services.application.models.ServerMessage;
import com.flyingspheres.services.application.models.User;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("register")
public class RegistrationService {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticateCredentials(User user){

        ServerMessage message = new ServerMessage();
        message.setStatus(true);
        message.setMessage("Todo está bien. Usario: " + user.getCredentials().getUserId());

        System.out.println(message.getMessage());

        return Response.ok(message).header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON).header(HttpHeaders.CONTENT_ENCODING, "UTF-8").build();
    }
}
