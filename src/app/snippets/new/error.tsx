'use client';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {error.message}
    </div>
  );
}
