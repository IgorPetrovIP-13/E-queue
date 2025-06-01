"use client";

import { Card, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { Button } from "@heroui/button";

import { Info } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@heroui/react";
import { usePathname } from "next/navigation";

import { Route } from "@/common/enums/routes-enum";
import { getRouteValue } from "@/utils/getRouteValue";
import CreateDynamicQueue from "@/modules/i/create-dynamic-queue/CreateDynamicQueue";

export default function CreateQueuePage() {
  const route = usePathname();

  const { title, icon: Icon } = getRouteValue(route as Route);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="animate-slideInDown w-full">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon size={21} />
            <h1 className="text-md">{title}</h1>
          </div>
          <Button
            color="primary"
            size="sm"
            startContent={<Info size={15} />}
						variant="flat"
						onPress={onOpen}
          >
            Що таке жива черга?
          </Button>
        </CardHeader>
        <Divider />
        <CreateDynamicQueue />
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="text-blue-400 flex items-center gap-2">
                <Info size={20} />
                Що таке жива черга?
              </ModalHeader>
              <ModalBody>
                <p>
                  У живій черзі ви самі управляєте чергою, додаючи до неї користувачів. Ця можливість закривається <span className="text-primary">через годину після кінця робочого дня</span>.
									<br />
									<br />
									Сама черга автоочищується <span className="text-primary">за одну годину до початку робочого дня</span>, параметри якого ви вказуєте при створенні черги. 
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Закрити
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
