export const translations = {
  it: {
    // Navigation
    nav: {
      home: "Home",
      portfolio: "Portfolio", 
      history: "Storia",
      blog: "Blog",
      contact: "Contatti"
    },
    // Hero Section
    hero: {
      greeting: "Ciao, sono",
      name: "Mattia",
      title: "Full-Stack Developer & UI/UX Designer",
      description: "Creo esperienze digitali moderne e funzionali che combinano design elegante e tecnologia all'avanguardia. Specializzato in React, Angular e soluzioni web innovative.",
      viewPortfolio: "Vedi Portfolio",
      contactMe: "Contattami"
    },
    // Portfolio Section
    portfolio: {
      title: "Portfolio",
      subtitle: "Una selezione dei miei progetti più significativi, dalle applicazioni web moderne alle soluzioni enterprise.",
      demoLive: "Demo Live",
      code: "Codice"
    },
    // History Section
    history: {
      title: "La Mia Storia",
      subtitle: "Il mio percorso professionale ed educativo nel mondo della tecnologia e del design.",
      present: "Presente"
    },
    // Blog Section
    blog: {
      title: "Blog & Insights",
      subtitle: "Condivido le mie esperienze, tutorial e riflessioni sul mondo dello sviluppo web e del design.",
      readTime: "min lettura",
      readMore: "Leggi tutto",
      viewAll: "Vedi tutti gli articoli"
    },
    // Contact Section
    contact: {
      title: "Contattami",
      subtitle: "Hai un progetto in mente? Collaboriamo per trasformare le tue idee in realtà digitali innovative.",
      getInTouch: "Mettiamoci in contatto",
      email: "Email",
      phone: "Telefono", 
      location: "Ubicazione",
      followMe: "Seguimi sui social",
      form: {
        name: "Nome Completo",
        namePlaceholder: "Il tuo nome",
        email: "Email",
        emailPlaceholder: "la.tua.email@example.com",
        subject: "Oggetto",
        subjectPlaceholder: "Di cosa vuoi parlare?",
        message: "Messaggio",
        messagePlaceholder: "Raccontami del tuo progetto...",
        sending: "Invio in corso...",
        send: "Invia Messaggio"
      },
      success: {
        title: "Messaggio inviato!",
        description: "Grazie per il tuo messaggio. Ti risponderò al più presto."
      },
      error: {
        title: "Errore",
        description: "Si è verificato un errore nell'invio del messaggio."
      }
    },
    // Footer
    footer: {
      description: "Full-Stack Developer specializzato in soluzioni web moderne e user experience coinvolgenti.",
      quickLinks: "Link Rapidi",
      services: "Servizi",
      servicesList: {
        webDev: "Sviluppo Web",
        uiux: "UI/UX Design", 
        consulting: "Consulenza Tecnica",
        training: "Formazione"
      },
      copyright: "Tutti i diritti riservati. | Realizzato con React e ❤️"
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      history: "History", 
      blog: "Blog",
      contact: "Contact"
    },
    // Hero Section
    hero: {
      greeting: "Hi, I'm",
      name: "Mattia",
      title: "Full-Stack Developer & UI/UX Designer",
      description: "I create modern and functional digital experiences that combine elegant design with cutting-edge technology. Specialized in React, Angular and innovative web solutions.",
      viewPortfolio: "View Portfolio",
      contactMe: "Contact Me"
    },
    // Portfolio Section
    portfolio: {
      title: "Portfolio",
      subtitle: "A selection of my most significant projects, from modern web applications to enterprise solutions.",
      demoLive: "Live Demo",
      code: "Code"
    },
    // History Section
    history: {
      title: "My Story",
      subtitle: "My professional and educational journey in the world of technology and design.",
      present: "Present"
    },
    // Blog Section
    blog: {
      title: "Blog & Insights",
      subtitle: "I share my experiences, tutorials and reflections on the world of web development and design.",
      readTime: "min read",
      readMore: "Read more",
      viewAll: "View all articles"
    },
    // Contact Section
    contact: {
      title: "Contact Me",
      subtitle: "Have a project in mind? Let's collaborate to transform your ideas into innovative digital realities.",
      getInTouch: "Let's get in touch",
      email: "Email",
      phone: "Phone",
      location: "Location", 
      followMe: "Follow me on social",
      form: {
        name: "Full Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your.email@example.com",
        subject: "Subject",
        subjectPlaceholder: "What would you like to talk about?",
        message: "Message",
        messagePlaceholder: "Tell me about your project...",
        sending: "Sending...",
        send: "Send Message"
      },
      success: {
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you as soon as possible."
      },
      error: {
        title: "Error",
        description: "An error occurred while sending the message."
      }
    },
    // Footer
    footer: {
      description: "Full-Stack Developer specialized in modern web solutions and engaging user experiences.",
      quickLinks: "Quick Links",
      services: "Services",
      servicesList: {
        webDev: "Web Development",
        uiux: "UI/UX Design",
        consulting: "Technical Consulting", 
        training: "Training"
      },
      copyright: "All rights reserved. | Made with React and ❤️"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.it;