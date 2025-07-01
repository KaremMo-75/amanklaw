import BlogPostClient from './blog-post-client';

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Return all possible blog post IDs that should be pre-rendered
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}