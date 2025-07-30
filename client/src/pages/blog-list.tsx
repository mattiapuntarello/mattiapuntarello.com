import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { BlogPost } from "@shared/schema";
import { useLanguage } from "@/context/language-context";
import { Link } from "wouter";

export default function BlogList() {
  const { t, language } = useLanguage();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: [`/api/blog?lang=${language}`],
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
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto"></div>
          </div>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-48 h-32 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            {t("blog", "title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("blog", "description")}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} {t("blog", "readTime")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {post.category}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    {t("blog", "readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16 pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            ← {language === 'it' ? 'Torna alla home' : 'Back to home'}
          </Link>
        </div>
      </div>
    </div>
  );
}