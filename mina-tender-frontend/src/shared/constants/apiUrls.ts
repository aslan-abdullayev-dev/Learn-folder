export const apiUrls = {
  language: {
    languageType: "/language-type",
    languageKeys: "/language-key",
    translate: "/language/translate",
  },
  settings: {
    getSettingsByKey: (key: string) => `/setting/${key}`,
    putSettingsByKey: (key: string) => `/setting/${key}`,
  },
  templates: {
    getTemplateByKey: (key: string) => `/templates/key/${key}`,
  },
  menu: {
    getAllActiveMenus: "/menu/active",
    postMenu: "/menu",
    putMenu: (id: number) => `menu/${id}`,
    getOneMenu: (id: number) => `menu/${id}`,
    deleteMenu: (id: number) => `menu/${id}`,
  },
  file: {
    viewImage: "file/view",
  },
  products: {
    getAllProducts: (page: number, size: number) => `products?page=${page}&size=${size}`,
    deleteProduct: (id: number) => `products/${id}`,
    getOneProduct: (id: number) => `products/${id}`,
    editProduct: (id: number) => `products/${id}`,
    getAllProductTypes: "product-types",
    postProduct: "products",
  },
  comments: {
    getAllComments: (page: number, size: number) => `comments?page=${page}&size=${size}`,
    deleteComment: (id: number) => `comments/${id}`,
    editComment: (id: number) => `comments/${id}`,
    getOneComment: (id: number) => `comments/${id}`,
    postComment: "comments",
  },
  languages: {
    getAllKeysWithTranslations: "language/key",
    getAllLanguageTypes: "language-type",
    deleteLanguageByKeyId: (id: number) => `language-key/${id}`,
    getLanguageTranslationByKey: (key: string) => `language/key/${key}`,
    editLanguageTranslationByKey: (key: string) => `language/multiple/${key}`,
    addMultipleLanguages: "language/multiple"
  },
  articles: {
    addArticle: "page",
    getAllArticles: (pageNo: number, size: number) => `page?pageNo=${pageNo}&size=${size}`,
    getParentArticles: "page/en",
    activeArticles: "page/active",
    getOneArticle: (id: string) => `page/${id}`,
    editOneArticle: (id: string) => `page/${id}`,
    deleteOneArticle: (id: number) => `page/${id}`,
  },
  partners: {
    getAllPartners: "partners",
    editPartners: (id: number) => `partners?id=${id}`,
  },
  contacts: {
    getAllContacts: "contacts",
    editContacts: (id: number) => `contacts/${id}`,
  },
  respond: {
    getResponse: (type: "PARTNER" | "CONTACT", itemId: number) => `respond?type=${type}&itemId=${itemId}`,
    postResponse: "respond"
  }
};
