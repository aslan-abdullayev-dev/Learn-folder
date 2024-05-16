//======================================================
type Working_Simple_Discriminatory_Union =
  | {
  name: string;
  type: "data-parser";
  field: "data-parser";
  default: any[];
  nullable: boolean
  data?: {
    dataParser: string;
  }
}
  | {
  name: string;
  type: "table-column-creator";
  field: "table-column-creator";
  default: any[];
  nullable: boolean;
  data?: {
    tableColumn: string;
  }
}
  | {
  name: string;
  type: "css-editor";
  field: "css-editor";
  default: string;
  nullable: boolean;
  data?: {
    cssEditor: string;
  }
};

const data: Working_Simple_Discriminatory_Union = {
  name: "asd",
  type: "data-parser",
  field: "data-parser",
  default: [],
  nullable: false,
  data: {
    dataParser: ""
  }
}

//======================================================
type DataParserData = {
  dataParser: string;
  type: "data-parser";
}
type TableColumnData = {
  tableColumn: string;
  type: "table-column-creator";
}
type CssEditorData = {
  cssEditor: string;
  type: "css-editor";
}

type Working_Simple_Intersection_Discriminatory_Union = {
  name: string;
  default: any[];
  nullable: boolean;
} & (DataParserData | TableColumnData | CssEditorData)


const data2: Working_Simple_Intersection_Discriminatory_Union = {
  name: "asd",
  type: "data-parser",
  default: [],
  nullable: false,
  dataParser: "",
}

//======================================================
type DataParserData2 = {
  data: {
    dataParser: string;
  }
  type: "data-parser";
}
type TableColumnData2 = {
  data: {
    tableColumn: string;
  }
  type: "table-column-creator";
}
type CssEditorData2 = {
  data: {
    cssEditor: string;
  }
  type: "css-editor";
}

type Working_Nested_Intersection_Discriminatory_Union2 = {
  name: string;
  default: any[];
  nullable: boolean;
} & (DataParserData2 | TableColumnData2 | CssEditorData2)


const data3: Working_Nested_Intersection_Discriminatory_Union2 = {
  name: "asd",
  type: "data-parser",
  default: [],
  nullable: false,
  data: {
    dataParser: "",
  }
}

//======================================================
type DataParserData3 = {
  data: {
    dataParser: string;
    type: "data-parser";
  }
}
type TableColumnData3 = {
  data: {
    tableColumn: string;
    type: "table-column-creator";
  }
}
type CssEditorData3 = {
  data: {
    cssEditor: string;
    type: "css-editor";
  }
}

type Working_Nested_Intersection_Discriminatory_Union3 = {
  name: string;
  default: any[];
  nullable: boolean;
} & (DataParserData3 | TableColumnData3 | CssEditorData3)


const data4: Working_Nested_Intersection_Discriminatory_Union3 = {
  name: "asd",
  default: [],
  nullable: false,
  data: {
    type: "css-editor",
    cssEditor: ""
  }
}