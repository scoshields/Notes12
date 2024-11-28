import { ProcessingOptions } from '../types';

const API_URL = '/.netlify/functions/process-note';

export async function processNoteWithAPI({ content, prompt }: ProcessingOptions) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    if (!data.processedContent) {
      throw new Error('Invalid response format: missing processedContent');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to process note. Please try again.');
  }
}