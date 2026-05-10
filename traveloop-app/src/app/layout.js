import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Traveloop - Plan Smarter. Travel Better.",
  description: "Join over 500,000 travelers using Traveloop to craft seamless itineraries and unforgettable memories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-body">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
