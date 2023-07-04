import { Stage } from "./stage";
import { Task } from "./task";
import { User } from "./user";

export type Project = {
     projectId?: number;
     title?: string;
     description?: string;
     admin?: User;
     //tasks?: Task[];
     startDate?: Date;
     dueDate?: Date;
     priority?: string;
     completion?: number;
     stages?: Stage[];
     members?:User[];
     // comments?: Comment[];
 };
 