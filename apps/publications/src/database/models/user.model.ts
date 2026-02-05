/**
 * User Model
 * Transformers and logic for User entities
 */

import type { User } from "@/types";
import type { UserRow } from "../schemas/users.schema";

/**
 * Transform a database row to a User entity
 */
export function transformUserRow(row: UserRow): User {
    return {
        id: row.id,
        clerkId: row.clerk_id,
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
