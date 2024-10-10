export const apiUrls = {
  buyerOrganisation: {
    getAll: "buyer-organizations"
  },
  categoryCodes: {
    getAll: "category-codes",
  },
  tender: {
    getAll: (page: number) => `tenders/filter/guest?page=${page}&size=5`,
  }
}