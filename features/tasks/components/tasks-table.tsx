"use client";
"use memo";

import { type DataTableFilterField } from "@/types";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";

import { getPriorityIcon, getStatusIcon } from "@/lib/utils";
import { useGetTasks } from "../api/use-get-tasks";
import {
  Category,
  GetTasksResponseType,
  GetTasksSchemaType,
  Priority,
  Status,
  TaskType,
} from "../model/tasks";
import { getColumns } from "./tasks-table-columns";
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions";

interface TasksTableProps {
  search: GetTasksSchemaType;
  initialData: GetTasksResponseType;
  categories: Category[];
}

export function TasksTable({
  search,
  initialData,
  categories,
}: TasksTableProps) {
  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<TaskType>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Search titles...",
    },
    {
      label: "Status",
      value: "status",
      options: Object.values(Status).map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: getStatusIcon(status),
        withCount: true,
      })),
    },
    {
      label: "Priority",
      value: "priority",
      options: Object.values(Priority).map((priority) => ({
        label: priority[0]?.toUpperCase() + priority.slice(1),
        value: priority,
        icon: getPriorityIcon(priority),
        withCount: true,
      })),
    },
    {
      label: "Category",
      value: "categoryId",
      options: categories.map((category) => ({
        label: category.name,
        value: category.id.toString(),
        withCount: true,
      })),
    },
  ];

  const { data, isPending } = useGetTasks(search, initialData);
  const { table } = useDataTable({
    data: data?.data,
    columns,
    pageCount: data?.meta?.pageCount,
    /* optional props */
    filterFields,
    initialState: {
      sorting: [{ id: "dueDate", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    /* */
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions />
      </DataTableToolbar>
    </DataTable>
  );
}
