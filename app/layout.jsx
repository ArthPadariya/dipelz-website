import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Dipelz",
  description: "Ready to eat organic Indian food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: "100px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}