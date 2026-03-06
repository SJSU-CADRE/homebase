import { useEffect } from 'react'
import { useOktaAuth } from '@okta/okta-react'

export default function LoginModal({ onClose }) {
  const { oktaAuth } = useOktaAuth()
  // Close on Escape key
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2>login</h2>
        <p>Sign in with your SJSU account to access Homebase.</p>
        <button
          className="modal-btn"
          onClick={() => oktaAuth.signInWithRedirect()}
        >
          sign in with SJSU / Okta →
        </button>
      </div>
    </div>
  )
}
