import { Dispatch, SetStateAction } from "react";

export interface ITenderFilterModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ITenderFilterModalForm {
  eventStatus: number
  buyerOrganizationIds: number[]
  eventNumber: ""
  fromPublishDate: string
  toPublishDate: string
  categoryCodeIds: number[]
  eventName: string
  awardedParticipantName: string
  awardedParticipantVoen: string
}