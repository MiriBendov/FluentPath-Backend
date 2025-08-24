import * as Sentry from "@sentry/node";

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN!,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  });
  Sentry.setTag("service", "backend");
  Sentry.setTag("version", process.env.APP_VERSION || "dev");
}

export { Sentry };

