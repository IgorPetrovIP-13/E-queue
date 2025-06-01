"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/react";

type Service = {
  work_start_time: string;
  work_end_time: string;
  work_break_start_time: string;
  work_break_end_time: string;
  work_time_estimation: number;
  break_time_estimation: number;
};

interface BusySlot {
  date: string;
  start_time: string;
  end_time: string;
}

interface SlotsTableProps {
  service: Service;
  onSelect: (slot: string) => void;
  date: string;
  busySlots: BusySlot[];
}

export default function SlotsTable({ service, onSelect, date, busySlots }: SlotsTableProps) {
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const slots = useMemo(() => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    const formatTime = (mins: number) => {
      const date = new Date();

      date.setHours(0, mins);

      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };
    const labels: string[] = [];

    const overlaps = (start1: number, end1: number, start2: number, end2: number) => {
      return Math.max(start1, start2) < Math.min(end1, end2);
    };

    const isBusy = (start: number, end: number) => {
      return busySlots.some(slot =>
        slot.date === date &&
        overlaps(start, end, toMinutes(slot.start_time), toMinutes(slot.end_time))
      );
    };

    const gen = (from: number, to: number) => {
      let cur = from;
      while (cur + service.work_time_estimation <= to) {
        const end = cur + service.work_time_estimation;
        const label = `${formatTime(cur)} - ${formatTime(end)}`;

        labels.push(JSON.stringify({
          label,
          start: cur,
          end,
          disabled: isBusy(cur, end),
        }));

        cur += service.work_time_estimation + service.break_time_estimation;
      }
    };

    const start = toMinutes(service.work_start_time);
    const bs = toMinutes(service.work_break_start_time);
    const be = toMinutes(service.work_break_end_time);
    const end = toMinutes(service.work_end_time);

    gen(start, bs);
    gen(be, end);

    return labels.map(str => JSON.parse(str));
  }, [service, busySlots, date]);

  return (
    <div className="grid grid-cols-5 gap-4">
      {slots.map(({ label, disabled }: any) => (
        <Button
          key={label}
          className="text-md flex justify-center items-center h-full"
          color={activeSlot === label ? "primary" : "default"}
          isDisabled={disabled}
          size="sm"
          variant={activeSlot === label ? "shadow" : "faded"}
          onPress={() => {
            onSelect(label);
            setActiveSlot(label);
          }}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}