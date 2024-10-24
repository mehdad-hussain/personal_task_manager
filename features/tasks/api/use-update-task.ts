import endpoints from "@/config/endpoints.json";
import { handleHttpRequest, HttpMethod } from "@/lib/apiCore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateTaskSchemaType } from "../model/tasks";

type ResponseType = {
  // Define the shape of the response data
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  categoryId: string;
};

type RequestType = UpdateTaskSchemaType;

export const useUpdateTask = (
  id: number,
  showResponseToast: boolean = true,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await handleHttpRequest({
        endpoint: `${endpoints.tasks.update}/${id}`,
        method: HttpMethod.PATCH,
        body: data,
      });

      return response.data;
    },

    onSuccess: () => {
      if (showResponseToast) {
        toast.success("Task updated successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["tasks", { id }] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: () => {
      if (showResponseToast) {
        toast.error("Failed to update task");
      }
    },
  });

  return mutation;
};
