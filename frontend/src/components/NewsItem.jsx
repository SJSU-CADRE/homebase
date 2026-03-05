export default function NewsItem({ variant = 'banner', image, imageAlt, meta, title, excerpt }) {
  return (
    <article className={`news-item news-item--${variant}`}>
      {image && (
        <div className="news-image">
          <img src={image} alt={imageAlt || ''} loading="lazy" />
        </div>
      )}
      <div className="news-body">
        {meta && <div className="news-meta">{meta}</div>}
        <h3 className="news-title">{title}</h3>
        {excerpt && <p className="news-excerpt">{excerpt}</p>}
      </div>
    </article>
  )
}
