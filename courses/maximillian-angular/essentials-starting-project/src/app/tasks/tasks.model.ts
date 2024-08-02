export type TTask = {
  id: string
  userId: string
  title: string
  summary: string
  dueDate: string
}

export type TNewTask = Omit<TTask, "id" | "userId">
