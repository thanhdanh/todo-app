import Hapi from '@hapi/hapi';
import Joi from 'joi';

import TodoController from './todo-controller';
import TodoModel, { TodoPriority } from './todo-model';

export function init(server: Hapi.Server) {
    const todoModel = new TodoModel(server.app.db);
    const todoController = new TodoController(todoModel);

    const todoResponse = {
        _id: Joi.string().example('602671e6c6e16d567f763f42'),
        title: Joi.string().example('Do exercise'),
        description: Joi.string().example('Do exercise with my friends'),
        completed: Joi.boolean().example(true),
        deleted: Joi.boolean().example(false),
        dueDate: Joi.string().example("2021-02-12"),
        createdAt: Joi.date().example("2021-02-12T12:17:42.496Z"),
        updatedAt: Joi.date().example("2021-02-12T12:17:42.496Z")
    }

    server.route([
        {
            method: "GET",
            path: "/todos",
            options: {
                description: 'Get list todos',
                tags: ["api", "todos"],
                handler: todoController.getListTodos.bind(todoController),
            },
        },
        {
            method: "GET",
            path: "/todos/{id}",
            options: {
                description: 'Get todos detail by id',
                tags: ["api", "todos"],
                handler: todoController.getTodo.bind(todoController),
                validate: {
                    params: Joi.object({
                        id: Joi.string().required(),
                    }),
                },
                response: {
                    status: {
                        ['200']: Joi.object(todoResponse).description('Delete successful'),
        
                        [`404`]: Joi.object({
                            error: Joi.string().example('Not found'),
                            statusCode: Joi.number().example(404),
                            message: Joi.string().example('Not found'),
                        }).description('No documents matched the query. Deleted 0 documents.'),
                    }
                }
            }
        },
        {
            method: "POST",
            path: "/todos",
            options: {
                description: 'Add new todo',
                cors: true,
                tags: ["api", "todos"],
                handler: todoController.addTodo.bind(todoController),
                validate: {
                    payload: Joi.object().keys({
                        title: Joi.string().required(),
                    })
                },
                response: {
                    status: {
                        ['200']: Joi.object({
                            ...todoResponse,
                            completed: Joi.boolean().example(false),
                            deleted: Joi.boolean().example(false),
                        }).description('Delete successful')
                    }
                }
            }
        },
        {
            method: "PUT",
            path: "/todos/{id}",
            options: {
                description: 'Update a todo by id',
                tags: ["api", "todos"],
                handler: todoController.updateTodo.bind(todoController),
                validate: {
                    params: Joi.object({
                        id: Joi.string().required(),
                    }),
                    payload: Joi.object().keys({
                        title: Joi.string().optional(),
                        description: Joi.string().optional(),
                        completed: Joi.boolean().optional(),
                        dueDate: Joi.string().optional(),
                        priority: Joi.string().optional().valid(
                            TodoPriority.Low,
                            TodoPriority.Normal,
                            TodoPriority.High,
                        )
                    })
                },
                response: {
                    status: {
                        ['200']: Joi.object(todoResponse).description('Delete successful'),
        
                        [`404`]: Joi.object({
                            error: Joi.string().example('Not found'),
                            statusCode: Joi.number().example(404),
                            message: Joi.string().example('Not found'),
                        }).description('No documents matched the query. Deleted 0 documents.'),
                    }
                }
            }
        },
        {
            method: "DELETE",
            path: "/todos/{id}",
            options: {
                description: 'Delete a todo by id',
                tags: ["api", "todos"],
                handler: todoController.deleteTodo.bind(todoController),
                validate: {
                    params: Joi.object({
                        id: Joi.string().required(),
                    }),
                },
                response: {
                    status: {
                        ['200']: Joi.object({
                            ...todoResponse,
                            deleted: Joi.boolean().example(true),
                        }).description('Delete successful'),
        
                        [`404`]: Joi.object({
                            error: Joi.string().example('Not found'),
                            statusCode: Joi.number().example(404),
                            message: Joi.string().example('Not found'),
                        }).description('No documents matched the query. Deleted 0 documents.'),
                    }
                }
            }
        },
    ])
}