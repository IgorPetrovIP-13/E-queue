export enum OrganizationRequestStatuses {
  NOT_CHECKED = "Не розглянуто",
  PENDING = "На розгляді",
  APPROVED = "Схвалено",
  REJECTED = "Відхилено"
}

export type OrganizationRequestStatus =
  (typeof OrganizationRequestStatuses)[keyof typeof OrganizationRequestStatuses];
