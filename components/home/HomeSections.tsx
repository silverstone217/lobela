import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { BookOpen, Mic, PlayCircle, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-20 px-6 pb-10 flex flex-col items-center text-center gap-4">
      <h1 className="text-3xl font-extrabold text-primary">
        Bienvenue dans <span className="text-secondary">Lobela</span> 🎉
      </h1>
      <p className="text-foreground/80 max-w-md">
        Écoute des histoires africaines magiques, racontées par l’IA et
        accompagnées de belles voix.
      </p>
      <div className="flex gap-3 mt-4 flex-wrap">
        <Link href="/create" className="w-full md:w-fit">
          <Button
            variant="primary"
            size="lg"
            className="rounded-full px-6  w-full"
          >
            <Sparkles className="mr-2 h-5 w-5" /> Créer une histoire
          </Button>
        </Link>
        <Link href="/stories" className="flex-1">
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full px-6 w-full"
          >
            <BookOpen className="mr-2 h-5 w-5" /> Explorer
          </Button>
        </Link>
      </div>
    </section>
  );
};

export const QuickSuggestions = () => {
  return (
    <section className="flex-1 px-6 pb-20 flex flex-col gap-6">
      {/* Dernières histoires */}
      <div>
        <h2 className="text-lg font-bold mb-3">📚 Dernières histoires</h2>
        <div className="grid gap-4">
          <div className="bg-secondary/30 p-4 rounded-2xl flex items-center gap-4">
            <PlayCircle className="text-primary size-8" />
            <div>
              <h3 className="font-semibold">Le Lion et la Tortue</h3>
              <p className="text-xs text-foreground/70">3 min</p>
            </div>
          </div>
          <div className="bg-secondary/30 p-4 rounded-2xl flex items-center gap-4">
            <PlayCircle className="text-secondary size-8" />
            <div>
              <h3 className="font-semibold">La Forêt Enchantée</h3>
              <p className="text-xs text-foreground/70">5 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h2 className="text-lg font-bold mb-3">✨ Suggestions</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          <div className="bg-primary/20 rounded-2xl p-4 min-w-[150px] text-center">
            <Mic className="mx-auto mb-2 text-primary" />
            <p className="font-semibold text-sm">Histoires courtes</p>
          </div>
          <div className="bg-secondary/20 rounded-2xl p-4 min-w-[150px] text-center">
            <Sparkles className="mx-auto mb-2 text-secondary" />
            <p className="font-semibold text-sm">Magiques</p>
          </div>
          <div className="bg-foreground/10 rounded-2xl p-4 min-w-[150px] text-center">
            <BookOpen className="mx-auto mb-2 text-foreground" />
            <p className="font-semibold text-sm">Classiques</p>
          </div>
        </div>
      </div>
    </section>
  );
};
