// import * as schema from '../db/schema'
// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

// const client = postgres(process.env.DATABASE_URL!, {
//   ssl: 'require'
// })

// export const db = drizzle(client, { schema })

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!);
