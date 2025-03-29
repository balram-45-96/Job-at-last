/* eslint-disable @next/next/next-script-for-ga */
import { poppins, hind } from './fonts';
import App from './app';
import './globals.css';


export default function RootLayout({
  children
}: Readonly<{
  children: NonNullable<JSX.Element>;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${hind.variable}`}>
      <body>
        <main>
          <App>{children}</App>
        </main>
      </body>
    </html>
  );
}
