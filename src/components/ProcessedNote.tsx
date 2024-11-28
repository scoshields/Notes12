import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Note } from '../types';
import { cn } from '../utils/cn';

interface ProcessedNoteProps {
  note: Note;
}

export function ProcessedNote({ note }: ProcessedNoteProps) {
  if (note.error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Error Processing Note</span>
        </div>
        <p className="text-red-600">{note.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <FileText className="w-6 h-6" />
        <h2>Processed Output</h2>
      </div>
      <div className={cn(
        "p-6 bg-white border rounded-lg shadow-sm",
        note.isProcessing && "animate-pulse"
      )}>
        {note.isProcessing ? (
          <div className="h-24 flex items-center justify-center">
            <p className="text-gray-500">Processing your note...</p>
          </div>
        ) : (
          <ReactMarkdown className="prose max-w-none">
            {note.processedContent || ''}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}