import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import MotionProvider from '@/components/motion/MotionProvider';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--nf-sans',
  display: 'swap',
});

const title = 'rowan — sistema de gestão para petshop e clínica veterinária';
const description =
  'Agenda, banho e tosa com acompanhamento ao vivo, confirmação automática pelo WhatsApp, caixa, notas e financeiro. Um cadastro e um histórico para petshop, clínica e hospital.';

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: '/favicon.svg' },
  openGraph: { title, description, locale: 'pt_BR', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#0F766E' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sans.variable} suppressHydrationWarning>
      <head>
        {/* flag JS before paint so reveal start-states never flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('rowan-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
      </head>
      <body>
        <a className="skip" href="#conteudo">Pular para o conteúdo</a>
        {children}
        <MotionProvider />
      </body>
    </html>
  );
}
