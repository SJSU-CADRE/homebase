import User from './models/User.js'
import Channel from './models/Channel.js'
import Post from './models/Post.js'

const SEED_POSTS = [
  {
    title: 'Spring Show dates announced',
    excerpt: 'DMA BFA and MFA exhibitions will run May 12–18 in the Art Building gallery. Opening reception May 12, 6–8pm.',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=240&fit=crop',
    category: 'Announcement',
    variant: 'banner',
    featured: true,
  },
  {
    title: 'Visiting Artist Lecture',
    excerpt: 'Doors 6:30 / talk 7:00 in the DMA Gallery. All welcome.',
    image: 'https://static.wixstatic.com/media/3e90e7_3b5c4c77c3f745d2b3aaaaf86e686c9a~mv2.png/v1/fill/w_600,h_240,al_c,q_85/3e90e7_3b5c4c77c3f745d2b3aaaaf86e686c9a~mv2.png',
    category: 'Event',
    variant: 'image-left',
    featured: true,
  },
  {
    title: 'MFA critiques begin',
    excerpt: 'Schedule posted to the internal board. Contact your advisor for time slots.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    category: 'Program',
    variant: 'image-right',
    featured: true,
  },
]

export async function runSeed() {
  // Ensure system user exists
  let systemUser = await User.findOne({ oktaId: 'system' })
  if (!systemUser) {
    systemUser = await User.create({
      oktaId: 'system',
      email: 'system@homebase.internal',
      name: 'System',
      role: 'admin',
    })
    console.log('Created system user')
  }

  // Ensure announcements channel exists
  let channel = await Channel.findOne({ name: 'announcements' })
  if (!channel) {
    channel = await Channel.create({
      name: 'announcements',
      description: 'Official announcements and news for the CADRE / DMA community.',
      createdBy: systemUser._id,
      isPrivate: false,
    })
    console.log('Created announcements channel')
  }

  // Upsert each seed post (match by title to stay idempotent)
  for (const data of SEED_POSTS) {
    const existing = await Post.findOne({ title: data.title, channel: channel._id })
    if (!existing) {
      await Post.create({ ...data, channel: channel._id, author: systemUser._id })
      console.log(`Created post: "${data.title}"`)
    } else {
      console.log(`Skipped (already exists): "${data.title}"`)
    }
  }

  console.log('Seed complete.')
}
