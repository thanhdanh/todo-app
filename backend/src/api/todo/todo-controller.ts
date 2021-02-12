import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { IModel } from '../../interfaces';
import { ITodo } from './todo-model';

export default class TodoController {   
    constructor(
        private readonly model: IModel<ITodo>
    ) {}

    async getListTodos(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const todos = await this.model.findList();
        return h.response(todos).code(200);
    }

    async getTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const todoId = request.params.id;
        const todo = await this.model.findById(todoId)

        if (todo) {
            return h.response(todo).code(200);
        } else {
          return Boom.notFound();
        }
    }

    async addTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            const todo = await this.model.insert(<ITodo> request.payload);

            return h.response(todo).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    async updateTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const todoId = request.params.id;
        const data: ITodo = <ITodo> request.payload;

        try {
            const todo = await this.model.update(todoId, data)
      
            if (todo) {
                return h.response(todo).code(200);
            } else {
              return Boom.notFound();
            }
          } catch (error) {
            return Boom.badImplementation(error);
          }
    }

    async deleteTodo(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const todoId = request.params.id;

        const result = await this.model.update(todoId, <ITodo> { deleted: true });
        if (result) {
            return h.response({ success: true }).code(200);
        } else {
          return Boom.notFound();
        }
    }
}