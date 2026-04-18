import "./globals.css";
import Providers from "./providers";
import LayoutClient from "./layoutClient";
import { Toaster } from "react-hot-toast";
import Chatbot from "./components/Chatbot";

export const metadata = {
  title: "Dipelz",
  description: "Ready to eat organic Indian food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutClient>
            {/* ✅ Main Content Wrapper (Fix for fixed navbar overlap) */}
            <main className="pt-20 min-h-screen bg-gray-50">
              {children}
            </main>
          </LayoutClient>
          <Chatbot/>

          {/* 🔥 Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "12px",
                padding: "12px 18px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}