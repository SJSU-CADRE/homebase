// Okta integration will be wired up once SJSU Okta credentials are available.
// For now this is a placeholder that shows the login UI.

export default function LoginPage() {
  return (
    <div className="columns">
      <section className="left-col">
        <h2>login</h2>
        <p>Sign in with your SJSU account to access Homebase.</p>
        <button
          type="button"
          style={{ marginTop: '16px', fontFamily: 'inherit', fontSize: '13px', cursor: 'pointer', padding: '8px 16px', border: '1px solid var(--border)', background: 'none', color: 'var(--fg)' }}
          onClick={() => alert('Okta SSO coming soon — add your SJSU Okta credentials to .env')}
        >
          sign in with SJSU / Okta →
        </button>
      </section>
    </div>
  )
}
