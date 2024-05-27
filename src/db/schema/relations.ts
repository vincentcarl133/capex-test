import { relations } from "drizzle-orm";
import { post, user, role} from "./main";

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
}));

export const postRelations = relations(post, ({ one }) => ({
  createdBy: one(user, {
    fields: [post.createdBy],
    references: [user.id],
  }),
}));

// One-to-Many relation of role to user table
export const roleRelation = relations(role, ({ many }) => ({
  users: many(user),
}));

// One-to-one relation of user to role table
export const user_roleRelation = relations(user, ({ one }) => ({
  roles: one(role, {
    fields: [user.id],
    references: [role.user_id],
  }),
}));