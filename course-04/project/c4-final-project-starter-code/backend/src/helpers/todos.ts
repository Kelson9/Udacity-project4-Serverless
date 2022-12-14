import { TodosAccess } from './todosAcess'
//import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest, CreateTodoPayload } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'
import {parseUserId} from '../auth/utils'
import { getImageUrl } from './attachmentUtils';
import { TodoUpdate } from '../models/TodoUpdate'


// TODO: Implement businessLogic
const todosAccess = new TodosAccess();
const logger = createLogger('todos-logic')

export async function createTodo(request: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
    const { dueDate, name } = request;
    const todoId =  uuid.v4();
    const userId = parseUserId(jwtToken);
    const url = getImageUrl(todoId);
    const todoPayload: CreateTodoPayload  = {
        userId,
        todoId,
        name,
        dueDate,
        done: false,
        createdAt: new Date().toISOString(),
        attachmentUrl: url
    }
    logger.info('Creating a new todo')
  return await todosAccess.createTodo(todoPayload);
}
export async function getTodosForUser(userId:string): Promise<TodoItem[]> {
    logger.info(`Fetching Todos for user with ID: ${userId}`)
    return await todosAccess.getUserTodos(userId);
}

export async function updateTodo(todoUpdateReq: UpdateTodoRequest, todoId:string, userId: string): Promise<TodoUpdate> {
    logger.info('Updating a todo')
return await todosAccess.updateTodo(todoUpdateReq, todoId, userId);
}

export async function deleteTodo(todoId:string, userId:string) {
    logger.info('Deleting a todo')
    return await todosAccess.deleteTodo(todoId, userId);
}