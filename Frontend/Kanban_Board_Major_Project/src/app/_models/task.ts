import { User } from "./user";

export type Task = {
    // id?: number;
    title?: string;
    description?: string;
    assignee?: User;
    startDate?: Date;
    dueDate?: Date;
    priority?: string;
    status?: string;
    comments?: Comment[];
};
