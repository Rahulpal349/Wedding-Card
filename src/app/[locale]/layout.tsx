import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import { LenisProvider } from '@/hooks/useLenis';
import ClientIntlProvider from '@/components/providers/ClientIntlProvider';

export function generateStaticParams() {
  return [{ locale: 'bn' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const bnMessages = (await import(`../../../messages/bn.json`)).default;
  const enMessages = (await import(`../../../messages/en.json`)).default;
  const currentMessages = locale === 'en' ? enMessages : bnMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={currentMessages}>
      <ClientIntlProvider
        initialLocale={locale}
        bnMessages={bnMessages}
        enMessages={enMessages}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </ClientIntlProvider>
    </NextIntlClientProvider>
  );
}
