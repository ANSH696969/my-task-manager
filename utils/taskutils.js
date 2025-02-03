import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGO_URI;
const DB_NAME = "taskdb"; // Make sure your database name is correct

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGO_URI is missing in environment variables.");
}

// Global cache to prevent multiple connections
let cachedClient = global.mongoClient || null;
let cachedDb = global.mongoDb || null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  global.mongoClient = client;
  global.mongoDb = db;

  return { client, db };
}

export async function getTasks() {
  const { db } = await connectToDatabase();
  return db.collection("tasks").find().toArray();
}

export async function addTask(task) {
  const { db } = await connectToDatabase();
  const result = await db.collection("tasks").insertOne(task);
  return { ...task, _id: result.insertedId };
}

export async function updateTask(id, taskData) {
  const { db } = await connectToDatabase();
  const result = await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    { $set: taskData }
  );

  if (result.modifiedCount === 0) {
    throw new Error("No document was updated.");
  }

  return { ...taskData, _id: id };
}

export async function deleteTask(id) {
  const { db } = await connectToDatabase();
  await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
  return { id };
}

export async function toggleTaskCompletion(id) {
  const { db } = await connectToDatabase();
  const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
  if (!task) throw new Error("Task not found");

  const updatedTask = { ...task, completed: !task.completed };
  await db.collection("tasks").updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });

  return updatedTask;
}
