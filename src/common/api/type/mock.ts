import { type Article } from './article'
import { type Comment } from './comment'
import { type User } from './user'

// Helper to generate users
const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `user_${i + 1}`,
    email: `user${i + 1}@example.com`,
    bio: `Bio for user ${i + 1}. They love RealWorld apps!`,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 1}`,
  }))
}

// Helper to generate articles
const generateArticles = (count: number, users: User[]): Article[] => {
  return Array.from({ length: count }, (_, i) => {
    const author = users[i % users.length]
    return {
      id: i + 1,
      slug: `article-slug-${i + 1}`,
      title: `Article Title ${i + 1}`,
      description: `This is a beautiful description for article ${i + 1}.`,
      body: `This is the body of article ${i + 1}. It contains lots of interesting information!`,
      tagList: ['tag1', 'tag2', 'mock'],
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
      favorited: i % 3 === 0,
      favoritesCount: i * 5,
      author: {
        username: author.username,
        bio: author.bio,
        image: author.image,
        following: i % 2 === 0,
      },
    }
  })
}

// Helper to generate comments
const generateComments = (count: number, users: User[]): Comment[] => {
  return Array.from({ length: count }, (_, i) => {
    const author = users[i % users.length]
    return {
      id: i + 1,
      body: `This is a comment number ${i + 1}. It is very insightful!`,
      createdAt: new Date(Date.now() - i * 1800000).toISOString(),
      updatedAt: new Date(Date.now() - i * 1800000).toISOString(),
      author: {
        username: author.username,
        bio: author.bio,
        image: author.image,
        following: false,
      },
    }
  })
}

export const mockUsers = generateUsers(50)
export const mockArticles = generateArticles(50, mockUsers)
export const mockComments = generateComments(50, mockUsers)
