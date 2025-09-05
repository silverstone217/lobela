"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function TTSButton() {
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "Bienvenue dans Lobela, une Application des belles histoires et contes pour enfants 🚀",
          voice: "Alice",
        }),
      });

      if (!res.ok) throw new Error("Erreur API TTS");

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSpeak} disabled={loading}>
      {loading ? "Chargement..." : "Lire avec ElevenLabs"}
    </Button>
  );
}
