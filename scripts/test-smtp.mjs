/**
 * Verify Gmail/SMTP credentials from .env (no email sent unless --send is passed).
 *
 *   node scripts/test-smtp.mjs          # verify login only
 *   node scripts/test-smtp.mjs --send   # send a test message to CONTACT_TO
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[m[1]]) process.env[m[1]] = v;
    }
  } catch {
    console.error("No .env file found.");
    process.exit(1);
  }
}

loadEnv();

const user = (process.env.SMTP_USER || "").trim();
const pass = (process.env.SMTP_PASS || "").trim().replace(/\s/g, "");
const to = process.env.CONTACT_TO || user;
const send = process.argv.includes("--send");

if (!user || !pass) {
  console.error("Set SMTP_USER and SMTP_PASS in .env");
  process.exit(1);
}

console.log("SMTP_USER:", user);
console.log("SMTP_PASS length:", pass.length, pass.length === 16 ? "(ok)" : "(expected 16 for Gmail app password)");
console.log("CONTACT_TO:", to);

const nodemailer = await import("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

try {
  await transporter.verify();
  console.log("Login OK — Gmail accepted the app password.");
} catch (err) {
  console.error("\nLogin FAILED:");
  console.error(err instanceof Error ? err.message : err);
  console.error("\nFix:");
  console.error("1. Enable 2-Step Verification on the Google account");
  console.error("2. Create App Password: https://myaccount.google.com/apppasswords");
  console.error("3. Paste into .env as SMTP_PASS=\"xxxx xxxx xxxx xxxx\" (spaces optional)");
  console.error("4. SMTP_USER must match the same Gmail account");
  process.exit(1);
}

if (send) {
  const info = await transporter.sendMail({
    from: `"Market Edge Atlas" <${user}>`,
    to,
    subject: "Market Edge Atlas — SMTP test",
    text: "SMTP test successful.",
  });
  console.log("Test email sent:", info.messageId);
}
