import Header from "@/components/home/Header";
import { Hero, QuickSuggestions } from "@/components/home/HomeSections";
// import TTSButton from "@/components/TTSButton";

export default function Home() {
  return (
    <main className="flex h-full w-full  flex-col">
      <Header />
      {/* <div className="py-14" /> */}
      {/* <div className="mx-auto">
        <TTSButton />
      </div> */}
      <div className="py-4" />
      <Hero />
      <QuickSuggestions />
    </main>
  );
}
