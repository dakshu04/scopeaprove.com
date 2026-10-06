type ExpirableChangeRequest = {
  expiresAt: Date | null;
  status: string;
};

export function isPendingChangeRequestExpired(
  changeRequest: ExpirableChangeRequest,
  now = new Date(),
) {
  return (
    changeRequest.status === "PENDING" &&
    changeRequest.expiresAt !== null &&
    changeRequest.expiresAt <= now
  );
}

export function getEffectiveChangeRequestStatus(
  changeRequest: ExpirableChangeRequest,
  now = new Date(),
) {
  return isPendingChangeRequestExpired(changeRequest, now)
    ? "EXPIRED"
    : changeRequest.status;
}
