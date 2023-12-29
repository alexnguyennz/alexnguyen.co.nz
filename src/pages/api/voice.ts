/*
import type { APIRoute } from "astro";

import ElevenLabs from "elevenlabs-node";

const voice = new ElevenLabs({
  apiKey: import.meta.env.XI_API_KEY,
  voiceId: import.meta.env.XI_VOICE_ID,
});

export const POST: APIRoute = async ({ request }) => {
  const { id, textInput } = await request.json();

  const response = await voice.textToSpeech({
    fileName: `public/voice/${id}.mp3`,
    textInput,
  });

  return new Response(JSON.stringify(response));
};
*/
