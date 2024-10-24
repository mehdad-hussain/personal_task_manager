import endpoints from "@/config/endpoints.json";
import { ContentType, handleHttpRequest, HttpMethod } from "@/lib/apiCore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateTaskSchemaType } from "../model/tasks";

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

type RequestType = CreateTaskSchemaType;

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await handleHttpRequest({
        endpoint: endpoints.tasks.post,
        method: HttpMethod.POST,
        body: data,
        contentType: ContentType.JSON,
      });

      return response.data;
    },

    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: () => {
      toast.error("Failed to create task");
    },
  });

  return mutation;
};
