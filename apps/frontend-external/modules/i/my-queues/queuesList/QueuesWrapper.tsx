"use client";

import { Tab, Tabs } from "@heroui/react";

import ExecutorList from "./ExecutorList";
import AppointmentsList from "./AppointmentsList";

export default function QueuesWrapper() {
  const tabs = [
    {
      id: "0",
      label: "Я виконавець",
      content: <ExecutorList />
    },
    {
      id: "1",
      label: "Я клієнт",
      content: <AppointmentsList />
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        size="lg"
      >
        {item => (
          <Tab
            key={item.id}
            title={item.label}
          >
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
