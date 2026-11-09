import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import { LenisProvider } from '@/hooks/useLenis';

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

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <div lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </NextIntlClientProvider>
    </div>
  );
}
