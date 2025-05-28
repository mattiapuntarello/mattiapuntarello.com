import { Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              {t.hero.greeting} <span className="text-primary">{t.hero.name}</span>
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-600 mb-8 font-light">
              {t.hero.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-center"
              >
                {t.hero.viewPortfolio}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center"
              >
                {t.hero.contactMe}
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
                alt="Mattia Puntarello - Sviluppatore Full-Stack"
                className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent text-white p-4 rounded-xl shadow-lg">
                <Code className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
