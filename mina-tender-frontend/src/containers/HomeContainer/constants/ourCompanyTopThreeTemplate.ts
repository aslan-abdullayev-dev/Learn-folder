import {
  TInputProp
} from "../../../shared/components/FormComponents/FormGenerator/FormGeneratorTypes.ts";

export const ourCompanyTopThreeTemplate: TInputProp[] = [
  {
    field: "type",
    type: "select",
    label: "Bottling type",
    default: null,
    col: { span: 12 },
    required: true,
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Bottling type is required"]
      }
    ],
    options: [
      {
        label: "Pet",
        value: "pet",
      },
      {
        label: "Glass",
        value: "glass",
      },
    ],
  },
  {
    field: "amount",
    type: "number",
    label: "Product volume amount",
    default: null,
    col: { span: 12 },
    required: true,
    schema: [
      {
        method: "number",
      },
      {
        method: "required",
        values: ["Amount required"]
      },
      {
        method: "min",
        values: [1, "At least one item required"]
      }
    ],

  },
  {
    field: "measure",
    type: "select",
    label: "Measure type",
    default: null,
    col: { span: 12 },
    required: true,
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Measure type is required"]
      }
    ],
    options: [
      {
        label: "ml",
        value: "ml",
      },
      {
        label: "l",
        value: "l",
      },
    ],
  },
  {
    field: "productTitle",
    type: "text",
    label: "Product title",
    default: "",
    col: { span: 12 },
    required: true,
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Product title is required"]
      },
    ],
  },
  {
    field: "productDesc",
    type: "textarea",
    label: "Product description",
    default: "",
    col: { span: 12 },
    required: true,
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Product description is required"]
      }
    ],
  },
  {
    field: "imgID",
    type: "antUpload",
    label: "Product image",
    schema: [
      {
        method: "array",
      },
      {
        method: "min",
        values: [1, "Product image is required"]
      },
      {
        method: "max",
        values: [1, "Only one image is allowed"]
      }
    ],
    col: { span: 12 },
    required: true,
    default: [],
    allowedTypes: [
      "image/bmp",
      "image/jpeg",
      "image/gif",
      "image/tiff",
      "image/png",
      "image/svg+xml",
      "image/webp"
    ],
    maxCount: 1,
    aspect: 1 / 3.5,
  },
]