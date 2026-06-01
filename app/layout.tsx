import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tombolă AME — 13 Iunie · Romaero",
  description: "Înscrie-te în tombola AME și câștigă o experiență backstage exclusivă la concertul de pe 13 Iunie de la Romaero.",
  openGraph: {
    title: "Tombolă AME — 13 Iunie · Romaero",
    description: "Câștigă acces backstage exclusiv. Franky Rizardo · Mason Collective · Andrea · Elbio & Denis · Sambo B2B Hris2",
    images: ["/13June.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="h-full">
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  );
}
