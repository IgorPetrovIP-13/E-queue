export const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"] as const;
export type DayOfWeek = typeof daysOfWeek[number];