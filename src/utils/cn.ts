import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Hàm gộp class Tailwind CSS hỗ trợ xử lý xung đột lớp và điều kiện động.
 * Tương tự hàm cn bên các dự án Next.js/React.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
