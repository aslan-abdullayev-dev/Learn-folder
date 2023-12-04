export const formSettings = {
  fields: [
    {
      name: "Line Color",
      type: "colorpicker",
      field: "line-color",
      parent: "paint",
      default: "#FF0000",
      nullable: false,
    },
    {
      data: {
        max: 20,
        min: 0,
        step: 0.25,
      },
      name: "Line Width",
      type: "range",
      field: "line-width",
      parent: "paint",
      default: 3,
      nullable: false,
    },
    {
      data: {
        max: 1,
        min: 0,
        step: 0.01,
      },
      name: "Line Opacity",
      type: "range",
      field: "line-opacity",
      parent: "paint",
      default: 1,
      nullable: false,
    },
    {
      data: {
        max: 100,
        min: 0,
        step: 0.1,
      },
      name: "Line Blur",
      type: "range",
      field: "line-blur",
      parent: "paint",
      default: 0,
      nullable: false,
    },
    {
      data: [
        {
          label: "Butt",
          value: "butt",
        },
        {
          label: "Round",
          value: "round",
        },
        {
          label: "Square",
          value: "square",
        },
      ],
      name: "Line Cap",
      type: "select",
      field: "line-cap",
      parent: "layout",
      default: "round",
      nullable: true,
    },
    {
      data: [
        {
          label: "Bevel",
          value: "bevel",
        },
        {
          label: "Round",
          value: "round",
        },
        {
          label: "Mitter",
          value: "miter",
        },
      ],
      name: "Line Join",
      type: "select",
      field: "line-join",
      parent: "layout",
      default: "round",
      nullable: true,
    },
    {
      name: "Line Dash Array",
      type: "integertags",
      field: "line-dasharray",
      parent: "paint",
      default: [],
      nullable: true,
    },
    {
      data: [],
      name: "Line Gradient Styling",
      type: "gradient",
      field: "line-gradient",
      parent: "paint",
      default: [0, "#0000FF", 1, "#FF0000"],
      nullable: true,
    },
  ],
};
