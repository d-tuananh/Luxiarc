/**
 * Định dạng ngày tháng sang tiếng Việt
 * Ví dụ: 2026-06-01 -> "01/06/2026" hoặc "Ngày 01 tháng 06 năm 2026"
 */
export function formatDate(
  date: Date | string | number,
  type: "short" | "long" = "short"
): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ""

  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()

  if (type === "long") {
    return `Ngày ${day} tháng ${month} năm ${year}`
  }

  return `${day}/${month}/${year}`
}
