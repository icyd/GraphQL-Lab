package main

import (
	"./api"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
)

type Author struct {
	Id   string `bson:"_id"`
	Name string
	Age  int
}

type Book struct {
	Id       string `bson:"_id"`
	Name     string
	Genre    string
	AuthorId string `bson:"authorId"`
}

func main() {
	client := getClient("mongodb://test:1234@localhost:27017/?authSource=admin")
	err := client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Couldn't connect to database")
	}

	log.Println("Connected to database")

	collection := client.Database("mydb").Collection("authors")
	var result []*Author
	cur, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Found documents: %+v\n", result)

	collection = client.Database("mydb").Collection("books")
	var result2 []*Book
	cur, err = collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var b Book
		err := cur.Decode(&b)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println(b.Id, b.Name, b.Genre, b.AuthorId)
		result2 = append(result2, &b)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.TODO())

	fmt.Printf("Found documents: %+v\n", result2)
	s := api.New()
	err = http.ListenAndServe(":8888", s.Router())
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Serving on port 8888")

}

func getClient(uri string) *mongo.Client {
	if uri == "" {
		uri = "mongodb://localhost:27017"
	}

	clientOpts := options.Client().ApplyURI(uri)
	client, err := mongo.NewClient(clientOpts)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Connect(context.Background())

	if err != nil {
		log.Fatal(err)
	}

	return client
}

func curToSlice(ctx context) []
	for cur.Next(context.TODO()) {
		var a Author
		err := cur.Decode(&a)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println(a.Name, a.Id, a.Age)
		result = append(result, &a)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.TODO())


