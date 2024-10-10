export interface ITender {
  id: number
  buyerOrganizationName: string | null
  eventName: string | null
  publishDate: string | null
  endDate: string | null
  categoryCodes: CategoryCode[]
  participationFee: number | null
  viewFee: number | null
}

export interface CategoryCode {
  id: number
  code: string
}