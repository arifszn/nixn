import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NotificationType } from "@/enums/notificationType.enum";
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const showNotification = (
  message = 'Something went wrong',
  type: NotificationType = NotificationType.ERROR,
  description?: string
) => {
  toast[type](message, {
    description: description,
  });
};