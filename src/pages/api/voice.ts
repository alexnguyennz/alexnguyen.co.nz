import type { APIRoute } from "astro";

import ElevenLabs from "elevenlabs-node";

const voice = new ElevenLabs({
  apiKey: import.meta.env.XI_API_KEY,
  voiceId: import.meta.env.XI_VOICE_ID,
});

export const POST: APIRoute = async ({ request }) => {
  const { text } = await request.json();

  /*const options = {
    method: "POST",
    headers: {
      Accept: "audio/mpeg",
      "xi-api-key": import.meta.env.XI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: "hi" }),
    responseType: "stream",
  };

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${
      import.meta.env.XI_VOICE_ID
    }`,
    options,
  );*/

  const response = await voice.textToSpeech({
    fileName: "public/voice/index.mp3",
    textInput: text,
  });

  return new Response(JSON.stringify(response));
};
