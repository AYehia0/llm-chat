import { Analytics } from "@vercel/analytics/react";
import classNames from "classnames";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const monospace = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "StreamLLM",
  description:
    "App demo for streaming LLM responses from a Go backend server using Groq API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          sans.className,
          sans.variable,
          monospace.variable
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
