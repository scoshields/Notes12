export interface Note {
  id: string;
  content: string;
  processedContent?: string;
  isProcessing: boolean;
  error?: string;
}

export interface ProcessingOptions {
  prompt: string;
  content: string;
}

export interface NoteFormData {
  content: string;
  promptType: keyof typeof import('../utils/constants').PROMPT_OPTIONS;
}