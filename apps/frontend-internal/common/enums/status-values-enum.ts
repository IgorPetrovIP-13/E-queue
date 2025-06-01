import {
  OrganizationRequestStatus,
  OrganizationRequestStatuses
} from "@repo/core/enums/org-request-status";
import {
  ShieldBan,
  ShieldCheck,
  ShieldEllipsis,
  ShieldPlus
} from "lucide-react";

interface StatusValue {
  icon: React.ElementType;
  color: string;
}

export const StatusValues: Record<OrganizationRequestStatus, StatusValue> = {
  [OrganizationRequestStatuses.NOT_CHECKED]: {
    icon: ShieldPlus,
    color: "primary-500"
  },
  [OrganizationRequestStatuses.APPROVED]: {
    icon: ShieldCheck,
    color: "success"
  },
  [OrganizationRequestStatuses.REJECTED]: {
    icon: ShieldBan,
    color: "danger"
  },
  [OrganizationRequestStatuses.PENDING]: {
    icon: ShieldEllipsis,
    color: "warning"
  }
};
