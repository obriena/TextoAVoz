package it;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class MongoConnectionTest {
    private String mongoConnectionString;

    @Before
    public void setup() {
        mongoConnectionString = "";
    }

    @Test
    public void testConnect() {

        MongoClientURI uri = new MongoClientURI(
                "mongodb+srv://transcrib_01:UUvFmx3dJdJDJ7Yx@cluster0-gmcxk.mongodb.net/test?retryWrites=true&w=majority");

        MongoClient mongoClient = new MongoClient(uri);
        MongoDatabase database = mongoClient.getDatabase("test");
        Assert.assertNotNull(database);

        System.out.println("Retrieving collection names:");

        MongoIterable<String> collectionNames = database.listCollectionNames();
        while (collectionNames.iterator().hasNext()){
            System.out.println(collectionNames.iterator().next());
        }

    }
}
