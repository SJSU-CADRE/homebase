import OktaJwtVerifier from '@okta/jwt-verifier'

const verifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_ISSUER, // e.g. https://sjsu.okta.com/oauth2/default
})

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const jwt = await verifier.verifyAccessToken(token, process.env.OKTA_AUDIENCE || 'api://default')
    req.user = { id: jwt.claims.sub, email: jwt.claims.email }
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
