"use client";

import { Button, useDisclosure } from "@heroui/react";
import { Info } from "lucide-react";

import InfoModal from "./InfoModal";

export default function InfoButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        className="w-full flex justify-start md:justify-center lg:justify-start p-3 md:p-0 lg:p-3"
        color="primary"
        variant="flat"
        onPress={onOpen}
      >
        <div className="flex gap-2 items-center">
          <Info size={20} />
          <span className="inline md:hidden lg:inline">Про сервіс</span>
        </div>
      </Button>
      <InfoModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
