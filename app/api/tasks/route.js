import { NextResponse } from 'next/server';
import { getTasks, addTask, updateTask, deleteTask, toggleTaskCompletion } from '@/utils/taskutils';

export async function GET() {
  try {
    const tasks = await getTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const taskData = await request.json();
    const newTask = await addTask(taskData);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const taskData = await request.json();
    const updatedTask = await updateTask(taskData.id, taskData);
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const deletedTask = await deleteTask(id);
    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id } = await request.json();
    const toggledTask = await toggleTaskCompletion(id);
    return NextResponse.json(toggledTask);
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Failed to toggle task" }, { status: 500 });
  }
}
