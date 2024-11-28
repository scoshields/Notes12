export const PROMPT_OPTIONS = {
  summary: "Analyze this text and provide a detailed summary with key points in markdown format. Use bullet points for main ideas and include a brief conclusion.",
  
  outline: "Convert this text into a well-structured outline in markdown format. Use headings, subheadings, and bullet points to organize the information hierarchically.",
  
  actionItems: "Extract all action items and tasks from this text. Format them as a markdown checklist, grouped by priority (High/Medium/Low) and add due dates where mentioned.",
  
  questions: "Generate a set of comprehensive follow-up questions based on this text. Format them in markdown with main questions as headings and sub-questions as bullet points.",
  
  keyInsights: "Extract and elaborate on the key insights from this text. Present them in markdown format with main insights as headings and supporting details as bullet points."
} as const;

export type PromptType = keyof typeof PROMPT_OPTIONS;

export const DEFAULT_PROMPT_TYPE: PromptType = 'summary';