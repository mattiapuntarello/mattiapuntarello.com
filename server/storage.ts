import { 
  users, 
  portfolioProjects,
  timelineItems,
  blogPosts,
  contactMessages,
  type User, 
  type InsertUser,
  type PortfolioProject,
  type InsertPortfolioProject,
  type TimelineItem,
  type InsertTimelineItem,
  type BlogPost,
  type InsertBlogPost,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getFeaturedProjects(): Promise<PortfolioProject[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  
  getTimelineItems(): Promise<TimelineItem[]>;
  createTimelineItem(item: InsertTimelineItem): Promise<TimelineItem>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioProjects: Map<number, PortfolioProject>;
  private timelineItems: Map<number, TimelineItem>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentTimelineId: number;
  private currentBlogId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.portfolioProjects = new Map();
    this.timelineItems = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentTimelineId = 1;
    this.currentBlogId = 1;
    this.currentMessageId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed portfolio projects
    const projects: InsertPortfolioProject[] = [
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

    projects.forEach(project => {
      this.createPortfolioProject(project);
    });

    // Seed timeline items
    const timeline: InsertTimelineItem[] = [
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

    timeline.forEach(item => {
      this.createTimelineItem(item);
    });

    // Seed blog posts
    const posts: InsertBlogPost[] = [
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

    posts.forEach(post => {
      this.createBlogPost(post);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getFeaturedProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values())
      .filter(project => project.featured)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createPortfolioProject(insertProject: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = this.currentProjectId++;
    const project: PortfolioProject = { 
      ...insertProject, 
      id,
      demoUrl: insertProject.demoUrl || null,
      codeUrl: insertProject.codeUrl || null,
      featured: insertProject.featured || false,
      order: insertProject.order || 0
    };
    this.portfolioProjects.set(id, project);
    return project;
  }

  async getTimelineItems(): Promise<TimelineItem[]> {
    return Array.from(this.timelineItems.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createTimelineItem(insertItem: InsertTimelineItem): Promise<TimelineItem> {
    const id = this.currentTimelineId++;
    const item: TimelineItem = { 
      ...insertItem, 
      id,
      endDate: insertItem.endDate || null,
      order: insertItem.order || 0
    };
    this.timelineItems.set(id, item);
    return item;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      published: insertPost.published || false,
      createdAt: new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects).orderBy(portfolioProjects.order);
  }

  async getFeaturedProjects(): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects)
      .where(eq(portfolioProjects.featured, true))
      .orderBy(portfolioProjects.order);
  }

  async createPortfolioProject(insertProject: InsertPortfolioProject): Promise<PortfolioProject> {
    const [project] = await db
      .insert(portfolioProjects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getTimelineItems(): Promise<TimelineItem[]> {
    return await db.select().from(timelineItems).orderBy(timelineItems.order);
  }

  async createTimelineItem(insertItem: InsertTimelineItem): Promise<TimelineItem> {
    const [item] = await db
      .insert(timelineItems)
      .values(insertItem)
      .returning();
    return item;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(blogPosts.createdAt);
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
