"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { addToast } from "@heroui/toast";
import { organizationInviteService } from "@repo/api/services/organization_invite/organization-invite.service";
import { IGetOrganizationInvitesRes } from "@repo/api/services/organization_invite/organization-invite.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { MailPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrganizationInvites() {
  const [organizationInvites, setOrganizationInvites] = useState<
    IGetOrganizationInvitesRes[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const organizationRequests =
          await organizationInviteService.findMyInvites();

        setOrganizationInvites(organizationRequests);
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
    <>
      <div className="flex flex-col gap-4">
        {organizationInvites.map(organizationInvite => {
          return (
            <Card key={organizationInvite._id}>
              <CardHeader className="flex items-center gap-2">
                <MailPlus size={21} />
                <h3>
                  Запрошення стати співробітником (
                  {organizationInvite.ivitation_role}) компанії{" "}
                  <span className="text-primary">
                    {organizationInvite.organization_id.organization_title}
                  </span>
                </h3>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-col gap-2">
                <div>
                  <p className="text text-default-500">Хто запрошує</p>
                  <p>
                    {organizationInvite.user_id.name +
                      " " +
                      organizationInvite.user_id.surname}
                  </p>
                </div>
                <div>
                  <p className="text text-default-500">
                    Коментар до запрошення
                  </p>
                  <p>{organizationInvite.invitation_comment}</p>
                </div>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-end">
                <Button
                  color="primary"
                  onPress={() => {}}
                >
                  Прийняти запрошення
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
