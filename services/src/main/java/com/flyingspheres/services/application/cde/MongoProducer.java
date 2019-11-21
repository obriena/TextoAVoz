package com.flyingspheres.services.application.cde;

import com.mongodb.*;
import com.mongodb.client.MongoDatabase;

import javax.annotation.Resource;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;

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

    @Resource( lookup = "environment", name = "environment")
    String environment;  //valores válidos cloud o local


    @Produces
    public MongoClient createMongo() {
        MongoClient client = null;
        if (environment.equalsIgnoreCase("cloud")){
            String parsedConnection = "mongodb+srv://transcrib_01:UUvFmx3dJdJDJ7Yx@" +
                                      "cluster0-gmcxk.mongodb.net/test?retryWrites=true&" +
                                      "w=majority";
            MongoClientURI uri = new MongoClientURI(parsedConnection);

            client = new MongoClient(uri);
        } else {
            client = new MongoClient(new ServerAddress(hostName, port.intValue()), new MongoClientOptions.Builder().build());
        }

        return client;
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
