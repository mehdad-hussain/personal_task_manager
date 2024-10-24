import endpoints from "@/config/endpoints.json";
import { handleHttpRequest } from "@/lib/apiCore";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await handleHttpRequest({
        endpoint: endpoints.categories.get,
      });

      return response;
    },
  });

  return query;
};
