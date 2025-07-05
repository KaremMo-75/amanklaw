import BlogPostClient from './blog-post-client';

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Return all possible blog post IDs that should be pre-rendered
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: 'new-developments-saudi-corporate-law' },
    { id: 'child-rights-custody-cases-guide' }
  ];
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}