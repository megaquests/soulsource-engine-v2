import { initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'

// Initialize Firebase Admin SDK
const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
}

export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()

// The Library Collection Schema
export interface TheLibraryDocument {
  content_snippet: string
  source_type: 'ai_generated' | 'human_written' | 'curated' | 'scraped'
  source_context: string
  hashtag_tags: string[]
  domain_relevance: string[]
  status: 'draft' | 'approved' | 'published' | 'archived'
  priority: number
  created_at: Date
  updated_at: Date
  created_by?: string
  word_count?: number
  seo_score?: number
}

// Content Posts Collection Schema
export interface ContentPostDocument {
  title: string
  slug: string
  content: string
  domain: string
  excerpt: string
  featured_image?: string
  meta_description: string
  meta_keywords: string[]
  status: 'draft' | 'published' | 'archived'
  published_at?: Date
  created_at: Date
  updated_at: Date
  author_id?: string
  category?: string
  tags: string[]
  reading_time?: number
  seo_score?: number
  internal_links?: string[]
  external_links?: string[]
}

// Initialize The Library Collection
export async function initializeTheLibrary() {
  const theLibraryRef = db.collection('the_library')
  
  // Sample data for testing
  const sampleContent: TheLibraryDocument[] = [
    {
      content_snippet: 'AcroYoga combines the wisdom of yoga, the dynamic power of acrobatics, and the loving-kindness of healing arts.',
      source_type: 'human_written',
      source_context: 'Brand manifesto for acroyoga.art',
      hashtag_tags: ['acroyoga', 'meditation', 'movement', 'artform'],
      domain_relevance: ['acroyoga.art'],
      status: 'published',
      priority: 1,
      created_at: new Date(),
      updated_at: new Date(),
      word_count: 15,
      seo_score: 85
    },
    {
      content_snippet: 'Heart Held Dance is a practice of moving from the center of your being, allowing your heart to guide every movement.',
      source_type: 'human_written',
      source_context: 'Brand narrative for hearthelddance.com',
      hashtag_tags: ['dance', 'heart', 'movement', 'meditation'],
      domain_relevance: ['hearthelddance.com', 'heartheldharmony.com'],
      status: 'published',
      priority: 2,
      created_at: new Date(),
      updated_at: new Date(),
      word_count: 16,
      seo_score: 82
    }
  ]
  
  // Add sample content
  for (const content of sampleContent) {
    await theLibraryRef.add(content)
  }
  
  console.log('The Library collection initialized with sample data')
}

// Initialize Content Posts Collection
export async function initializeContentPosts() {
  const contentPostsRef = db.collection('content_posts')
  
  // Sample content posts
  const samplePosts: ContentPostDocument[] = [
    {
      title: 'The Art of AcroYoga',
      slug: 'the-art-of-acroyoga',
      content: 'AcroYoga is more than just a physical practice—it\'s a form of moving meditation that brings people together...',
      domain: 'acroyoga.art',
      excerpt: 'Discover the transformative power of AcroYoga as both an art form and a spiritual practice.',
      meta_description: 'Learn about AcroYoga as an artform and moving meditation practice.',
      meta_keywords: ['acroyoga', 'artform', 'meditation', 'movement', 'partner yoga'],
      status: 'published',
      published_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      category: 'practice',
      tags: ['acroyoga', 'meditation', 'artform'],
      reading_time: 5,
      seo_score: 88,
      internal_links: ['/about'],
      external_links: []
    },
    {
      title: 'Heart Centered Movement',
      slug: 'heart-centered-movement',
      content: 'When we dance from the heart, every movement becomes an expression of our inner truth...',
      domain: 'hearthelddance.com',
      excerpt: 'Explore the practice of moving from your heart center in dance and life.',
      meta_description: 'Learn about heart-centered dance practices and moving from your center.',
      meta_keywords: ['dance', 'heart', 'movement', 'meditation', 'centered'],
      status: 'published',
      published_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      category: 'practice',
      tags: ['dance', 'heart', 'movement'],
      reading_time: 4,
      seo_score: 85,
      internal_links: ['/about'],
      external_links: []
    }
  ]
  
  // Add sample posts
  for (const post of samplePosts) {
    await contentPostsRef.add(post)
  }
  
  console.log('Content Posts collection initialized with sample data')
}
