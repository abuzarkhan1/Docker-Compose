import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb://mongodb:27017";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("✅ Successfully connected to MongoDB!");
} catch (err) {
  console.error("❌ MongoDB connection failed:", err);
}

let db = client.db("employees");

if (db) {
  console.log("🟢 Database 'employees' is connected and ready to use!");
} else {
  console.log("🔴 Failed to connect to the 'employees' database.");
}

export default db;
