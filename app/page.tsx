import endpoints from "@/config/endpoints.json";
import { getTasksSchema } from "@/features/tasks/model/tasks";
import { handleHttpRequest } from "@/lib/apiCore";
import TaskUi from "@/view/tasks/TaskUi";

type Props = {
  searchParams: Record<string, string>;
};

export const revalidate = 0;

export default async function TaskPage({ searchParams }: Props) {
  const search = getTasksSchema.parse(searchParams);

  const tasks = await handleHttpRequest({
    endpoint: endpoints.tasks.get,
    query: search,
  });
  const categories = await handleHttpRequest({
    endpoint: endpoints.categories.get,
  });

  return (
    <>
      <main className=" container mx-auto">
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
          </div>
          <TaskUi initialData={tasks} search={search} categories={categories} />
        </div>
      </main>
    </>
  );
}
