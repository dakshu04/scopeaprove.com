import assert from "node:assert/strict";
import test from "node:test";

import {
  getEffectiveChangeRequestStatus,
  isPendingChangeRequestExpired,
} from "../lib/change-request-status";

const now = new Date("2026-10-06T12:00:00.000Z");

test("a pending request expires at its expiry instant", () => {
  const request = { status: "PENDING", expiresAt: now };

  assert.equal(isPendingChangeRequestExpired(request, now), true);
  assert.equal(getEffectiveChangeRequestStatus(request, now), "EXPIRED");
});

test("a future pending request remains pending", () => {
  const request = {
    status: "PENDING",
    expiresAt: new Date("2026-10-06T12:00:01.000Z"),
  };

  assert.equal(isPendingChangeRequestExpired(request, now), false);
  assert.equal(getEffectiveChangeRequestStatus(request, now), "PENDING");
});

test("a decided request is never converted to expired", () => {
  const request = {
    status: "APPROVED",
    expiresAt: new Date("2026-10-01T12:00:00.000Z"),
  };

  assert.equal(isPendingChangeRequestExpired(request, now), false);
  assert.equal(getEffectiveChangeRequestStatus(request, now), "APPROVED");
});

test("a pending request without an expiry remains pending", () => {
  const request = { status: "PENDING", expiresAt: null };

  assert.equal(isPendingChangeRequestExpired(request, now), false);
});
