// Dashboard: Reddit-style channel board (to be built out)


export default function DashboardPage() {
  return (
    <div className="columns">
      <section className="left-col">
        <h2>channels</h2>
        <p>Your community boards will appear here once you're signed in.</p>
      </section>
      <section className="right-col">
        <div className="news">
          <p style={{ color: 'var(--dim)', fontSize: '12px' }}>
            — no channels yet. create one to get started.
          </p>
        </div>
      </section>
    </div>
  )
}
