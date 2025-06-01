import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea
} from "@heroui/react";
import { Send, Ban } from "lucide-react";
import { useState } from "react";

interface ILogoutModal {
	isOpen: boolean;
	onSubmit: (comment: string, onClose: () => void) => void;
	onOpenChange: () => void;
	isSubmitting: boolean;
}

export default function RejectionModal({
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
						<ModalHeader className="text-danger flex items-center gap-2">
							<Ban size={20}/>
							Відхилення заявки
						</ModalHeader>
						<ModalBody>
							<p>
								Будь ласка, залиште коментар для користувача з причиною відмови, наприклад:
							</p>
							<ul>
								<li>
									&quot; Вашу заявку відхилено, нажаль організація не відповідає вимогам платформи &quot;
								</li>
								<li>
									&quot; Вашу заявку відхилено, організація вже існує в системі &quot;
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
								color="danger"
								isDisabled={!approval_comment}
								isLoading={isSubmitting}
								startContent={<Send size={18} />}
								variant="flat"
								onPress={() => onSubmit(approval_comment, onClose)}
							>
								Відхилити заявку
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