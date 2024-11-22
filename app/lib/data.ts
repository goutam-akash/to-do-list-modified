"use server";
import { sql } from '@vercel/postgres';
import { Todo } from './definitions';
import dotenv from 'dotenv';
dotenv.config();

// GET all list of todos
export async function fetchAllTodos() {
    try {
      const data = await sql<Todo>`SELECT * FROM todos`;
      return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
    }
  }
