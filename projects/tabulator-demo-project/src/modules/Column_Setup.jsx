import { useRef, useEffect } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import React from "react";

function Column_Setup() {
  const tableRef = useRef(null);
  let table;

  //define data
  let tabledata = [
    {
      id: 1,
      name: "Billy Bob",
      age: 12,
      gender: "male",
      height: 95,
      col: "red",
      dob: "14/05/2010",
    },
    {
      id: 2,
      name: "Jenny Jane",
      age: 42,
      gender: "female",
      height: 142,
      col: "blue",
      dob: "30/07/1954",
    },
    {
      id: 3,
      name: "Steve McAlistaire",
      age: 35,
      gender: "male",
      height: 176,
      col: "green",
      dob: "04/11/1982",
    },
  ];

  var newColumns = [
    { title: "Name", field: "name", sorter: "string", width: 200 },
    { title: "Age", field: "age", sorter: "number", hozAlign: "right", formatter: "progress" },
    { title: "Height", field: "height", formatter: "star", hozAlign: "center", width: 100 },
    { title: "Favourite Color", field: "col", sorter: "string" },
    { title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center" },
  ];

  useEffect(() => {
    // table = new Tabulator(tableRef.current, {
    //   data: tabledata,
    //   autoColumns: true, //creates table heads automatically
    // });
    // ---------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------
    // table = new Tabulator(tableRef.current, {
    //   data: tabledata,
    //   autoColumns: true,
    //   autoColumnsDefinitions: function (definitions) {
    //     //definitions - array of column definition objects
    //     definitions.forEach((column) => {
    //       column.headerFilter = true; // add header filter to every column
    //     });
    //     return definitions;
    //   },
    // });
    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // table = new Tabulator(tableRef.current, {
    //   data: tabledata,
    //   autoColumns: true,
    //   autoColumnsDefinitions: [
    //     { field: "name", editor: "input" }, //add input editor to the name column
    //     { field: "age", headerFilter: true }, //add header filters to the age column
    //   ],
    // });
    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    table = new Tabulator(tableRef.current, {
      data: tabledata,
      columns: [
        { title: "Name", field: "name", sorter: "string", width: 200, editor: true },
        {
          title: "Age",
          field: "age",
          sorter: "number",
          hozAlign: "right",
          formatter: function () {
            return "<h1>merhaba</h1>";
          },
        },
        {
          title: "Gender",
          field: "gender",
          sorter: "string",
          cellClick: function (e, cell) {
            console.log("cell click");
          },
        },
        { title: "Height", field: "height", formatter: "star", hozAlign: "center", width: 100 },
        { title: "Favourite Color", field: "col", sorter: "string" },
        { title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center" },
        // {
        //   title: "Cheese Preference",
        //   field: "cheese",
        //   sorter: "boolean",
        //   hozAlign: "center",
        //   formatter: "tickCross",
        // },
      ],
    });

    // table.deleteColumn("Name");
    // console.log("table", table)
  }, []);

  // useEffect(() => {
  //   table.on("tableBuilt", function () {
  //     // table.setColumns(newColumns);
  //   });
  // }, [table]);

  function deleteColumn(columnIndex) {
    console.log("table", table);
    // console.log("table initialized", table.initialized);
    // console.log("table columns", table.getColumns());
    // console.log("table columns", table.getColumns()[0].delete());
    console.log("table getColumnDefinitions", table.getColumnDefinitions());

    console.log("columnManager", table.columnManager.columnsByIndex[columnIndex]);

    if (table.initialized) {
      table.deleteColumn(columnIndex);
    }
    // if (column) {
    // table.deleteColumn(columnIndex);
    // }
  }

  function addColumn() {
    table.addColumn({ title: "Adi", field: "adi" }, true, "name");
  }

  return (
    <>
      <div ref={tableRef}></div>
      <button onClick={() => deleteColumn(0)}>Delete column 2</button>
      <button onClick={() => addColumn(0)}>Add column</button>
    </>
  );
}

export default Column_Setup;
