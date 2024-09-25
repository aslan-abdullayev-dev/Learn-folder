import {
  TInputProp
} from "../../../shared/components/FormComponents/FormGenerator/FormGeneratorTypes.ts";

export const getSocialFormTemplate: TInputProp[] = [
  {
    field: "title",
    type: "text",
    label: "Title",
    col: { span: 12 },
    default: "",
    schema: [
      {
        method: "string"
      },
      {
        method: "required",
        values: ["Title is required"]
      }
    ],
    required: true
  },
  {
    field: "desc",
    type: "textarea",
    label: "Description",
    col: { span: 24 },
    default: "",
    schema: [
      {
        method: "string"
      },
      {
        method: "required",
        values: ["Description is required"]
      }
    ],
    required: true
  },
  {
    field: "imageIDS",
    type: "antUpload",
    required: true,
    default: [],
    schema: [
      {
        method: "array"
      },
      {
        method: "min",
        values: [6, "6 images required"]
      },
      {
        method: "max",
        values: [6, "6 images required"]
      },
      {
        method: "required",
        values: ["Images required"]
      }
    ],
    col: { span: 24 },
    label: "Images",
    allowedTypes: ["image/webp", "image/png", "image/jpeg", "image/tiff", "image/svg+xml", "image/bmp"]
  }
]