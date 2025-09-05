import { Button } from "@/components/ui/button";

export default function StoriesPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 space-y-4">
      <h1 className="text-2xl font-bold text-pink-600">📖 Histoires</h1>
      <Button>Générer une histoire ✨</Button>
    </div>
  );
}
