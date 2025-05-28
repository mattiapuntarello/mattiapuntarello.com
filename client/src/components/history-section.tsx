import { useQuery } from "@tanstack/react-query";
import { TimelineItem } from "@shared/schema";

export default function HistorySection() {
  const { data: timeline, isLoading } = useQuery<TimelineItem[]>({
    queryKey: ["/api/timeline"],
  });

  if (isLoading) {
    return (
      <section id="history" className="py-16 lg:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">La Mia Storia</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Il mio percorso professionale ed educativo nel mondo della tecnologia e del design.
            </p>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-0.5 h-32 bg-gray-200 mt-2"></div>
                </div>
                <div className="bg-gray-200 rounded-xl p-6 flex-1 h-32 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="history" className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">La Mia Storia</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Il mio percorso professionale ed educativo nel mondo della tecnologia e del design.
          </p>
        </div>

        <div className="space-y-8">
          {timeline?.map((item, index) => (
            <div key={item.id} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                  item.type === 'education' ? 'bg-accent' : 'bg-primary'
                }`}></div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex-1 group-hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {item.company} • {item.location}
                    </p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {item.startDate} - {item.endDate || 'Presente'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.type === 'education'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
