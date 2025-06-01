"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import { LogOut } from "lucide-react";

import LogoutModal from "./LogoutModal";
import { useLogoutMutation } from "./hooks/useLogoutMutation";

export default function LogoutButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate, isPending } = useLogoutMutation();

  const handleLogout = (onClose: () => void) => {
    mutate();
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        className="w-full flex justify-start md:justify-center lg:justify-start p-3 md:p-0 lg:p-3"
        color="danger"
        variant="flat"
        onPress={onOpen}
      >
        <div className="flex gap-2 items-center">
          <LogOut size={20} />
          <span className="inline md:hidden lg:inline">Вихід</span>
        </div>
      </Button>
      <LogoutModal
        isOpen={isOpen}
        isSubmitting={isPending}
        onOpenChange={onOpenChange}
        onSubmit={onClose => handleLogout(onClose)}
      />
    </>
  );
}
