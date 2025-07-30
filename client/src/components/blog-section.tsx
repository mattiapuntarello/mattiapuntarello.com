import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@shared/schema";
import { useLanguage } from "@/context/language-context";

export default function BlogSection() {
  const { t, language } = useLanguage();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: [`/api/blog?lang=${language}`],
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">{t("blog", "title")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("blog", "description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">{t("blog", "title")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("blog", "description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    post.category === 'Design' 
                      ? 'bg-accent/10 text-accent'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {post.readTime} {t("blog", "readTime")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3 hover:text-primary transition-colors">
                  <a href={`#blog/${post.slug}`}>
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {formatDate(post.createdAt!)}
                  </span>
                  <a
                    href={`#blog/${post.slug}`}
                    className="text-primary hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    {t("blog", "readMore")} <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#blog"
            className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            {t("blog", "viewAll")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}