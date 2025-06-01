import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from "@heroui/react";
import { CircleCheck, Send } from "lucide-react";
import { useState } from "react";

interface ILogoutModal {
  isOpen: boolean;
  onSubmit: (comment: string, onClose: () => void) => void;
  onOpenChange: () => void;
  isSubmitting: boolean;
}

export default function ApprovalModal({
  isOpen,
  onSubmit,
  onOpenChange,
  isSubmitting
}: ILogoutModal) {
  const [approval_comment, setApprovalComment] = useState<string>("");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-success flex items-center gap-2">
              <CircleCheck size={20} />
              Схвалення заявки
            </ModalHeader>
            <ModalBody>
              <p>
                Будь ласка, залиште коментар для користувача, при схваленні
                заявки, наприклад:
              </p>
              <ul>
                <li>
                  &quot; Вашу заявку схвалено, організацію додано до системи,
                  можете переглянути її на сторінці{" "}
                  <span className="text-success">Мої організації</span> &quot;
                </li>
              </ul>
              <Textarea
                label="Коментар"
                placeholder="Ваш коментар"
                value={approval_comment}
                onChange={e => setApprovalComment(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                isDisabled={!approval_comment}
                isLoading={isSubmitting}
                startContent={<Send size={18} />}
								variant="flat"
                onPress={() => onSubmit(approval_comment, onClose)}
              >
                Схвалити заявку
              </Button>
              <Button
                color="default"
                isDisabled={isSubmitting}
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
