import moment from 'moment';
import { VISIBILITY_FILTERS } from "../constants";
import { FilterStatusTodo } from '../types';
import { RootState } from "./reducers";

export const getTodoList = (state: RootState) => state.todos.list || [];
export const getFilterTodo = (state: RootState) => state.todos.visibilityFilter || FilterStatusTodo.ALL

export const getTodosByVisibilityFilter = (state: RootState) => {
    const allTodos = getTodoList(state);
    const visibilityFilter = getFilterTodo(state);

    switch (visibilityFilter) {
        case VISIBILITY_FILTERS.COMPLETED:
            return allTodos.filter(todo => todo.completed);
        case VISIBILITY_FILTERS.OVERDUE:
            return allTodos.filter(todo => !todo.completed && todo.dueDate && moment().isAfter(todo.dueDate, 'day'));
        case VISIBILITY_FILTERS.ALL:
        default:
            return allTodos.filter(todo => !todo.completed);
    }
};