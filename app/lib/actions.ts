'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.number(),
    task_name: z.string(),
    completed: z.boolean(),
});

const CreateTodo = FormSchema.omit({ id: true });
const UpdateTodo = FormSchema.omit({ id: true });

export async function createTodo(formData: FormData) {
    const { task_name, completed } = CreateTodo.parse({
        task_name: formData.get('task_name'),
        completed: formData.get('completed') === 'true', // Convert string to boolean
    });

    try {
        await sql`
    INSERT INTO todos (task_name, completed)
    VALUES (${task_name}, ${completed})
    `;
        revalidatePath('/dashboard/todos');
        redirect('/dashboard/todos');
    } catch (error) {
        return { message: 'Database Error: Failed to Create Todo.' };
    }
}

export async function updateTodo(id: string, formData: FormData) {
    const { task_name, completed } = UpdateTodo.parse({
        task_name: formData.get('task_name'),
        completed: formData.get('completed') === 'true', // Convert string to boolean
    });

    try {
        await sql`
    UPDATE todos
    SET task_name = ${task_name}, completed = ${completed}
    WHERE id = ${id}
    `;
        revalidatePath('/dashboard/todos');
        redirect('/dashboard/todos');
    } catch (error) {
        return { message: 'Database Error: Failed to Update Todo.' };
    }
}
export async function deleteTodo(id: string) {
    try {
        await sql`
    DELETE FROM todos WHERE id = ${id}
    `;
        revalidatePath('/dashboard/todos');
        return { message: 'Deleted Todo.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Todo.' };
    }
}

