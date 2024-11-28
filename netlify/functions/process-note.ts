import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler: Handler = async (event) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      throw new Error('Invalid JSON in request body');
    }

    const { content, prompt } = body;

    if (!content || !prompt) {
      throw new Error('Content and prompt are required');
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const processedContent = completion.choices[0]?.message?.content;

    if (!processedContent) {
      throw new Error('No response from OpenAI');
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        processedContent
      })
    };
  } catch (error) {
    console.error('Error in process-note function:', error);
    
    let errorMessage = 'An unexpected error occurred';
    
    if (error instanceof Error) {
      // Handle specific error cases
      if (error.message.includes('API key')) {
        errorMessage = 'API configuration error';
      } else if (error.message.includes('JSON')) {
        errorMessage = 'Invalid request format';
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: errorMessage
      })
    };
  }
};