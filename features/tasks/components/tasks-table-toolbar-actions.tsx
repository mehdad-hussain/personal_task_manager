"use client";

import { CreateTaskDialog } from "./create-task-dialog";

export function TasksTableToolbarActions() {
  return (
    <div className="flex items-center gap-2">
      <CreateTaskDialog />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
