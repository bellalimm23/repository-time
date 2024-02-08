import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import 'styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from 'hooks/use-theme';
import merge from 'lodash/merge';
import type { AppProps } from 'next/app';
import { IBM_Plex_Sans } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import appWithI18n from 'next-translate/appWithI18n';
import { useEffect } from 'react';
import { theme } from 'styles/theme';
import { setLocale } from 'yup';

import i18nConfig from '../../i18n';
import yupEnValidation from '../../locales/en/validation.yup';
import yupIdValidation from '../../locales/id/validation.yup';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm_plex_sans',
});

function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const __next = document.getElementById('__next');
      __next.className = `${ibmPlexSans.variable}`;
    }
  }, []);

  useEffect(() => {
    if (locale === 'en') {
      setLocale(yupEnValidation as any);
    } else {
      setLocale(yupIdValidation as any);
    }
  }, [locale]);

  return (
    <>
      <MantineProvider forceColorScheme="light" theme={theme}>
        <Head>
          <title>KuroSIM</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
        </Head>
        <Notifications
          limit={10}
          position="top-right"
          zIndex={9999999}
          autoClose={4000}
        />
        <ThemeProvider>
          {(Component as any).getLayout ? (
            (Component as any).getLayout(<Component {...pageProps} />)
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </MantineProvider>
    </>
  );
}

export default appWithI18n(App as any, {
  ...i18nConfig,
  loadLocaleFrom: (locale, ns) => {
    const englishTexts = import(`../../locales/en/${ns}.json`);
    let countrySpecific = Promise.resolve({});
    let languageOnly = Promise.resolve({});
    if (locale) {
      countrySpecific = import(
        `../../locales/${locale.replace('-', '_')}/${ns}.json`
      ).catch(() => ({}));
      languageOnly = import(
        `../../locales/${locale.substring(0, 2)}/${ns}.json`
      ).catch(() => ({}));
    }
    return Promise.all([englishTexts, countrySpecific, languageOnly]).then(
      ([en, country, language]) => merge({}, en, country, language),
    );
  },
});
