import { TodoPriority } from "../types";

export class UpdateTodoDto {
    title?: string;
    description?: string;
    priority?: TodoPriority;
    completed?: boolean;
    dueDate?: string;
}