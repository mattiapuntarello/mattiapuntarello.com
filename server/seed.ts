import { db } from "./db";
import { portfolioProjects, timelineItems, blogPosts } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Seed portfolio projects
  const projects = [
    {
      title: "Piattaforma E-Commerce",
      description: "Piattaforma completa con Angular, gestione ordini e pagamenti integrati.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Angular", "TypeScript", "Node.js"],
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      order: 1
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interattiva per visualizzazione dati in tempo reale con grafici avanzati.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["React", "D3.js", "Python"],
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      order: 2
    },
    {
      title: "App Mobile Fitness",
      description: "Applicazione mobile per il fitness con tracking avanzato e design intuitivo.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["React Native", "Firebase", "UI/UX"],
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      order: 3
    }
  ];

  await db.insert(portfolioProjects).values(projects);
  console.log("✓ Portfolio projects seeded");

  // Seed timeline items
  const timeline = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      location: "Milano",
      startDate: "2022",
      endDate: "Presente",
      description: "Sviluppo di applicazioni enterprise con Angular e .NET, gestione team di 5 sviluppatori e architettura di soluzioni scalabili.",
      technologies: ["Angular", ".NET Core", "Azure", "Team Leadership"],
      type: "work",
      order: 1
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "Roma",
      startDate: "2020",
      endDate: "2022",
      description: "Creazione di interfacce utente responsive e moderne per clienti enterprise, implementazione di design systems e ottimizzazione performance.",
      technologies: ["React", "Vue.js", "SASS", "Figma"],
      type: "work",
      order: 2
    },
    {
      title: "Laurea Magistrale in Informatica",
      company: "Università Statale Milano",
      location: "Milano",
      startDate: "2018",
      endDate: "2020",
      description: "Specializzazione in Ingegneria del Software e Human-Computer Interaction. Tesi su \"Architetture Microservizi per Applicazioni Web Scalabili\".",
      technologies: ["Software Engineering", "HCI", "110/110 Lode"],
      type: "education",
      order: 3
    }
  ];

  await db.insert(timelineItems).values(timeline);
  console.log("✓ Timeline items seeded");

  // Seed blog posts
  const posts = [
    {
      title: "Ottimizzazione Performance in Angular 17",
      excerpt: "Tecniche avanzate per migliorare le performance delle applicazioni Angular utilizzando le nuove features e best practices.",
      content: "Contenuto completo del post...",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "Angular",
      readTime: 5,
      published: true,
      slug: "ottimizzazione-performance-angular-17"
    },
    {
      title: "Design System: Da Zero a Produzione",
      excerpt: "Come ho creato un design system completo per una startup, dalle componenti base all'implementazione in codice.",
      content: "Contenuto completo del post...",
      imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "Design",
      readTime: 8,
      published: true,
      slug: "design-system-da-zero-a-produzione"
    },
    {
      title: "CI/CD per Progetti Angular",
      excerpt: "Setup completo di pipeline CI/CD per progetti Angular utilizzando GitHub Actions e deployment automatico.",
      content: "Contenuto completo del post...",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "DevOps",
      readTime: 12,
      published: true,
      slug: "cicd-per-progetti-angular"
    }
  ];

  await db.insert(blogPosts).values(posts);
  console.log("✓ Blog posts seeded");

  console.log("🎉 Database seeded successfully!");
}

seedDatabase()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });