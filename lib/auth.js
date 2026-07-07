import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "fallback_super_secret_session_key_with_at_least_32_characters_for_hmac";
const KEY = new TextEncoder().encode(SECRET_KEY);

/**
 * Creates a signed JWT with the provided payload.
 * @param {Object} payload 
 * @returns {Promise<string>} Encrypted token string
 */
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(KEY);
}

/**
 * Verifies a signed JWT and returns the parsed payload.
 * @param {string} token 
 * @returns {Promise<Object|null>} Parsed payload or null if verification fails
 */
export async function decrypt(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, KEY, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
}
