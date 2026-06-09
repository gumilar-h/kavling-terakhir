import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import { SearchProvider } from "@/context/SearchContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "KavlingTerakhir",
  description:
    "Bandingkan dan temukan lokasi pemakaman di Jabodetabek dengan mudah.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="id">
      <body>
        <SearchProvider>
          <div className="mx-auto min-h-dvh w-full max-w-sm bg-[#eff3ef] shadow-xl">
            <Header />
            {children}
          </div>
        </SearchProvider>
      </body>
    </html>
  );
};

export default RootLayout;
