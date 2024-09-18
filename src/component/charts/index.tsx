"use strict";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { getData } from "./data.jsx";

const ChartExample = () => {
  // Memoized container and grid styles
  const containerStyle = useMemo(() => ({ height: 2000 }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // State for row data and column definitions
  const [rowData] = useState(getData());
  const [columnDefs] = useState([
    { field: "symbol", maxWidth: 120 },
    { field: "name", minWidth: 250 },
    {
      field: "change",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "area",
          fill: "rgba(216, 204, 235, 0.3)",
          line: {
            stroke: "rgb(119,77,185)",
          },
          highlightStyle: {
            fill: "rgb(143,185,77)",
          },
          axis: {
            stroke: "rgb(204, 204, 235)",
          },
        },
      },
    },
    { field: "volume", type: "numericColumn", maxWidth: 140 },
  ]);

  // Default column definitions
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
    }),
    []
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz-dark"}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowHeight={50}
        />
      </div>
    </div>
  );
};

export default ChartExample;
