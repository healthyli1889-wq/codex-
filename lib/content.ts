import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentItem {
  slug: string;
  frontMatter: Record<string, any>;
  content: string;
}

/**
 * Get all content items of a specific type
 */
export function getAllContent(type: string): ContentItem[] {
  const typeDirectory = path.join(contentDirectory, type);

  // Create directory if it doesn't exist
  if (!fs.existsSync(typeDirectory)) {
    fs.mkdirSync(typeDirectory, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(typeDirectory);
  const items = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(typeDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontMatter: data,
        content,
      };
    });

  // Sort by date (newest first)
  return items.sort((a, b) => {
    const dateA = new Date(a.frontMatter.date || 0);
    const dateB = new Date(b.frontMatter.date || 0);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single content item by slug
 */
export function getContentBySlug(
  type: string,
  slug: string
): ContentItem | null {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontMatter: data,
      content,
    };
  } catch (error) {
    console.error(`Error reading content: ${type}/${slug}`, error);
    return null;
  }
}

/**
 * Get content by category
 */
export function getContentByCategory(
  type: string,
  category: string
): ContentItem[] {
  const allItems = getAllContent(type);
  return allItems.filter(
    (item) =>
      item.frontMatter.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Search content by query
 */
export function searchContent(type: string, query: string): ContentItem[] {
  const allItems = getAllContent(type);
  const lowerQuery = query.toLowerCase();

  return allItems.filter(
    (item) =>
      item.frontMatter.title?.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery) ||
      item.frontMatter.description?.toLowerCase().includes(lowerQuery) ||
      item.frontMatter.excerpt?.toLowerCase().includes(lowerQuery)
  );
}
