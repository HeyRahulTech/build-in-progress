import OpenAI from 'openai';
import Worker from '../models/Worker';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const matchWorkerToJob = async (jobDescription: string, category: string, userCoordinates: number[]) => {
  try {
    // 1. Fetch available workers in the category nearby
    // In a real scenario, use geospatial queries ($near). For simplicity, we fetch by category.
    const workers = await Worker.find({ category, isAvailable: true }).limit(20);

    if (workers.length === 0) return null;

    // 2. Prepare the prompt for the AI agent
    const workerProfiles = workers.map(w => 
      `ID: ${w._id}, Name: ${w.fullName}, Skills: ${w.skills.join(', ')}, Rating: ${w.rating}, Hourly Rate: $${w.hourlyRate}`
    ).join('\n');

    const prompt = `
      You are an expert AI matching agent for a construction platform.
      A user has requested a job with the following description: "${jobDescription}"
      Category: ${category}
      
      Here are the available workers:
      ${workerProfiles}
      
      Analyze the job description and the worker profiles. Based on skills, rating, and rate, select the SINGLE BEST worker ID for this job.
      Return ONLY the ID of the selected worker.
    `;

    // 3. Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or gemini equivalent if using gemini API
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 50,
      temperature: 0.2,
    });

    const matchedWorkerId = response.choices[0].message.content?.trim();
    
    // 4. Return the matched worker
    return await Worker.findById(matchedWorkerId);
  } catch (error) {
    console.error('AI Matching Error:', error);
    return null;
  }
};
