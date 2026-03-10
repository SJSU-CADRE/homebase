import { useState, useEffect } from 'react'
import NewsItem from '../components/NewsItem'

function formatMeta(isoDate, category) {
  const d = new Date(isoDate)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(2)
  return `${mm}.${dd}.${yy} · ${category}`
}

export default function HomePage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts?channelName=announcements&featured=true')
      .then(r => r.json())
      .then(data => setPosts(data))
      .catch(() => {})
  }, [])

  return (
    <div className="columns">
      <section className="left-col">
        <h2>Welcome</h2>
        <p>
          The CADRE Laboratory for New Media is the hub of Digital Media Art activity at San José
          State University where students, faculty, and visiting artists gather to explore the future
          of technology and art. <strong>CADRE (Computers in Art, Design, Research, and Education)</strong>{' '}
          faculty and students have participated in the evolution of art and technology for over 30 years.
        </p>
        <p>
          <strong>The Digital Media Art (DMA) program</strong> at San José State University is a
          multidisciplinary BFA degree offering digital art and design in computer graphics, web,
          programming, physical computing, 3D, fabrication, interactivity and games. Located in
          Silicon Valley.
        </p>
      </section>

      <section className="right-col">
        <div className="news">
          {posts.map(post => (
            <NewsItem
              key={post._id}
              variant={post.variant}
              image={post.image}
              imageAlt={post.title}
              meta={formatMeta(post.createdAt, post.category)}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
