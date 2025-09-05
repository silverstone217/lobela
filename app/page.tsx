import Header from "@/components/home/Header";
import TTSButton from "@/components/TTSButton";

export default function Home() {
  return (
    <main
      className="flex h-full w-full overflow-y-auto 
    overflow-x-hidden flex-col
    "
    >
      <Header />
      <div className="py-14" />
      <div className="mx-auto">
        <TTSButton />
      </div>
    </main>
  );
}
