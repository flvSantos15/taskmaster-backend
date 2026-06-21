import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const taskStatusEnum = pgEnum("task_status", [
  "TODO",
  "IN_PROGRESS",
  "DONE",
]);

export const priorityEnum = pgEnum("priority", ["LOW", "MEDIUM", "HIGH"]);

// TASKS
export const tasks = pgTable("tasks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  status: taskStatusEnum("status").default("TODO").notNull(),

  priority: priorityEnum("priority").default("MEDIUM").notNull(),

  dueDate: timestamp("due_date"),

  assigneeId: varchar("assignee_id", { length: 255 })
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
