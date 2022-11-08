/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  name: string
  dueDate: string
}

export interface CreateTodoPayload {
  name: string
  dueDate: string
  userId: string,
  todoId: string,
  done: boolean,
  createdAt: string,
  attachmentUrl: string
}