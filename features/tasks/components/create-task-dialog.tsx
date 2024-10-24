"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useState, useTransition } from "react";
import { useMedia } from "react-use";
import { useCreateTask } from "../api/use-create-task";
import { useGetCategories } from "../api/use-get-categories";
import { CreateTaskSchema, CreateTaskSchemaType } from "../model/tasks";
import { CreateTaskForm } from "./create-task-form";

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMedia("(min-width: 640px)", false);
  const [isCreatePending, startCreateTransition] = useTransition();
  const { data: categories } = useGetCategories();

  const mutation = useCreateTask();

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
  });

  function onSubmit(values: CreateTaskSchemaType) {
    startCreateTransition(async () => {
      mutation.mutate(values, {
        onSuccess: () => {
          form.reset();
        },
      });
      setOpen(false);
    });
  }

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            New task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create task</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new task.
            </DialogDescription>
          </DialogHeader>
          <CreateTaskForm
            form={form}
            onSubmit={onSubmit}
            categories={categories}
          >
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Create
              </Button>
            </DialogFooter>
          </CreateTaskForm>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New task
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create task</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new task.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-2">
          <CreateTaskForm
            form={form}
            onSubmit={onSubmit}
            categories={categories}
          >
            <DrawerFooter className="gap-2 sm:space-x-0">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Create
              </Button>
            </DrawerFooter>
          </CreateTaskForm>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
