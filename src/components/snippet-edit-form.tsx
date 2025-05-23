'use client';

import type { Snippet } from '@/generated/prisma/client';
import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import * as actions from '@/actions';
import { db } from '@/db';
import { redirect } from 'next/navigation';

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button
          type="submit"
          className="p-2 border rounded hover:cursor-pointer"
        >
          Save
        </button>
      </form>
    </div>
  );
}
