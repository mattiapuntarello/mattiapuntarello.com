var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  contactMessages: () => contactMessages,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertPortfolioProjectSchema: () => insertPortfolioProjectSchema,
  insertTimelineItemSchema: () => insertTimelineItemSchema,
  insertUserSchema: () => insertUserSchema,
  portfolioProjects: () => portfolioProjects,
  timelineItems: () => timelineItems,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  title: text("title_it").notNull(),
  description: text("description_it").notNull(),
  imageUrl: text("image_url").notNull(),
  technologies: text("technologies").array().notNull(),
  demoUrl: text("demo_url"),
  codeUrl: text("code_url"),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  title_en: text("title_en").notNull(),
  description_en: text("description_en").notNull()
});
var timelineItems = pgTable("timeline_items", {
  id: serial("id").primaryKey(),
  title: text("title_it").notNull(),
  company: text("company").notNull(),
  location: text("location_it").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description_it").notNull(),
  technologies: text("technologies").array().notNull(),
  type: text("type").notNull(),
  // 'work' or 'education'
  order: integer("order").default(0),
  title_en: text("title_en").notNull(),
  location_en: text("location_en").notNull(),
  description_en: text("description_en").notNull()
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title_it").notNull(),
  excerpt: text("excerpt_it").notNull(),
  content: text("content_it").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  readTime: integer("read_time").notNull(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  slug: text("slug").notNull().unique(),
  title_en: text("title_en").notNull(),
  excerpt_en: text("excerpt_en").notNull(),
  content_en: text("content_en").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertPortfolioProjectSchema = createInsertSchema(portfolioProjects).omit({
  id: true
});
var insertTimelineItemSchema = createInsertSchema(timelineItems).omit({
  id: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});

// server/db.ts
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var isLocalPostgres = process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1");
var dbInstance = null;
async function getDb() {
  if (dbInstance) return dbInstance;
  if (isLocalPostgres) {
    const pg = await import("pg");
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const Pool = pg.default?.Pool || pg.Pool;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: false
    });
    dbInstance = drizzle(pool, { schema: schema_exports });
  } else {
    const { Pool, neonConfig } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-serverless");
    const ws = await import("ws");
    neonConfig.webSocketConstructor = ws.default;
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    dbInstance = drizzle({ client: pool, schema: schema_exports });
  }
  return dbInstance;
}
var db = getDb();

// server/storage.ts
import { eq } from "drizzle-orm";

// client/src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
var supabaseUrl = process.env.VITE_SUPABASE_URL;
var supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
var supabase = createClient(supabaseUrl, supabaseAnonKey);

// server/storage.ts
var DatabaseStorage = class {
  async getUser(id) {
    const database = await getDb();
    const [user] = await database.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const database = await getDb();
    const [user] = await database.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const database = await getDb();
    const [user] = await database.insert(users).values(insertUser).returning();
    return user;
  }
  async getPortfolioProjects_IT() {
    const { data, error } = await supabase.from("portfolio_projects").select(`
      id,
      title_it,
      description_it,
      image_url,
      technologies,
      demo_url,
      code_url,
      featured,
      order,
      title_en,
      description_en
    `).order("order", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_it,
      description: item.description_it,
      imageUrl: item.image_url,
      technologies: item.technologies,
      demoUrl: item.demo_url,
      codeUrl: item.code_url,
      featured: item.featured,
      order: item.order,
      title_en: item.title_en,
      description_en: item.description_en
    }));
    return mapped;
  }
  async getPortfolioProjects_EN() {
    const { data, error } = await supabase.from("portfolio_projects").select(`
      id,
      title_it,
      description_it,
      image_url,
      technologies,
      demo_url,
      code_url,
      featured,
      order,
      title_en,
      description_en
    `).order("order", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_en,
      description: item.description_en,
      imageUrl: item.image_url,
      technologies: item.technologies,
      demoUrl: item.demo_url,
      codeUrl: item.code_url,
      featured: item.featured,
      order: item.order,
      title_en: item.title_en,
      description_en: item.description_en
    }));
    return mapped;
  }
  async getFeaturedProjects_IT() {
    const { data, error } = await supabase.from("portfolio_projects").select(`
      id,
      title_it,
      description_it,
      image_url,
      technologies,
      demo_url,
      code_url,
      featured,
      order,
      title_en,
      description_en
    `).eq("featured", true).order("order", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_it,
      description: item.description_it,
      imageUrl: item.image_url,
      technologies: item.technologies,
      demoUrl: item.demo_url,
      codeUrl: item.code_url,
      featured: item.featured,
      order: item.order,
      title_en: item.title_en,
      description_en: item.description_en
    }));
    return mapped;
  }
  async getFeaturedProjects_EN() {
    const { data, error } = await supabase.from("portfolio_projects").select(`
      id,
      title_it,
      description_it,
      image_url,
      technologies,
      demo_url,
      code_url,
      featured,
      order,
      title_en,
      description_en
    `).eq("featured", true).order("order", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_en,
      description: item.description_en,
      imageUrl: item.image_url,
      technologies: item.technologies,
      demoUrl: item.demo_url,
      codeUrl: item.code_url,
      featured: item.featured,
      order: item.order,
      title_en: item.title_en,
      description_en: item.description_en
    }));
    return mapped;
  }
  async createPortfolioProject(insertProject) {
    const database = await getDb();
    const [project] = await database.insert(portfolioProjects).values(insertProject).returning();
    return project;
  }
  async getTimelineItems_IT() {
    const { data, error } = await supabase.from("timeline_items").select(`
      id,
      type,
      title_it,
      description_it,
      technologies,
      order,
      company,
      location_it,
      start_date,
      end_date,
      title_en,
      location_en,
      description_en
    `).order("order", { ascending: true });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title_it,
      description: item.description_it,
      technologies: item.technologies,
      order: item.order,
      company: item.company,
      location: item.location_it,
      startDate: item.start_date,
      endDate: item.end_date,
      title_en: item.title_en,
      location_en: item.location_en,
      description_en: item.description_en
    }));
    return mapped;
  }
  async getTimelineItems_EN() {
    const { data, error } = await supabase.from("timeline_items").select(`
      id,
      type,
      title_it,
      description_it,
      technologies,
      order,
      company,
      location_it,
      start_date,
      end_date,
      title_en,
      location_en,
      description_en
    `).order("order", { ascending: true });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title_en,
      description: item.description_en,
      technologies: item.technologies,
      order: item.order,
      company: item.company,
      location: item.location_en,
      startDate: item.start_date,
      endDate: item.end_date,
      title_en: item.title_en,
      location_en: item.location_en,
      description_en: item.description_en
    }));
    return mapped;
  }
  async createTimelineItem(insertItem) {
    const database = await getDb();
    const [item] = await database.insert(timelineItems).values(insertItem).returning();
    return item;
  }
  /*async getBlogPosts_IT(): Promise<BlogPost[]> {
      const database = await getDb();
      return await database
        .select({
          id: blogPosts.id,
          title: blogPosts.title,
          excerpt: blogPosts.excerpt,
          content: blogPosts.content,
          imageUrl: blogPosts.imageUrl,
          category: blogPosts.category,
          readTime: blogPosts.readTime,
          published: blogPosts.published,
          createdAt: blogPosts.createdAt,
          slug: blogPosts.slug,
        })
        .from(blogPosts)
        .where(ne(blogPosts.category, 'PL'))
        .orderBy(desc(blogPosts.createdAt));
    }
  
    async getBlogPosts_EN(): Promise<BlogPost[]> {
      const database = await getDb();
      return await database
        .select({
          id: blogPosts.id,
          title: blogPosts.title_en,
          excerpt: blogPosts.excerpt_en,
          content: blogPosts.content_en,
          imageUrl: blogPosts.imageUrl,
          category: blogPosts.category,
          readTime: blogPosts.readTime,
          published: blogPosts.published,
          createdAt: blogPosts.createdAt,
          slug: blogPosts.slug,
        })
        .from(blogPosts)
        .where(ne(blogPosts.category, 'PL'))
        .orderBy(desc(blogPosts.createdAt));
    }*/
  async getPublishedBlogPosts_IT() {
    const { data, error } = await supabase.from("blog_posts").select(`
      id,
      title_it,
      excerpt_it,
      content_it,
      image_url,
      category,
      read_time,
      published,
      created_at,
      slug,
      title_en,
      excerpt_en,
      content_en
    `).eq("published", true).neq("category", "PL").order("created_at", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_it,
      excerpt: item.excerpt_it,
      content: item.content_it,
      imageUrl: item.image_url,
      category: item.category,
      readTime: item.read_time,
      published: item.published,
      createdAt: item.created_at,
      slug: item.slug,
      title_en: item.title_en,
      excerpt_en: item.excerpt_en,
      content_en: item.content_en
    }));
    return mapped;
  }
  async getPublishedBlogPosts_EN() {
    const { data, error } = await supabase.from("blog_posts").select(`
      id,
      title_it,
      excerpt_it,
      content_it,
      image_url,
      category,
      read_time,
      published,
      created_at,
      slug,
      title_en,
      excerpt_en,
      content_en
    `).eq("published", true).neq("category", "PL").order("created_at", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_en,
      excerpt: item.excerpt_en,
      content: item.content_en,
      imageUrl: item.image_url,
      category: item.category,
      readTime: item.read_time,
      published: item.published,
      createdAt: item.created_at,
      slug: item.slug,
      title_en: item.title_en,
      excerpt_en: item.excerpt_en,
      content_en: item.content_en
    }));
    return mapped;
  }
  async pt_getPublishedBlogPosts_IT() {
    const { data, error } = await supabase.from("blog_posts").select(`
      id,
      title_it,
      excerpt_it,
      content_it,
      image_url,
      category,
      read_time,
      published,
      created_at,
      slug,
      title_en,
      excerpt_en,
      content_en
    `).eq("published", true).eq("category", "PL").order("created_at", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_it,
      excerpt: item.excerpt_it,
      content: item.content_it,
      imageUrl: item.image_url,
      category: item.category,
      readTime: item.read_time,
      published: item.published,
      createdAt: item.created_at,
      slug: item.slug,
      title_en: item.title_en,
      excerpt_en: item.excerpt_en,
      content_en: item.content_en
    }));
    return mapped;
  }
  async pt_getPublishedBlogPosts_EN() {
    const { data, error } = await supabase.from("blog_posts").select(`
      id,
      title_it,
      excerpt_it,
      content_it,
      image_url,
      category,
      read_time,
      published,
      created_at,
      slug,
      title_en,
      excerpt_en,
      content_en
    `).eq("published", true).eq("category", "PL").order("created_at", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return [];
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_en,
      excerpt: item.excerpt_en,
      content: item.content_en,
      imageUrl: item.image_url,
      category: item.category,
      readTime: item.read_time,
      published: item.published,
      createdAt: item.created_at,
      slug: item.slug,
      title_en: item.title_en,
      excerpt_en: item.excerpt_en,
      content_en: item.content_en
    }));
    return mapped;
  }
  async getBlogPost_IT(slug) {
    const { data, error } = await supabase.from("blog_posts").select(`
      id,
      title_it,
      excerpt_it,
      content_it,
      image_url,
      category,
      read_time,
      published,
      created_at,
      slug,
      title_en,
      excerpt_en,
      content_en
    `).eq("slug", slug).order("created_at", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return void 0;
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_it,
      excerpt: item.excerpt_it,
      content: item.content_it,
      imageUrl: item.image_url,
      category: item.category,
      readTime: item.read_time,
      published: item.published,
      createdAt: item.created_at,
      slug: item.slug,
      title_en: item.title_en,
      excerpt_en: item.excerpt_en,
      content_en: item.content_en
    }));
    return mapped[0] || void 0;
  }
  async getBlogPost_EN(slug) {
    const { data, error } = await supabase.from("blog_posts").select(`
      id,
      title_it,
      excerpt_it,
      content_it,
      image_url,
      category,
      read_time,
      published,
      created_at,
      slug,
      title_en,
      excerpt_en,
      content_en
    `).eq("slug", slug).order("created_at", { ascending: false });
    if (error) {
      console.error("Errore Supabase:", error);
      return void 0;
    }
    const mapped = data.map((item) => ({
      id: item.id,
      title: item.title_en,
      excerpt: item.excerpt_en,
      content: item.content_en,
      imageUrl: item.image_url,
      category: item.category,
      readTime: item.read_time,
      published: item.published,
      createdAt: item.created_at,
      slug: item.slug,
      title_en: item.title_en,
      excerpt_en: item.excerpt_en,
      content_en: item.content_en
    }));
    return mapped[0] || void 0;
  }
  async createBlogPost(insertPost) {
    const database = await getDb();
    const [post] = await database.insert(blogPosts).values(insertPost).returning();
    return post;
  }
  async createContactMessage(insertMessage) {
    const database = await getDb();
    const [message] = await database.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/portfolio", async (req, res) => {
    try {
      const language = req.query.lang || "it";
      if (language === "en") {
        const translation = await storage.getPortfolioProjects_EN();
        res.json(translation);
      } else {
        const translation = await storage.getPortfolioProjects_IT();
        res.json(translation);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio projects" });
    }
  });
  app2.get("/api/portfolio/featured", async (req, res) => {
    try {
      const language = req.query.lang || "it";
      if (language === "en") {
        const translation = await storage.getFeaturedProjects_EN();
        res.json(translation);
      } else {
        const translation = await storage.getFeaturedProjects_IT();
        res.json(translation);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });
  app2.get("/api/timeline", async (req, res) => {
    try {
      const language = req.query.lang || "it";
      if (language === "en") {
        const translation = await storage.getTimelineItems_EN();
        res.json(translation);
      } else {
        const translation = await storage.getTimelineItems_IT();
        res.json(translation);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline items" });
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const language = req.query.lang || "it";
      if (language === "en") {
        const posts = await storage.getPublishedBlogPosts_EN();
        ;
        res.json(posts);
      } else {
        const posts = await storage.getPublishedBlogPosts_IT();
        res.json(posts);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/pt-blog", async (req, res) => {
    try {
      const language = req.query.lang || "it";
      if (language === "en") {
        const posts = await storage.pt_getPublishedBlogPosts_EN();
        ;
        res.json(posts);
      } else {
        const posts = await storage.pt_getPublishedBlogPosts_IT();
        res.json(posts);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
    try {
      const language = req.query.lang || "it";
      const { slug } = req.params;
      const post = language === "en" ? await storage.getBlogPost_EN(slug) : await storage.getBlogPost_IT(slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      return res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      console.log("New contact message:", message);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      }
      console.error("Failed to save contact message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/seed.ts
async function seedDatabase() {
  try {
    const database = await getDb();
    const existingProjects = await database.select().from(portfolioProjects).limit(1);
    if (existingProjects.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }
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
    await database.insert(portfolioProjects).values(projects);
    console.log("Portfolio projects seeded successfully");
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
        company: "Universit\xE0 Statale Milano",
        location: "Milano",
        startDate: "2018",
        endDate: "2020",
        description: 'Specializzazione in Ingegneria del Software e Human-Computer Interaction. Tesi su "Architetture Microservizi per Applicazioni Web Scalabili".',
        technologies: ["Software Engineering", "HCI", "110/110 Lode"],
        type: "education",
        order: 3
      }
    ];
    await database.insert(timelineItems).values(timeline);
    console.log("Timeline items seeded successfully");
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
    await database.insert(blogPosts).values(posts);
    console.log("Blog posts seeded successfully");
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await seedDatabase();
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = Number(process.env.PORT) || 5001;
  const host = process.env.REPLIT_DEV_DOMAIN ? "0.0.0.0" : "localhost";
  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
  });
})();
