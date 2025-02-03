import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('taskdb');
const tasksCollection = db.collection('tasks');

export async function getTasks() {
  await client.connect();
  return tasksCollection.find().toArray();
}

export async function addTask(task) {
  await client.connect();
  const result = await tasksCollection.insertOne(task);
  return { ...task, _id: result.insertedId }; 
}

export async function updateTask(id, taskData) {
  await client.connect();
  const result = await tasksCollection.updateOne(
    { _id: new ObjectId(id) }, 
    { $set: taskData }
  );

  if (result.modifiedCount === 0) {
    throw new Error('No document was updated.');
  }

  return { ...taskData, _id: id };
}

export async function deleteTask(id) {
  await client.connect();
  await tasksCollection.deleteOne({ _id: new ObjectId(id) });
  return { id };
}

export async function toggleTaskCompletion(id) {
  await client.connect();
  const task = await tasksCollection.findOne({ _id: new ObjectId(id) });
  if (!task) throw new Error('Task not found');

  const updatedTask = { ...task, completed: !task.completed };
  await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });

  return updatedTask;
}
