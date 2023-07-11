import { Stage } from "./stage";
import { User } from "./user";

export type Project = {
     projectId?: number;
     title?: string;
     description?: string;
     admin?: User;
     startDate?: Date;
     dueDate?: Date;
     priority?: string;
     completion?: number;
     stages?: Stage[];
     members?:User[];
 };
 