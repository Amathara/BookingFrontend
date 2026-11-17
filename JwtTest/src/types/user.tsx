export type UserRole = "admin" | "moderator" |"user" ;

export type User = {
    id: number;
    username: string;
    role: UserRole;
};