import * as XLSX from "xlsx";

import { ColDef, GridOptions } from "ag-grid-community";
import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";

const ImportCSV = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<any[]>([]);
  const columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 130 },
    { field: "sport", minWidth: 100 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  const gridOptions: GridOptions = {
    columnDefs,
    defaultColDef: {
      minWidth: 80,
      flex: 1,
    },
  };
  const importExcel = () => {
    fetch("https://www.ag-grid.com/example-assets/olympic-data.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data: ArrayBuffer) => {
        const workbook = convertDataToWorkbook(data);
        populateGrid(workbook);
      });
  };
  const convertDataToWorkbook = (dataRows: ArrayBuffer) => {
    const data = new Uint8Array(dataRows);
    const arr: string[] = [];
    for (let i = 0; i !== data.length; ++i) {
      arr[i] = String.fromCharCode(data[i]);
    }
    const bstr = arr.join("");
    return XLSX.read(bstr, { type: "binary" });
  };
  const populateGrid = (workbook: XLSX.WorkBook) => {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const columns: Record<string, string> = {
      A: "athlete",
      B: "age",
      C: "country",
      D: "year",
      E: "date",
      F: "sport",
      G: "gold",
      H: "silver",
      I: "bronze",
      J: "total",
    };
    const rowData: any[] = [];
    let rowIndex = 2;
    while (worksheet["A" + rowIndex]) {
      const row: any = {};
      Object.keys(columns).forEach((column) => {
        row[columns[column]] = worksheet[column + rowIndex].w;
      });
      rowData.push(row);
      rowIndex++;
    }
    setRowData(rowData);
  };
  return (
    <div>
      <button onClick={importExcel}>Import Excel</button>
      <div
        id="myGrid"
        className="ag-theme-quartz"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default ImportCSV;
