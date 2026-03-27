import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REAP Asia Ministries Inc. — Preaching God's Word. Serving God's World.",
  description: "A US-based nonprofit working in North Bihar, India and Nepal for over 20 years. Evangelism, church planting, leadership training, and community development.",
  keywords: ["REAP Asia", "ministry", "Bihar", "Nepal", "evangelism", "church planting", "nonprofit"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
