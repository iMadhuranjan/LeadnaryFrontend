import "./globals.css";
import { ThemeProvider } from "next-themes";
import SliceProvier from "./store/SliceProvier";
import { ToastProvider } from "@/components/ToastProvider";
import LayoutWrapper from "@/components/LayoutWrapper";


export default function RootLayout({ children }) {
  return (
    <SliceProvier>
      <html lang="en">
        <body className="font-inter">
          <ThemeProvider attribute="class">
            <ToastProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ToastProvider>
          </ThemeProvider>
        </body>
      </html>
    </SliceProvier>
  );
}
