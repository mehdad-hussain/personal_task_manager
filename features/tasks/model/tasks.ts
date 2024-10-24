import { z } from "zod";

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum Status {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export interface Category {
  id: number;
  name: string;
}

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  categoryId: z.string().optional(),
});

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    pageCount: number;
    total: number;
  };
};

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  categoryId: number;
  Category: Category;
}

export type TaskType = Pick<Task, keyof Task>;

export const getTasksSchema = searchParamsSchema;

export type GetTasksSchemaType = z.infer<typeof getTasksSchema>;
export type GetTasksResponseType = PaginatedResponse<Task>;

export const CreateTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  dueDate: z.date({ required_error: "Due date is required" }),
  priority: z.nativeEnum(Priority, { required_error: "Priority is required" }),
  status: z.nativeEnum(Status, { required_error: "Status is required" }),
  categoryId: z.number({ required_error: "Category ID is required" }),
});

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.nativeEnum(Priority).optional(),
  status: z.nativeEnum(Status).optional(),
  categoryId: z.number().optional(),
});

export type UpdateTaskSchemaType = z.infer<typeof updateTaskSchema>;

export type GetCategoriesResponseType = {
  data: Category[];
};
