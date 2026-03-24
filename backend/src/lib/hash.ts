import { createHash, randomBytes } from "node:crypto";

export function createPublicToken() {
  return randomBytes(24).toString("hex");
}

export function hashPublicToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
