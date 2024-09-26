import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { relations } from "drizzle-orm";

import { createInsertSchema } from "drizzle-zod";

export const projects = pgTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  data: text("json").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  isTemplate: boolean("is_template"),
  isPro: boolean("is_pro"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  users: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const projectsInsertSchema = createInsertSchema(projects);
export const projectsUpdateSchema = projectsInsertSchema
  .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
  .partial();

export const projectSaveSchema = projectsInsertSchema.pick({
  data: true,
  width: true,
  height: true,
});
