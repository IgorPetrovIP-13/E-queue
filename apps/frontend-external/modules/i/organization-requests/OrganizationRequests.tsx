"use client";

import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { addToast } from "@heroui/toast";
import { organizationRequestService } from "@repo/api/services/organization-request";
import { IGetAvailableOrganizationRequestRes } from "@repo/api/services/organization-request/organization-request.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, File } from "lucide-react";
import { getDateOnly } from "@repo/core/utils/getDateOnly";

import { ROUTES } from "@/common/enums/routes-enum";
import { StatusValues } from "@/common/enums/status-values-enum";

export default function OrganizationRequests() {
  const [organizationRequests, setOrganizationRequests] = useState<
    IGetAvailableOrganizationRequestRes[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const organizationRequests =
          await organizationRequestService.getMyRequests();

        setOrganizationRequests(organizationRequests);
      } catch (error) {
        addToast({
          color: "danger",
          title: "Помилка завантаження даних",
          description: formatAxiosError(error)
        });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {organizationRequests.map((request, index) => {
        const StatusIcon = StatusValues[request.status].icon;
        const statusColor = StatusValues[request.status].color;

        return (
          <Card key={index}>
            <CardHeader>
              <h4 className="w-full flex justify-between items-center">
                <span className="text-lg">
                  Заявка від {getDateOnly(request.createdAt)}
                </span>
              </h4>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-default-500">Статус</p>
                <p className={`flex gap-1 items-center text-${statusColor}`}>
                  <StatusIcon size={23} />
                  {request.status}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-default-500">Організація</p>
                <div className="flex gap-2 items-center">
                  {request.organization_logo ? (
                    <Image
                      alt="logo"
                      src={request.organization_logo}
                      width={25}
                    />
                  ) : (
                    <Building2
                      className="text-primary-800"
                      size={25}
                    />
                  )}
                  <p className="text-lg font-[700] text-primary-800 leading-none">
                    {request.organization_type_id.title}{" "}
                    {request.organization_title}
                  </p>
                  {request.organization_website && (
                    <Link
                      className="text-md text-primary-800 leading-none"
                      href={request.organization_website}
                      target="_blank"
                    >
                      -{" "}
                      <span className="underline underline-offset-4">
                        Веб-сайт організації
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-default-500">Зв&apos;язок</p>
                <p>{request.desired_connection}</p>
              </div>
              <div>
                <p className="text-sm text-default-500 pb-1">Додатки</p>
                <div className="flex flex-col gap-2">
                  {request.attachments.length ? (
                    request.attachments.map((attachment, index) => (
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
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end items-center gap-4">
              <Button
                as={Link}
                color="default"
                href={`${ROUTES.ORGANIZATION_REQUEST}/${request._id}`}
              >
                Детальніше
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
