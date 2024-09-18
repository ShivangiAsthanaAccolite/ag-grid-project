"use strict";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./style.css";

import { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { getData } from "./data.jsx";

let chartRef;

const ChartTypeExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ height: 1000 }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs] = useState([
    {
      field: "period",
      chartDataType: "category",
      headerName: "Financial Period",
      width: 150,
    },
    {
      field: "recurring",
      chartDataType: "series",
      headerName: "Recurring revenue",
    },
    {
      field: "individual",
      chartDataType: "series",
      headerName: "Individual sales",
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const selection = useMemo(() => {
    return { mode: "cell" };
  }, []);
  const chartToolPanelsDef = useMemo(() => {
    return {
      defaultToolPanel: "settings",
    };
  }, []);

  const onGridReady = useCallback((params) => {
    getData().then((rowData) => params.api.setGridOption("rowData", rowData));
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    chartRef = params.api.createRangeChart({
      chartContainer: document.querySelector("#myChart"),
      cellRange: {
        columns: ["period", "recurring", "individual"],
      },
      chartType: "groupedColumn",
    });
  }, []);

  const updateChart = useCallback(
    (chartType) => {
      gridRef.current.api.updateChart({
        type: "rangeChartUpdate",
        chartId: `${chartRef.chartId}`,
        chartType: chartType,
      });
    },
    [chartRef]
  );

  return (
    <div style={containerStyle}>
      <div className="wrapper">
        <div className="button-container">
          <button onClick={() => updateChart("groupedColumn")}>
            Grouped Column
          </button>
          <button onClick={() => updateChart("stackedColumn")}>
            Stacked Column
          </button>
          <button onClick={() => updateChart("normalizedColumn")}>
            Normalized Column
          </button>
          <button onClick={() => updateChart("groupedBar")}>Grouped Bar</button>
          <button onClick={() => updateChart("stackedBar")}>Stacked Bar</button>
          <button onClick={() => updateChart("normalizedBar")}>
            Normalized Bar
          </button>
        </div>

        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            popupParent={popupParent}
            selection={selection}
            enableCharts={true}
            chartToolPanelsDef={chartToolPanelsDef}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          />
        </div>
        <div id="myChart" className="ag-theme-quartz"></div>
      </div>
    </div>
  );
};

export default ChartTypeExample;
