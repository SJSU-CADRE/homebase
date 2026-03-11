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
        <h2>front page posts</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          {posts.map(post => (
            <div key={post._id} style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{post.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--dim)', marginBottom: '6px' }}>
                {post.category} · {post.variant}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn" onClick={() => startEdit(post)}>edit</button>
                <button className="btn" onClick={() => handleDelete(post._id)}>delete</button>
              </div>
            </div>
          ))}
          <button className="btn" style={{ marginTop: '8px' }} onClick={startNew}>+ new post</button>
        </div>
      </section>

      <section className="right-col">
        <h2>{editingId ? 'edit post' : 'new post'}</h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
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
          <label style={{ fontSize: '12px' }}>
            layout variant
            <select
              style={{ display: 'block', width: '100%', marginTop: '4px' }}
              value={form.variant}
              onChange={e => setForm(f => ({ ...f, variant: e.target.value }))}
            >
              <option value="banner">banner</option>
              <option value="image-left">image left</option>
              <option value="image-right">image right</option>
              <option value="text">text only</option>
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
