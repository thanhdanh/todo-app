import { TodoPriority } from "../interfaces/todo.interface";

export class UpdateTodoDto {
    title?: string;
    description?: string;
    priority?: TodoPriority;
    completed?: boolean;
    dueDate?: string;
}