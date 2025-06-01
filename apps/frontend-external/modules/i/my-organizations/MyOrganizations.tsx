"use client";

import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { IGetOrganizationRes } from "@repo/api/services/organization/organization.types";
import { organizationService } from "@repo/api/services/organization/organization.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Share2 } from "lucide-react";
import { Tooltip, useDisclosure } from "@heroui/react";
import { useProfile } from "@repo/core/hooks/useProfile";
import {
  OrganizationRole,
  OrganizationRoles
} from "@repo/core/enums/org-roles";

import InviteModal from "./InviteModal";

export default function OrganizationRequests() {
  const [organizations, setOrganizations] = useState<IGetOrganizationRes[]>([]);
  const [currentInvitationId, setCurrentInvitationId] = useState<string | null>(
    null
  );
  const [currentInvitationOrgName, setCurrentInvitationOrgName] = useState<
    string | null
  >(null);

  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const profile = useProfile();

  useEffect(() => {
    async function fetchData() {
      try {
        const organizationRequests =
          await organizationService.getMyOrganizations();

        setOrganizations(organizationRequests);
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

  const handleInviteButtonClick = (
    organizationId: string,
    organization_type: string,
    organization_title: string,
    user_role: string
  ) => {
    const orgName = `${organization_type} ${organization_title}`;

    setCurrentInvitationOrgName(orgName);
    setCurrentInvitationId(organizationId);
    setCurrentUserRole(user_role);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {organizations.map(organization => {
          const user_role = organization.members.find(
            member => member.user_id._id === profile?.data?._id
          )?.organization_role;

          return (
            <Card key={organization._id}>
              <CardHeader className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  {organization.organization_logo ? (
                    <Image
                      src={organization.organization_logo}
                      width={24}
                    />
                  ) : (
                    <Building2 size={24} />
                  )}
                  <h3 className="text-lg">
                    {organization.organization_type_id.title}{" "}
                    {organization.organization_title}
                    {", "}
                    <span className="text-primary">ваша роль: {user_role}</span>
                  </h3>
                </div>
                {user_role !== OrganizationRoles.MEMBER && (
                  <Tooltip content="Запросити в організацію">
                    <Button
                      isIconOnly
                      color="primary"
                      variant="ghost"
                      onPress={() =>
                        handleInviteButtonClick(
                          organization._id,
                          organization.organization_type_id.title,
                          organization.organization_title,
                          user_role!
                        )
                      }
                    >
                      <Share2 size={16} />
                    </Button>
                  </Tooltip>
                )}
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-col gap-2">
                <p>{organization.organization_description}</p>
                <p>
                  Кількість співробітників (включаючи вас) :{" "}
                  <span>{organization.members.length}</span>
                </p>
                <p>
                  Активних послуг зі статичною чергою:{" "}
                  <span>{organization.static_queues.length}</span>
                </p>
                <p>
                  Активних послуг з живою чергою:{" "}
                  <span>{organization.dynamic_queues.length}</span>
                </p>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-end">
                <Button
                  as={Link}
                  href=""
                >
                  Перейти до управління організацією
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <InviteModal
        currentInvitationId={currentInvitationId!}
        currentInvitationOrgName={currentInvitationOrgName!}
        isOpen={isOpen}
        isSubmitting={false}
        userRole={currentUserRole as OrganizationRole}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
