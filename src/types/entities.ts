import type { Role } from "./roles";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	roles: Role[]
	createdAt: Date;
	updatedAt: Date;
}

export interface Item {
	id: string;
	title: string;
	type: "game" | "book" | "serie" | "movie" | "course" | "locations";
	description?: string;
	imgUrl?: string;
	createdAt?: Date;
	updatedAt: Date;
}

export interface UserItemWithDetails {
	id: string;
	userId: string;
	itemId: string;
	order?: number;
	status?: "completed" | "in_progress" | "pending";
	rating?: number;
	addedAt: Date;
	item: Item;
}

export interface Session {
	sub: string;
	user: User;
	iat: number;
	exp: number;
	accessToken: string;
}

export interface BacklogStats {
	total: number;
	completed: number;
	in_progress: number;
	pending: number;
}

export interface Genre {
	id: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}
