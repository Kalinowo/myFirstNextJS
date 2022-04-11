import { MongoClient } from "mongodb";

//api routes only run on the server, never on the client
// /api/new-meetup when request is send to this url, a function will triggered.

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.DB_CONNECT);

    //取得當前的db meetups
    const db = client.db();
    //創建一個collection叫做meetups
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}
