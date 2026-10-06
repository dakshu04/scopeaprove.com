import type { Instrumentation } from "next";

export function register() {}

export const onRequestError: Instrumentation.onRequestError = (
  error,
  request,
  context,
) => {
  const message = error instanceof Error ? error.message : String(error);
  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? String(error.digest)
      : undefined;

  console.error("scopeyes_request_error", {
    context: context.routeType,
    digest,
    message,
    method: request.method,
    route: context.routePath,
  });
};
