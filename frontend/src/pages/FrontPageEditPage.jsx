import { useState, useEffect } from 'react'
import { useOktaAuth } from '@okta/okta-react'

const EMPTY_FORM = {
  title: '',
  excerpt: '',
  image: '',
  category: 'Announcement',
  variant: 'banner',
  featured: true,
}

const LAYOUT_OPTIONS = [
  { value: 'compact', label: 'compact' },
  { value: 'image-left', label: 'image left' },
  { value: 'image-right', label: 'image right' },
  { value: 'banner', label: 'banner' },
]

function LayoutThumb({ value }) {
  if (value === 'compact') {
    return (
      <svg viewBox="0 0 50 50" width="50" height="50" style={{ display: 'block' }}>
        <rect x="0.5" y="0.5" width="49" height="49" fill="var(--bg)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="1" y="1" width="48" height="26" fill="var(--dim)" opacity="0.25"/>
        <rect x="7" y="32" width="36" height="2.5" fill="var(--dim)" opacity="0.5" rx="1"/>
        <rect x="7" y="38" width="28" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
        <rect x="7" y="44" width="32" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
      </svg>
    )
  }
  if (value === 'image-left') {
    return (
      <svg viewBox="0 0 100 50" width="100" height="50" style={{ display: 'block' }}>
        <rect x="0.5" y="0.5" width="99" height="49" fill="var(--bg)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="1" y="1" width="36" height="48" fill="var(--dim)" opacity="0.25"/>
        <line x1="37" y1="0" x2="37" y2="50" stroke="var(--border)" strokeWidth="1"/>
        <rect x="43" y="12" width="50" height="3" fill="var(--dim)" opacity="0.5" rx="1"/>
        <rect x="43" y="20" width="40" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
        <rect x="43" y="26" width="46" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
        <rect x="43" y="32" width="30" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
      </svg>
    )
  }
  if (value === 'image-right') {
    return (
      <svg viewBox="0 0 100 50" width="100" height="50" style={{ display: 'block' }}>
        <rect x="0.5" y="0.5" width="99" height="49" fill="var(--bg)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="63" y="1" width="36" height="48" fill="var(--dim)" opacity="0.25"/>
        <line x1="63" y1="0" x2="63" y2="50" stroke="var(--border)" strokeWidth="1"/>
        <rect x="7" y="12" width="50" height="3" fill="var(--dim)" opacity="0.5" rx="1"/>
        <rect x="7" y="20" width="40" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
        <rect x="7" y="26" width="46" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
        <rect x="7" y="32" width="30" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 150 50" width="150" height="50" style={{ display: 'block' }}>
      <rect x="0.5" y="0.5" width="149" height="49" fill="var(--bg)" stroke="var(--border)" strokeWidth="1"/>
      <rect x="1" y="1" width="148" height="24" fill="var(--dim)" opacity="0.25"/>
      <line x1="0" y1="25" x2="150" y2="25" stroke="var(--border)" strokeWidth="1"/>
      <rect x="10" y="30" width="130" height="3" fill="var(--dim)" opacity="0.5" rx="1"/>
      <rect x="10" y="37" width="100" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
      <rect x="10" y="43" width="115" height="2" fill="var(--dim)" opacity="0.3" rx="1"/>
    </svg>
  )
}

export default function FrontPageEditPage() {
  const { oktaAuth } = useOktaAuth()
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function authHeaders() {
    const token = oktaAuth.getAccessToken()
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  }

  function loadPosts() {
    fetch('/api/posts?channelName=announcements&featured=true')
      .then(r => r.json())
      .then(setPosts)
      .catch(() => {})
  }

  useEffect(() => { loadPosts() }, [])

  function startEdit(post) {
    setEditingId(post._id)
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category,
      variant: post.variant,
      featured: post.featured,
    })
    setError('')
  }

  function startNew() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setError('')
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = editingId ? `/api/posts/${editingId}` : '/api/posts'
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? form : { ...form, channelName: 'announcements' }
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) })
      if (!res.ok) throw new Error((await res.json()).error)
      loadPosts()
      startNew()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE', headers: authHeaders() })
      loadPosts()
      if (editingId === id) startNew()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="columns">
      <section className="left-col">
        <h2>preview</h2>
        <iframe
          src="/"
          title="Front page preview"
          style={{
            width: '100%',
            height: '480px',
            border: '1px solid var(--border)',
            marginTop: '16px',
            borderRadius: '4px',
            background: 'var(--bg)',
          }}
        />
      </section>

      <section className="right-col" style={{ alignItems: 'flex-start' }}>
        <h2>{editingId ? 'edit post' : 'new post'}</h2>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', marginTop: '16px', marginBottom: '4px' }}>
          {LAYOUT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm(f => ({ ...f, variant: opt.value }))}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '6px',
                background: 'none',
                border: 'none',
                padding: '0',
                cursor: 'pointer',
                opacity: form.variant === opt.value ? 1 : 0.4,
              }}
            >
              <div style={{
                outline: form.variant === opt.value ? '2px solid var(--fg)' : '2px solid transparent',
                outlineOffset: '2px',
                lineHeight: 0,
              }}>
                <LayoutThumb value={opt.value} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'inherit' }}>{opt.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', width: '100%', maxWidth: '700px' }}>
          <label style={{ fontSize: '12px' }}>
            title
            <input
              style={{ display: 'block', width: '100%', marginTop: '4px' }}
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </label>
          <label style={{ fontSize: '12px' }}>
            excerpt
            <textarea
              style={{ display: 'block', width: '100%', marginTop: '4px', minHeight: '72px' }}
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            />
          </label>
          <label style={{ fontSize: '12px' }}>
            image url
            <input
              style={{ display: 'block', width: '100%', marginTop: '4px' }}
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            />
          </label>
          <label style={{ fontSize: '12px' }}>
            category
            <select
              style={{ display: 'block', width: '100%', marginTop: '4px' }}
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              <option>Announcement</option>
              <option>Event</option>
              <option>Program</option>
              <option>News</option>
            </select>
          </label>
          <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
            />
            show on front page
          </label>
          {error && <div style={{ color: 'var(--accent)', fontSize: '12px' }}>{error}</div>}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn" type="submit" disabled={saving}>
              {saving ? 'saving…' : 'save'}
            </button>
            {editingId && <button className="btn" type="button" onClick={startNew}>cancel</button>}
          </div>
        </form>
      </section>
    </div>
  )
}
