import { ITodo, SetTodosAction } from "../types";
import { SET_TODOS } from "./actionTypes";

export const setTodos = (todos: ITodo[]): SetTodosAction => ({
    type: SET_TODOS,
    payload: todos,
});

export const setVisibleFilter = (todos: ITodo[]): SetTodosAction => ({
    type: SET_TODOS,
    payload: todos,
});