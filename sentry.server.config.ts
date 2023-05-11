import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: 'https://a9405848480945cfa0aaa0d96aa18264@o4505163047108608.ingest.sentry.io/4505163053465600',
	tracesSampleRate: 0.1,
	debug: false,
	enabled: process.env.NODE_ENV === 'production',
});
