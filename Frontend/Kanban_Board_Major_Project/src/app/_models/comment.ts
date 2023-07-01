import { User } from "./user";

export type Comment = {
    id?: number;
    comment?: string;
    commenter?: User;
};
