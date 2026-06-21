import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "USER"]);

// USERS
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: varchar("password", { length: 255 }).notNull(),

  name: varchar("name", { length: 255 }).notNull(),

  role: roleEnum("role").default("USER").notNull(),

  avatar: text("avatar"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
