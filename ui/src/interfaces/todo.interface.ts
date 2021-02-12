export enum TodoPriority {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
}

export interface ITodo {
    _id: number;
    title: string;
    description?: string;
    priority: TodoPriority;
    completed: boolean;
    deleted: boolean;
    dueDate: string;
    createdAt: Date;
    updateAt: Date;
}