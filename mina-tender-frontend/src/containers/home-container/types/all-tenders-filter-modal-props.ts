import { Dispatch, SetStateAction } from "react";
import { ITender } from "./tender-type.ts";

export interface ITenderFilterModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTendersData: Dispatch<SetStateAction<ITender[]>>;
  createQueryFromObject: (paramsObj: URLSearchParams, formValues: ITenderFilterModalForm) => string;
  createObjectFromQuery: (paramsObj: URLSearchParams) => ITenderFilterModalForm
}

export interface ITenderFilterModalForm {
  eventStatus: number
  buyerOrganizationIds: number[]
  eventNumber: string
  fromPublishDate: string
  toPublishDate: string
  categoryCodeIds: number[]
  eventName: string
  awardedParticipantName: string
  awardedParticipantVoen: string
}