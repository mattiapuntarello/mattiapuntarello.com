import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { translateProjects, translateTimelineItems, translateBlogPosts } from "@shared/content-translator";
import { Language } from "@shared/translations";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const language = (req.query.lang as Language) || 'it';
      const projects = await storage.getPortfolioProjects();
      const translatedProjects = translateProjects(projects, language);
      res.json(translatedProjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio projects" });
    }
  });

  app.get("/api/portfolio/featured", async (req, res) => {
    try {
      const language = (req.query.lang as Language) || 'it';
      const projects = await storage.getFeaturedProjects();
      const translatedProjects = translateProjects(projects, language);
      res.json(translatedProjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  // Timeline routes
  app.get("/api/timeline", async (req, res) => {
    try {
      const language = (req.query.lang as Language) || 'it';
      const timeline = await storage.getTimelineItems();
      const translatedTimeline = translateTimelineItems(timeline, language);
      res.json(translatedTimeline);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline items" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const language = (req.query.lang as Language) || 'it';
      const posts = await storage.getPublishedBlogPosts();
      const translatedPosts = translateBlogPosts(posts, language);
      res.json(translatedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const language = (req.query.lang as Language) || 'it';
      const { slug } = req.params;
      const post = await storage.getBlogPost(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      const translatedPost = translateBlogPosts([post], language)[0];
      res.json(translatedPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // Here you could integrate with email service like Nodemailer
      // For now, we'll just log the message
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

  const httpServer = createServer(app);
  return httpServer;
}