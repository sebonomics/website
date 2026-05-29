import { SignJWT, importPKCS8 } from "jose"

export async function GET() {
  const teamId = process.env.APPLE_MUSIC_TEAM_ID
  const keyId = process.env.APPLE_MUSIC_KEY_ID
  const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY?.replace(/\\n/g, "\n")

  if (!teamId || !keyId || !privateKey) {
    return Response.json({ configured: false }, { status: 503 })
  }

  try {
    const key = await importPKCS8(privateKey, "ES256")
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "ES256", kid: keyId })
      .setIssuedAt()
      .setExpirationTime("180d")
      .setIssuer(teamId)
      .sign(key)

    return Response.json({ configured: true, token })
  } catch {
    return Response.json({ configured: false, error: "token_generation_failed" }, { status: 500 })
  }
}
