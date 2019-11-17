package com.flyingspheres.services.application.cde;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
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


    @Produces
    public MongoClient createMongo() {
        System.out.println("Create Mongo Client.");
        System.out.println("Trying to connect with resources: \n\tHost name: " + hostName + "\n\tPort:" + port);
        String parsedConnection = mongoConnectionString.replace("{userId}", mongoUserId);
        parsedConnection = parsedConnection.replace("{password}", mongoPassword);
        parsedConnection = parsedConnection.replace("{server}", hostName);
        parsedConnection = parsedConnection + "&streamType=netty";
        System.out.println("Connection String: " + parsedConnection);
        ConnectionString conString = new ConnectionString(parsedConnection);

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(conString)
                .retryWrites(true)

                .build();

        return MongoClients.create(settings);
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
