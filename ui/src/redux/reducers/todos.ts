import { FilterStatusTodo, ITodo, TodosActionTypes } from "../../types";
import { SET_TODOS, SET_VISIBLE_FILTER_TODO } from "../actionTypes";

interface IStateOfTodos {
    list: ITodo[],
    visibilityFilter: FilterStatusTodo
} 

const initialState: IStateOfTodos = {
    list: [],
    visibilityFilter: FilterStatusTodo.ALL,
};

export default function (state = initialState, action: TodosActionTypes) {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                list: action.payload,
            };
        case SET_VISIBLE_FILTER_TODO:
            return {
                ...state,
                visibilityFilter: action.payload,
            };
        default:
            return state;
    }
}