import innovateQa2026RecordingsData from "./recordings/innovate-qa-2026.json"

export interface RecordingChapter {
  time: string
  title: string
  summary: string
}

export interface Recording {
  slug: string
  sku: string
  title: string
  speaker: string
  company: string
  event: string
  recordedOn: string
  duration: string
  category: string
  accessTier: string
  price: string
  priceCents: number
  currency: string
  excerpt: string
  description: string[]
  outcomes: string[]
  tags: string[]
  chapters: RecordingChapter[]
  vimeoId?: string
  vimeoUrl?: string
  vimeoEmbedUrl?: string
  vimeoThumbnailUrl?: string
  vimeoTitle?: string
  vimeoAuthor?: string
}

const innovateQa2026Recordings = innovateQa2026RecordingsData as { recordings: Recording[] }

function stripVimeoFromExcerpt(excerpt: string) {
  return excerpt
    .replace(/\s*Vimeo:\s*https?:\/\/vimeo\.com\/\d+\s*/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function sanitizeRecording(recording: Recording): Recording {
  return {
    ...recording,
    excerpt: stripVimeoFromExcerpt(recording.excerpt),
    tags: recording.tags.filter((tag) => tag.trim().toLowerCase() !== "vimeo"),
  }
}

export const recordings: Recording[] = innovateQa2026Recordings.recordings.map(sanitizeRecording)

export function getRecordingBySlug(slug: string) {
  return recordings.find((recording) => recording.slug === slug)
}