// src/controllers/taskController.ts
import { Request, Response } from 'express';
import Task from '../models/tasks';
import { AuthRequest } from '../types';

// Create a new task
export const addTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const newTask = new Task({ title, description, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error creating task:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    } else {
      console.error('Unexpected error', err);
      res.status(500).json({ message: 'Unexpected server error' });
    }
  }
};

// Get all tasks for a user
export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const tasks = await Task.find({ userId }).exec();
    res.json(tasks);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Server error', error: err.message });
    } else {
      res.status(500).json({ message: 'Unexpected server error' });
    }
  }
};

// Get a task by ID
export const getTaskById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const task = await Task.findOne({ _id: id, userId }).exec();
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error finding task:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    } else {
      console.error('Unexpected error', err);
      res.status(500).json({ message: 'Unexpected server error' });
    }
  }
};

// Update a task
export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Server error', error: err.message });
    } else {
      res.status(500).json({ message: 'Unexpected server error' });
    }
  }
};

// Delete a task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Server error', error: err.message });
    } else {
      res.status(500).json({ message: 'Unexpected server error' });
    }
  }
};
