import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!, // Stocke ta clé dans .env.local
});

export async function POST(req: NextRequest) {
  try {
    const { text, voice } = await req.json();

    // Génération de la voix
    const audio = await client.generate({
      voice: voice || "Rachel", // Remplace par la voix de ton choix
      model_id: "eleven_multilingual_v2",
      text,
    });

    // Transformer l’audio en buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audio) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
