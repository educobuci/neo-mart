export const dynamic = 'force-dynamic' // defaults to auto

import { jwt } from 'twilio'

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || ''
const twilioApiKeySid = process.env.TWILIO_API_KEY_SID || ''
const twilioApiKeySecret = process.env.TWILIO_API_KET_SECRET || ''

export async function GET(request: Request) {
  const token = new jwt.AccessToken(
    twilioAccountSid,
    twilioApiKeySid,
    twilioApiKeySecret,
    {
      identity: 'user',
      ttl: 3600,
    },
  )

  return Response.json({ jwt: token.toJwt() })
}
