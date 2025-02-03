import { NextResponse } from 'next/server';
import { getTasks, addTask, updateTask, deleteTask, toggleTaskCompletion } from '../../utils/taskutils';

export async function GET() {
  try {
    const tasks = await getTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  const taskData = await request.json();
  try {
    const newTask = await addTask(taskData);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(request) {
  const taskData = await request.json();
  try {
    const updatedTask = await updateTask(taskData.id, taskData);
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    const deletedTask = await deleteTask(id);
    return NextResponse.json(deletedTask);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(request) {
  const { id } = await request.json();
  try {
    const toggledTask = await toggleTaskCompletion(id);
    return NextResponse.json(toggledTask);
  } catch (error) {
    return NextResponse.error();
  }
}
