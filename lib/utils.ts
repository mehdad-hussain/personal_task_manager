import { Priority, Status } from "@/features/tasks/model/tasks";
import {
  CheckCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { clsx, type ClassValue } from "clsx";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusIcon(status: Status) {
  const statusIcons = {
    [Status.PENDING]: QuestionMarkCircledIcon,
    [Status.IN_PROGRESS]: StopwatchIcon,
    [Status.COMPLETED]: CheckCircledIcon,
  };

  return statusIcons[status] || CircleIcon;
}

export function getPriorityIcon(priority: Priority) {
  const priorityIcons = {
    [Priority.LOW]: ArrowDownIcon,
    [Priority.MEDIUM]: ArrowRightIcon,
    [Priority.HIGH]: ArrowUpIcon,
  };

  return priorityIcons[priority] || CircleIcon;
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date));
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
