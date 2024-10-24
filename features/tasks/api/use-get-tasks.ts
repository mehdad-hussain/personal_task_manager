import endpoints from "@/config/endpoints.json";
import { handleHttpRequest } from "@/lib/apiCore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetTasksResponseType, GetTasksSchemaType } from "../model/tasks";
export const useGetTasks = (
  params: Partial<GetTasksSchemaType>,
  initialData: GetTasksResponseType,
) => {
  const query = useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const response = await handleHttpRequest({
        endpoint: endpoints.tasks.get,
        query: params,
      });

      return response;
    },
    initialData,
    placeholderData: keepPreviousData,
  });

  return query;
};
