"use client";

import { addToast } from "@heroui/toast";
import { organizationRequestService } from "@repo/api/services/organization-request";
import { ICreateOrganizationRequestRes } from "@repo/api/services/organization-request/organization-request.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { File, MailPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import Link from "next/link";
import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { preSendClear } from "@repo/core/utils/preSendClear";
import { OrganizationRequestStatuses } from "@repo/core/enums/org-request-status";
import { useDisclosure } from "@heroui/react";

import { useTakeIntoProcessing } from "./hooks/useTakeIntoProcessing";
import OrganizationRequestChat from "./OrganizationRequestChat";
import { useApprove } from "./hooks/useApprove";
import RejectionModal from "./RejectionModal";
import { useReject } from "./hooks/useReject";
import ApprovalModal from "./ApprovalModal";

import { StatusValues } from "@/common/enums/status-values-enum";


export default function OrganizationRequest() {
  const { id } = useParams();

  const [data, setData] = useState<ICreateOrganizationRequestRes | null>(null);

  const {
    mutate: mutateTakeIntoProcessing,
    isPending: isPendingTakeIntoProcessing
  } = useTakeIntoProcessing();

  const { mutate: mutateApprove, isPending: isPendingApprove } = useApprove();

  const { mutate: mutateReject, isPending: isPendingReject } = useReject();

  const {
    isOpen: isApprovalModalOpen,
    onOpen: onApprovalModalOpen,
    onOpenChange: onApprovalModalOpenChange
  } = useDisclosure();

  const {
    isOpen: isRejectionModalOpen,
    onOpen: onRejectionModalOpen,
    onOpenChange: onRejectionModalOpenChange
  } = useDisclosure();

  useEffect(() => {
    async function fetchData(id: string) {
      try {
        const data = await organizationRequestService.getById(id);

        setData(data);
      } catch (error) {
        addToast({
          color: "danger",
          title: "Помилка завантаження даних",
          description: formatAxiosError(error)
        });
      }
    }

    if (id && typeof id === "string") {
      fetchData(id);
    }
  }, [id]);

  if (typeof id !== "string" || !data) {
    return null;
  }

  const StatusIcon = StatusValues[data.status].icon;
  const statusColor = StatusValues[data.status].color;

  return (
    <>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <MailPlus size={21} />
          <h1 className="text-md">Заявка {id}</h1>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon className={`text-${statusColor}`} />
          <p className={`text-${statusColor}`}>{data.status}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="p-8">
        <div className="flex gap-8">
          <div className="flex-1 w-full">
            <div className="flex flex-col gap-4">
              {data.organization_logo && (
                <Image
                  src={data.organization_logo}
                  width={100}
                />
              )}
              <h1 className="text-3xl">
                {data.organization_type_id.title} {data.organization_title}
              </h1>
              <p>{data.organization_description}</p>
              {data.organization_website && (
                <Link
                  className="text-primary underline"
                  href={data.organization_website}
                >
                  {data.organization_website}
                </Link>
              )}
              <p>
                <span className="text-default-500">Зв&apos;язок:</span>{" "}
                <span>{data.desired_connection}</span>
              </p>
              {data.user_comment && (
                <div>
                  <p className="text-default-500">Коментар до заявки</p>
                  <p>{data.user_comment}</p>
                </div>
              )}
              <div>
                <p className="text-default-500 pb-1">Додатки</p>
                <div className="flex flex-col gap-2">
                  {data.attachments.length ? (
                    data.attachments.map((attachment, index) => (
                      <Button
                        key={index}
                        as={Link}
                        className="w-full text-left justify-start"
                        href={attachment.href}
                        startContent={<File size={20} />}
                        target="_blank"
                        variant="flat"
                      >
                        {attachment.name}
                      </Button>
                    ))
                  ) : (
                    <p>Додатки відсутні</p>
                  )}
                </div>
              </div>
              {data.status === OrganizationRequestStatuses.PENDING && (
                  <div className="flex gap-4">
                    <Button
                      color="success"
                      variant="flat"
                      onPress={onApprovalModalOpen}
                    >
                      Схвалити заявку
                    </Button>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={onRejectionModalOpen}
                    >
                      Відхилити заявку
                    </Button>
                  </div>
                )}
            </div>
          </div>
          {data.status === OrganizationRequestStatuses.PENDING ? (
            <OrganizationRequestChat initialComments={data.comments} />
          ) : (
            <div className="flex flex-1 w-full flex-col gap-4">
              <p className="text-lg">
                Для доступу до чату з користувачем, візьміть заявку в обробку
              </p>
              <Button
                color="primary"
                isLoading={isPendingTakeIntoProcessing}
                onPress={async () => {
                  mutateTakeIntoProcessing({ id });
                }}
              >
                Взяти в обробку
              </Button>
            </div>
          )}
        </div>
      </CardBody>
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        isSubmitting={isPendingApprove}
        onOpenChange={onApprovalModalOpenChange}
        onSubmit={(comment, onClose) => {
          const clearComment = preSendClear({ comment: comment }).comment;

          mutateApprove({ id, comment: clearComment });

          onClose();
        }}
      />
      <RejectionModal
        isOpen={isRejectionModalOpen}
        isSubmitting={isPendingReject}
        onOpenChange={onRejectionModalOpenChange}
        onSubmit={(comment, onClose) => {
          const clearComment = preSendClear({ comment: comment }).comment;

          mutateReject({ id, comment: clearComment });

          onClose();
        }}
      />
    </>
  );
}
