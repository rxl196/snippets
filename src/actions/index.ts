'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function editSnippet(id: number, code: string) {
  const updatedSnippet = await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${updatedSnippet.id}`); // Redirect to the updated snippet page
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect('/'); // Redirect to the snippets list page
}

export async function createSnippet(
  actionState: { message: string },
  formData: FormData,
) {
  try {
    // Check user's inputs and make sure they're valid
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return { message: 'Title must be at least 3 characters long' };
    }

    if (typeof code !== 'string' || code.length < 10) {
      return { message: 'Code must be at least 10 characters long' };
    }
    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    // Redirect user back to the root route
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: 'An unknown error occurred' };
  }
  redirect('/');
}
