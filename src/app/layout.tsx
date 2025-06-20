import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokéViewer",
  description: "The zen-like Pokémon Encyclopedia!",
};

import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={nunitoSans.className}
    >
      <body>{children}</body>
    </html>
  );
}
