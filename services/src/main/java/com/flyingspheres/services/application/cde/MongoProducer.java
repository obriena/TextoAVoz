package com.flyingspheres.services.application.cde;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ServerAddress;
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


    @Produces
    public MongoClient createMongo() {
        System.out.println("Create Mongo Client.");
        System.out.println("Trying to connect with resources: \n\tHost name: " + hostName + "\n\tPort:" + port);

        return new MongoClient(new ServerAddress(hostName, port.intValue()), new MongoClientOptions.Builder().build());
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
