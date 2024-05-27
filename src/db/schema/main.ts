import { bigint, timestamp, varchar } from "drizzle-orm/mysql-core";
import { capexTable } from "./_table";
import { sql } from "drizzle-orm";

const now = sql`CURRENT_TIMESTAMP()`;

const defaultColumns = {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at").notNull().default(now),
  updatedAt: timestamp("updated_at").onUpdateNow(),
};
// Role Schema with user_id and name fields
export const role = capexTable("role", {
  user_id: bigint('user_id', { mode: 'number' }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
});

// Added role_id for referencing role(user_id)
export const user = capexTable("user", {
  ...defaultColumns,
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role_id: bigint('role_id', { mode: 'number' }).references(() => role.user_id),
});

export const post = capexTable("post", {
  ...defaultColumns,
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 255 }).notNull(),
  createdBy: bigint("created_by", { mode: "number" }).notNull(),
});
