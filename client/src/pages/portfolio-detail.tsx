import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, ArrowLeft, Calendar, Tag } from "lucide-react";
import { PortfolioProject } from "@shared/schema";
import { useLanguage } from "@/context/language-context";
import { Link, useParams } from "wouter";

export default function PortfolioDetail() {
  const { language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  
  // Get single project from the full list (since we don't have a specific endpoint)
  const { data: projects, isLoading } = useQuery<PortfolioProject[]>({
    queryKey: [`/api/portfolio?lang=${language}`],
  });

  const project = projects?.find(p => p.id.toString() === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-8 w-32"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            {language === 'it' ? 'Progetto non trovato' : 'Project not found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'it' 
              ? 'Il progetto che stai cercando non esiste o è stato rimosso.' 
              : 'The project you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <Link href="/portfolio" className="text-primary hover:underline">
            {language === 'it' ? 'Torna al portfolio' : 'Back to portfolio'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'it' ? 'Torna al portfolio' : 'Back to portfolio'}
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary">
              {project.title}
            </h1>
            {project.featured && (
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Technologies */}
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              {language === 'it' ? 'Tecnologie' : 'Technologies'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-4">
              {language === 'it' ? 'Link del progetto' : 'Project Links'}
            </h3>
            <div className="space-y-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <ExternalLink className="w-5 h-5" />
                  {language === 'it' ? 'Vedi Demo Live' : 'View Live Demo'}
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <Github className="w-5 h-5" />
                  {language === 'it' ? 'Vedi Codice' : 'View Code'}
                </a>
              )}
            </div>
          </div>

          {/* Project Stats */}
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-4">
              {language === 'it' ? 'Dettagli del progetto' : 'Project Details'}
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {language === 'it' ? 'Progetto' : 'Project'} #{project.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>
                  {project.technologies.length} {language === 'it' ? 'tecnologie' : 'technologies'}
                </span>
              </div>
              {project.featured && (
                <div className="flex items-center gap-2">
                  ⭐ <span>{language === 'it' ? 'Progetto in evidenza' : 'Featured project'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Description Extended */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-semibold text-secondary mb-6">
            {language === 'it' ? 'Descrizione dettagliata' : 'Detailed Description'}
          </h3>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-6">
              {project.description}
            </p>
            <p className="leading-relaxed">
              {language === 'it' 
                ? `Questo progetto è stato sviluppato utilizzando ${project.technologies.join(', ')} e rappresenta un esempio delle mie competenze nel creare soluzioni moderne e scalabili. L'approccio utilizzato combina best practices di sviluppo con un'esperienza utente ottimale.`
                : `This project was developed using ${project.technologies.join(', ')} and represents an example of my skills in creating modern and scalable solutions. The approach used combines development best practices with optimal user experience.`
              }
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-12 mb-16">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            {language === 'it' ? 'Ti piace questo progetto?' : 'Like this project?'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === 'it' 
              ? 'Se sei interessato a collaborare o vuoi discutere di un progetto simile, non esitare a contattarmi!'
              : 'If you\'re interested in collaborating or want to discuss a similar project, don\'t hesitate to contact me!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {language === 'it' ? 'Contattami' : 'Contact Me'}
            </Link>
            <Link
              href="/portfolio"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {language === 'it' ? 'Altri progetti' : 'More projects'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}