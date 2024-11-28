import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { NoteInput } from './components/NoteInput';
import { ProcessedNote } from './components/ProcessedNote';
import { Note, NoteFormData } from './types';
import { processNoteWithAPI } from './services/api';
import { PROMPT_OPTIONS } from './utils/constants';

function App() {
  const [note, setNote] = useState<Note | null>(null);

  const processNote = async ({ content, promptType }: NoteFormData) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      isProcessing: true
    };
    setNote(newNote);

    try {
      const data = await processNoteWithAPI({ 
        content, 
        prompt: PROMPT_OPTIONS[promptType]
      });
      
      setNote(prev => prev ? {
        ...prev,
        processedContent: data.processedContent,
        isProcessing: false
      } : null);
    } catch (error) {
      console.error('Processing error:', error);
      setNote(prev => prev ? {
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to process note. Please try again.',
        isProcessing: false
      } : null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-center gap-3 mb-12">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Note Processor</h1>
        </header>

        <div className="space-y-8">
          <NoteInput 
            onSubmit={processNote}
            isProcessing={note?.isProcessing || false}
          />
          {note && <ProcessedNote note={note} />}
        </div>
      </div>
    </div>
  );
}

export default App;