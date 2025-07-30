import { translations, Language } from "./translations";
import { PortfolioProject, TimelineItem, BlogPost } from "./schema";

// Utility functions to translate database content
export function translateProject(project: PortfolioProject, language: Language): PortfolioProject {
  const contentTranslations = translations[language].content;
  const projectTranslation = contentTranslations.projects[project.id as keyof typeof contentTranslations.projects];
  
  if (projectTranslation) {
    return {
      ...project,
      title: projectTranslation.title,
      description: projectTranslation.description
    };
  }
  
  return project; // Return original if no translation found
}

export function translateTimelineItem(item: TimelineItem, language: Language): TimelineItem {
  const contentTranslations = translations[language].content;
  const timelineTranslation = contentTranslations.timeline[item.id as keyof typeof contentTranslations.timeline];
  
  if (timelineTranslation) {
    return {
      ...item,
      title: timelineTranslation.title,
      company: timelineTranslation.company,
      location: timelineTranslation.location,
      description: timelineTranslation.description
    };
  }
  
  return item; // Return original if no translation found
}

export function translateBlogPost(post: BlogPost, language: Language): BlogPost {
  const contentTranslations = translations[language].content;
  const blogTranslation = contentTranslations.blog[post.id as keyof typeof contentTranslations.blog];
  
  if (blogTranslation) {
    return {
      ...post,
      title: blogTranslation.title,
      excerpt: blogTranslation.excerpt,
      content: blogTranslation.content,
      category: blogTranslation.category
    };
  }
  
  return post; // Return original if no translation found
}

// Batch translation functions
export function translateProjects(projects: PortfolioProject[], language: Language): PortfolioProject[] {
  return projects.map(project => translateProject(project, language));
}

export function translateTimelineItems(items: TimelineItem[], language: Language): TimelineItem[] {
  return items.map(item => translateTimelineItem(item, language));
}

export function translateBlogPosts(posts: BlogPost[], language: Language): BlogPost[] {
  return posts.map(post => translateBlogPost(post, language));
}