import { Linkedin, Github, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mattia Puntarello</h3>
            <p className="text-gray-300 mb-4">
              Full-Stack Developer specializzato in soluzioni web moderne e user experience coinvolgenti.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Link Rapidi</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("history")}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Storia
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Contatti
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Servizi</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Sviluppo Web</p>
              <p className="text-gray-300">UI/UX Design</p>
              <p className="text-gray-300">Consulenza Tecnica</p>
              <p className="text-gray-300">Formazione</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Mattia Puntarello. Tutti i diritti riservati. | Realizzato con React e ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
