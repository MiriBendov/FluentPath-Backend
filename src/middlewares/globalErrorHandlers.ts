import { Sentry } from "../config/sentry";

export function registerGlobalErrorHandlers() {
  process.on("unhandledRejection", (reason: any) => {
    if (reason instanceof Error) {
      Sentry.captureException(reason);
    } else {
      Sentry.captureMessage(`Unhandled Rejection: ${JSON.stringify(reason)}`);
    }
  });

  process.on("uncaughtException", (error: Error) => {
    Sentry.captureException(error);
  });
}
