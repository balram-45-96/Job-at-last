import { Poppins, Hind } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
});

const hind = Hind({
  subsets: ['latin'],
  variable: '--font-hind',
  display: 'swap',
  weight: ['400', '700']
});

export { poppins, hind };
