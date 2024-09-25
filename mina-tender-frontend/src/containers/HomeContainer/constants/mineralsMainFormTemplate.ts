import {
  TInputProp
} from "../../../shared/components/FormComponents/FormGenerator/FormGeneratorTypes.ts";

export const mineralsMainFormTemplate: TInputProp[] = [
  {
    field: "name",
    col: {
      span: 12,
    },
    type: "text",
    label: "Name",
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Name is required"],
      },
    ],
    default: "",
    required: true,
  },
  {
    field: "amount",
    col: {
      span: 12,
    },
    type: "text",
    label: "Amount",
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Amount is required"],
      },
    ],
    default: "",
    required: true,
  },
  {
    field: "element",
    col: {
      span: 12,
    },
    type: "text",
    label: "Element",
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Element is required"],
      },
    ],
    default: "",
    required: true,
  },
  {
    field: "position",
    col: {
      span: 12,
    },
    type: "select",
    label: "Position",
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Position is required"],
      },
    ],
    default: "",
    options: [
      {
        label: "Left",
        value: "left",
      },
      {
        label: "Right",
        value: "right",
      },
    ],
    required: true,
  },
  {
    field: "benefit",
    col: {
      span: 24,
    },
    type: "textarea",
    label: "Benefit",
    schema: [
      {
        method: "string",
      },
      {
        method: "required",
        values: ["Benefit is required"],
      },
    ],
    default: "",
    required: true,
  },
];
