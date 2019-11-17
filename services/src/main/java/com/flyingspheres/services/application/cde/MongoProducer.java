package com.flyingspheres.services.application.cde;

import com.ibm.websphere.ssl.JSSEHelper;
import com.ibm.websphere.ssl.SSLException;
import com.mongodb.*;
import com.mongodb.client.MongoDatabase;

import javax.annotation.Resource;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.net.ssl.SSLContext;
import java.util.Collections;


public class MongoProducer {

    @Resource(lookup = "mongoHostName", name = "mongoHostName")
    String hostName;

    @Resource( lookup = "mongoPort")
    Integer port;

    @Resource( lookup = "userDataBase", name= "userDataBase")
    String dataBase;

    @Resource( lookup = "mongoConnectString", name = "mongoConnectString")
    String mongoConnectionString; //mongodb+srv://<userId>:<password>@<server>

    @Resource( lookup = "mongoUserId", name = "mongoUserId")
    String mongoUserId;

    @Resource( lookup = "mongoPassword", name = "mongoPassword")
    String mongoPassword;


    @Produces
    public MongoClient createMongo() {
        MongoClientURI uri = new MongoClientURI(
                "mongodb+srv://transcrib_01:UUvFmx3dJdJDJ7Yx@cluster0-gmcxk.mongodb.net/test?retryWrites=true&w=majority");

        MongoClient mongoClient = new MongoClient(uri);
        return mongoClient;
/*        System.out.println("Create Mongo Client.");
        System.out.println("Trying to connect with resources: \n\tHost name: " + hostName + "\n\tPort:" + port);
        String parsedConnection = mongoConnectionString.replace("{userId}", mongoUserId);
        parsedConnection = parsedConnection.replace("{password}", mongoPassword);
        parsedConnection = parsedConnection.replace("{server}", hostName);
        parsedConnection = parsedConnection;

        //String password = PasswordUtil.passwordDecode(encodedPass);
        MongoCredential creds = MongoCredential.createCredential(mongoUserId, "transcribir", mongoPassword.toCharArray());

        SSLContext sslContext = null;
        try {
            sslContext = JSSEHelper.getInstance().getSSLContext("defaultSSLConfig", Collections.emptyMap(), null);
        } catch (SSLException e){
            e.printStackTrace();
        }
        return new MongoClient(new ServerAddress("cluster0-gmcxk.mongodb.net", port), creds, new MongoClientOptions.Builder()
                .sslEnabled(true)
                .sslContext(sslContext)
                .build());*/


/*
        System.out.println("Connection String: " + parsedConnection);
        ConnectionString conString = new ConnectionString(parsedConnection);

        SSLContext sslContext = JSSEHelper.getInstance().getSSLContext("defaultSSLConfig", Collections.emptyMap(), null);

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(conString)
                .retryWrites(true)
                .build();

        return MongoClients.create(settings);

 */
    }

    @Produces
    public MongoDatabase createDB(MongoClient client) {
        System.out.println("Creating database using collection: " + dataBase);
        return client.getDatabase(dataBase);
    }

    public void close(@Disposes MongoClient toClose) {
        toClose.close();
    }

}
