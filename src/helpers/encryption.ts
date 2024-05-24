import crypto from "crypto";

const SECRET = "ARIYAN_DEMO_REST_API";

export function random() {
  return crypto.randomBytes(128).toString("base64");
}

export function authentication(salt: string, password: string) {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
}
