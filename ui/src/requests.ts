import { CreateTodoDto } from "./dto/create-todo.dto";

const apiDomain = 'http://localhost:13009';

export async function postData(url = '', data = {}, headers = {}) {
    // Default options are marked with *
    return Promise.race([
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                ...headers,
            },
            body: JSON.stringify(data),
            referrerPolicy: 'no-referrer', 
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timout')), 10000)
        )
    ])
}

export async function fetchListTodos() {
    const url = apiDomain + '/todos';
    return fetch(url, { cache: 'no-cache',  mode: 'cors', }).then(response => response.json())
}

export async function addNewTodo(data: CreateTodoDto) {
    const url = apiDomain + '/todos';
    console.log(url)
    return postData(url, data).then((response: any) => response.json());
}