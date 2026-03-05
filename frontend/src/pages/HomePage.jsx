import NewsItem from '../components/NewsItem'

const NEWS = [
  {
    variant: 'banner',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=240&fit=crop',
    imageAlt: 'Generative / algorithmic art',
    meta: '02.06.26 · Announcement',
    title: 'Spring Show dates announced',
    excerpt: 'DMA BFA and MFA exhibitions will run May 12–18 in the Art Building gallery. Opening reception May 12, 6–8pm.',
  },
  {
    variant: 'image-left',
    image: 'https://static.wixstatic.com/media/3e90e7_3b5c4c77c3f745d2b3aaaaf86e686c9a~mv2.png/v1/fill/w_600,h_240,al_c,q_85/3e90e7_3b5c4c77c3f745d2b3aaaaf86e686c9a~mv2.png',
    imageAlt: 'Jer Thorp, Of A Feather',
    meta: '01.29.26 · Event',
    title: 'Visiting Artist Lecture',
    excerpt: 'Doors 6:30 / talk 7:00 in the DMA Gallery. All welcome.',
  },
  {
    variant: 'image-right',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    imageAlt: '',
    meta: '01.22.26 · Program',
    title: 'MFA critiques begin',
    excerpt: 'Schedule posted to the internal board. Contact your advisor for time slots.',
  },
]

export default function HomePage() {
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
          {NEWS.map((item, i) => (
            <NewsItem key={i} {...item} />
          ))}
        </div>
      </section>
    </div>
  )
}
