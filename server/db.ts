import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Detect if we're using a local PostgreSQL or Neon Database
const isLocalPostgres = process.env.DATABASE_URL.includes('localhost') || 
                       process.env.DATABASE_URL.includes('127.0.0.1');

let dbInstance: any = null;

export async function getDb() {
  if (dbInstance) return dbInstance;
  
  if (isLocalPostgres) {
    // Use standard PostgreSQL driver for local development
    const pg = await import('pg');
    const { drizzle } = await import('drizzle-orm/node-postgres');
    
    // Handle both CommonJS and ESM imports
    const Pool = pg.default?.Pool || pg.Pool;
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ssl: false 
    });
    
    dbInstance = drizzle(pool, { schema });
  } else {
    // Use Neon Database driver for production
    const { Pool, neonConfig } = await import('@neondatabase/serverless');
    const { drizzle } = await import('drizzle-orm/neon-serverless');
    const ws = await import('ws');
    
    neonConfig.webSocketConstructor = ws.default;
    
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    dbInstance = drizzle({ client: pool, schema });
  }
  
  return dbInstance;
}

// Export a promise that resolves to the db instance
export const db = getDb();