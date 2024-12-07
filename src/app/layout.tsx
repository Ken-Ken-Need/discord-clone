import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from 'next/font/google';
import {
  ClerkProvider,
  RedirectToSignIn,
  // SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { ModalProvider } from "@/components/providers/modalProvider";

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
