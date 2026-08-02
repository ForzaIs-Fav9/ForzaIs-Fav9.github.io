import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientShell } from "@/components/layout/ClientShell";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#818cf8",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} — Student, Researcher, Builder`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    images: [
      {
        url: "/home.png",
        width: 1200,
        height: 630,
        alt: "Harshith Vankela",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    creator: "@harshithvankela",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/home.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `/*
  You found the source. Good.

  "The reward for curiosity is not the answer —
   it's the better question."

  There are a few hidden layers to this site.
  They reveal how I think, not what I know.
  Keep looking.

  — HV
*/`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <ClientShell />
        <Header />
        <main id="main-content" className="relative z-10 min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}