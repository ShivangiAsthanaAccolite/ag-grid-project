import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useEffect, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";

const CompanyLogoRenderer = ({ value }: any) => (
  <span
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
    }}
  >
    {value && (
      <img
        alt={`${value} Flag`}
        src={`https://www.ag-grid.com/example-assets/space-company-logos/${value.toLowerCase()}.png`}
        style={{
          display: "block",
          width: "25px",
          height: "auto",
          maxHeight: "50%",
          marginRight: "12px",
          filter: "brightness(1.1)",
        }}
      />
    )}
    <p
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </p>
  </span>
);

const MissionResultRenderer = (params: { value: boolean }) => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      height: "100%",
      alignItems: "center",
    }}
  >
    {
      <img
        alt={`${params.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/${
          params.value ? "tick-in-circle" : "cross-in-circle"
        }.png`}
        style={{ width: "auto", height: "auto" }}
      />
    }
  </span>
);
const dateFormatter = (params: { value: string }) => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MyComp = (params: any) => {
  const renderCountRef = useRef(1);
  return (
    <>
      <b>({renderCountRef.current++})</b>
      {params.value}
    </>
  );
};

const GridExample = () => {
  const [rowData, setRowData] = useState([]);

  const [colDefs] = useState([
    {
      field: "mission",
      filter: true,
      checkboxSelection: true,
    },
    {
      field: "company",
      cellRenderer: CompanyLogoRenderer,
    },
    {
      field: "location",
    },
    { field: "date", cellRenderer: dateFormatter },
    {
      field: "price",
      valueFormatter: (params: any) => {
        return "£" + " " + params?.value?.toLocaleString();
      },
    },
    { field: "successful", cellRenderer: MissionResultRenderer },
    { field: "rocket" },
  ]);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/space-mission-data.json")
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData);
      });
  }, []);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      editable: true,
      flex: 1,
      enableRowGroup: true,
      cellRenderer: MyComp,
    }),
    []
  );

  return (
    <div className={"ag-theme-quartz-dark"} style={{ height: 1000 }}>
      <AgGridReact
        rowData={rowData}
        rowSelection={"multiple"}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        onCellValueChanged={(event: any) =>
          console.log(`New Cell Value: ${event.value}`)
        }
        rowGroupPanelShow="always"
      />
    </div>
  );
};
export default GridExample;
