import { SET_VISIBLE_FILTER_TODO, SET_TODOS } from "./redux/actionTypes";

export enum TodoPriority {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
}

export enum FilterStatusTodo {
    ALL = 'all',
    COMPLETED = 'completed',
    OVERDUE = 'overdue',
}

export interface ITodo {
    _id: string;
    title: string;
    description?: string;
    priority: TodoPriority;
    completed: boolean;
    deleted: boolean;
    dueDate: string;
    createdAt: Date;
    updateAt: Date;
}

export interface SetTodosAction {
    type: typeof SET_TODOS
    payload: ITodo[],
}

export interface SetVisibleFilterTodo {
    type: typeof SET_VISIBLE_FILTER_TODO
    payload: FilterStatusTodo,
}

export type TodosActionTypes = SetTodosAction | SetVisibleFilterTodo;