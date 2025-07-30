import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Filter } from "lucide-react";
import { PortfolioProject } from "@shared/schema";
import { useLanguage } from "@/context/language-context";
import { Link } from "wouter";
import { useState } from "react";

export default function PortfolioList() {
  const { t, language } = useLanguage();
  const [selectedTech, setSelectedTech] = useState<string>("");
  
  const { data: projects, isLoading } = useQuery<PortfolioProject[]>({
    queryKey: [`/api/portfolio?lang=${language}`],
  });

  // Get all unique technologies for filtering
  const allTechnologies = projects?.reduce((acc: string[], project) => {
    project.technologies.forEach(tech => {
      if (!acc.includes(tech)) acc.push(tech);
    });
    return acc;
  }, []) || [];

  // Filter projects by selected technology
  const filteredProjects = selectedTech 
    ? projects?.filter(project => project.technologies.includes(selectedTech))
    : projects;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            {t("portfolio", "title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("portfolio", "description")}
          </p>
        </div>

        {/* Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">
                {language === 'it' ? 'Filtra per tecnologia:' : 'Filter by technology:'}
              </span>
            </div>
            <button
              onClick={() => setSelectedTech("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTech === "" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {language === 'it' ? 'Tutti' : 'All'}
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTech === tech 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects?.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t("portfolio", "demoLive")}
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      {t("portfolio", "code")}
                    </a>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/portfolio/${project.id}`}
                    className="text-primary hover:underline font-medium text-sm"
                  >
                    {language === 'it' ? 'Vedi dettagli →' : 'View details →'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {language === 'it' 
                ? 'Nessun progetto trovato per questa tecnologia.'
                : 'No projects found for this technology.'}
            </p>
            <button
              onClick={() => setSelectedTech("")}
              className="mt-4 text-primary hover:underline"
            >
              {language === 'it' ? 'Mostra tutti i progetti' : 'Show all projects'}
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center pb-16">
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