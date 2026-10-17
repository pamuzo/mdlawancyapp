import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

function isServiceAccount(value: unknown): value is ServiceAccount {
  return (
    typeof value === "object" &&
    value !== null &&
    "project_id" in value &&
    typeof value.project_id === "string" &&
    "client_email" in value &&
    typeof value.client_email === "string" &&
    "private_key" in value &&
    typeof value.private_key === "string"
  );
}

function getCredential() {
  const serviceAccountPath = join(process.cwd(), "serviceAccountKey.json");

  if (process.env.NODE_ENV !== "production" && existsSync(serviceAccountPath)) {
    const serviceAccount: unknown = JSON.parse(
      readFileSync(serviceAccountPath, "utf8"),
    );

    if (!isServiceAccount(serviceAccount)) {
      throw new Error(
        "serviceAccountKey.json must contain project_id, client_email, and private_key strings.",
      );
    }

    return cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    });
  }

  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to initialize Firebase Admin.",
    );
  }

  return cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
}

export function getAdminMessaging() {
  const app =
    getApps()[0] ??
    initializeApp({
      credential: getCredential(),
    });

  return getMessaging(app);
}
