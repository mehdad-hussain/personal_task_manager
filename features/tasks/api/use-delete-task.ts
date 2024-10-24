import endpoints from "@/config/endpoints.json";
import { handleHttpRequest, HttpMethod } from "@/lib/apiCore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = {
  id: number;
};

type RequestType = number;

export const useDeleteTask = (showResponseToast: boolean = true) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (id) => {
      const response = await handleHttpRequest({
        endpoint: `${endpoints.tasks.delete}/${id}`,
        method: HttpMethod.DELETE,
      });

      return response.data;
    },

    onSuccess: () => {
      if (showResponseToast) {
        toast.success("Task deleted successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: () => {
      if (showResponseToast) {
        toast.error("Failed to delete task");
      }
    },
  });

  return mutation;
};
