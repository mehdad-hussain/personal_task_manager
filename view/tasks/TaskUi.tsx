"use client";
"use memo";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { TasksTable } from "@/features/tasks/components/tasks-table";
import {
  Category,
  GetTasksResponseType,
  GetTasksSchemaType,
} from "@/features/tasks/model/tasks";
import { Suspense } from "react";

type Props = {
  search: GetTasksSchemaType;
  initialData: GetTasksResponseType;
  categories: Category[];
};

const TaskUi = ({ search, initialData, categories }: Props) => {
  return (
    <>
      <Suspense fallback={<Skeleton className="h-7 w-52" />}></Suspense>
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <TasksTable
          initialData={initialData}
          search={search}
          categories={categories}
        />
      </Suspense>
    </>
  );
};

export default TaskUi;
