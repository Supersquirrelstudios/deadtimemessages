export const metadata = {
  title: "DeadTime Messages",
  description: "Schedule heartfelt messages that deliver when it matters most."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
