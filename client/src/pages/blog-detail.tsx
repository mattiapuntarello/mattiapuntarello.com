import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { BlogPost } from "@shared/schema";
import { useLanguage } from "@/context/language-context";
import { Link, useParams } from "wouter";

export default function BlogDetail() {
  const { language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}?lang=${language}`],
  });

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return language === 'it' 
      ? d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
      : d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-8 w-32"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-96"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            {language === 'it' ? 'Articolo non trovato' : 'Article not found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'it' 
              ? 'L\'articolo che stai cercando non esiste o è stato rimosso.' 
              : 'The article you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <Link href="/blog" className="text-primary hover:underline">
            {language === 'it' ? 'Torna al blog' : 'Back to blog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'it' ? 'Torna al blog' : 'Back to blog'}
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime} {language === 'it' ? 'min lettura' : 'min read'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <div className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
            {post.excerpt}
          </div>
          
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
        </div>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8 pb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-gray-600">
              {language === 'it' 
                ? 'Ti è piaciuto questo articolo? Condividilo!' 
                : 'Did you like this article? Share it!'}
            </div>
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="text-primary hover:underline font-medium"
              >
                {language === 'it' ? 'Altri articoli' : 'More articles'}
              </Link>
              <Link
                href="/#contact"
                className="text-primary hover:underline font-medium"
              >
                {language === 'it' ? 'Contattami' : 'Contact me'}
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}