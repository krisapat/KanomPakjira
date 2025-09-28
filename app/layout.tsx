import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./Provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="scrollbar-none">
        <body>
          <Providers>
            <main className="pt-15 kanitFont">
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}