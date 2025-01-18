import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NotificationType } from "@/enums/notification-type.enum";
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


export const nameInitials = (firstName: string, lastName: string) => {
  const firstNameInitials = firstName ? firstName.charAt(0) : 'X';
  const lastNameInitials = lastName ? lastName.charAt(0) : '';
  return firstNameInitials + lastNameInitials;
};
