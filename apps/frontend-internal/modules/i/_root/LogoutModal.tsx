import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@heroui/react";
import { TriangleAlert } from "lucide-react";

interface ILogoutModal {
  isOpen: boolean;
  onSubmit: (onClose: () => void) => void;
  onOpenChange: () => void;
  isSubmitting: boolean;
}

export default function LogoutModal({
  isOpen,
  onSubmit,
  onOpenChange,
  isSubmitting
}: ILogoutModal) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-warning flex items-center gap-2">
              <TriangleAlert size={20} />
              Вихід з системи
            </ModalHeader>
            <ModalBody>
              Після виходу з системи вам доведеться повторно авторизуватися.
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                isLoading={isSubmitting}
                variant="flat"
                onPress={() => onSubmit(onClose)}
              >
                Вийти
              </Button>
              <Button
                color="default"
                variant="flat"
                onPress={onClose}
              >
                Відміна
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
