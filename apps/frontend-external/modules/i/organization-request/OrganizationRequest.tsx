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

import OrganizationRequestChat from "./OrganizationRequestChat";

import { StatusValues } from "@/common/enums/status-values-enum";

export default function OrganizationRequest() {
  const { id } = useParams();

  const [data, setData] = useState<ICreateOrganizationRequestRes | null>(null);

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

  if (!id || !data) {
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
            </div>
          </div>
          {data.admin_id && (
            <OrganizationRequestChat
              approvalComment={data.approval_comment!}
              initialComments={data.comments}
              rejectionComment={data.rejection_comment!}
            />
          )}
        </div>
      </CardBody>
    </>
  );
}
