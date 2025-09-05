import "./globals.css";
import MobileLayout from "@/components/MobileLayout";
import PageTransition from "@/components/PageTransition";
import AuthProvider from "@/components/providers/AuthProvider";
import { inconsolata } from "@/lib/fonts";

export const metadata = {
  title: "Histoires Africaines",
  description: "Des petites histoires locales racontées par l'IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${inconsolata.className} 
          h-screen w-screen overflow-hidden antialiased`}
      >
        <AuthProvider>
          <MobileLayout>
            <PageTransition>{children}</PageTransition>
          </MobileLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
