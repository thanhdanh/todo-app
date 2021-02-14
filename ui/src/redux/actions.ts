import { FilterStatusTodo, ITodo, SetTodosAction, SetVisibleFilterTodo } from "../types";
import { SET_TODOS, SET_VISIBLE_FILTER_TODO } from "./actionTypes";

export const setTodos = (todos: ITodo[]): SetTodosAction => ({
    type: SET_TODOS,
    payload: todos,
});

export const setVisibleFilter = (type: FilterStatusTodo): SetVisibleFilterTodo => ({
    type: SET_VISIBLE_FILTER_TODO,
    payload: type,
});