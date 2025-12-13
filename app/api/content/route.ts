import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const file = formData.get('file') as File | null;

    // Extract form fields
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'type' && key !== 'file') {
        fields[key] = value as string;
      }
    }

    // Create content directory if it doesn't exist
    const contentDir = join(process.cwd(), 'content', type);
    if (!existsSync(contentDir)) {
      await mkdir(contentDir, { recursive: true });
    }

    // Handle file upload
    let fileName = '';
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory
      const uploadsDir = join(process.cwd(), 'public', 'uploads', type);
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      fileName = `${Date.now()}-${file.name}`;
      const filePath = join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
    }

    // Create markdown content
    const slug = fields.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const frontMatter = {
      ...fields,
      date: new Date().toISOString(),
      ...(fileName && { image: `/uploads/${type}/${fileName}` }),
    };

    const markdownContent = `---
${Object.entries(frontMatter)
  .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  .join('\n')}
---

${fields.content || fields.description || ''}
`;

    // Save markdown file
    const mdPath = join(contentDir, `${slug}.md`);
    await writeFile(mdPath, markdownContent);

    return NextResponse.json({
      success: true,
      message: 'Content saved successfully',
      slug,
    });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { success: false, message: 'Error saving content', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Content API endpoint',
    methods: ['POST'],
  });
}
