import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import "./MyComponent.css";

import React, {
  Component,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import CustomFilter from "./CustomFilter";

const MyComponent = () => {
  const CustomButtonComponent = (props: any) => {
    return (
      props &&
      props.value && (
        <>
          <button onClick={() => window.alert(`${props.value}`)}>
            {props.buttonText}
          </button>
          {props.value}
        </>
      )
    );
  };

  const MyComp = (params: any) => {
    const renderCountRef = useRef(1);

    console.log("renderCounter", renderCountRef.current);
    return (
      <>
        <b>({renderCountRef.current++})</b>
        {params.value}
      </>
    );
  };

  const CheckedComponent = (p: { value: boolean }) => {
    return (
      <img
        alt={`${p.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/tick-in-circle.png`}
        style={{ width: "20", height: "20" }}
      />
    );
  };

  const UnCheckedComponent = (p: { value: boolean }) => {
    return (
      <img
        alt={`${p.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/cross-in-circle.png`}
        style={{ width: "20", height: "20" }}
      />
    );
  };

  const defaultColDef = useMemo(() => {
    return {
      //   flex: 1,
      width: 500,
      // filter: HelloWorld,
      // filter: true,
      //   floatingFilter: true,
      editable: true,
      enableRowGroup: true,
      //   cellRenderer: memo(MyComp),
      lockPinned: true,
      filterParams: {
        debounceMs: 0,
        // buttons: ["apply", "cancel", "clear", "reset"],
      },
      filter: "agTextColumnFilter",
    };
  }, []);

  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState([
    {
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "15/01/2023",
    },
    {
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "20/07/2022",
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "10/03/2023",
    },
    {
      make: "Chevrolet",
      model: "Bolt EV",
      price: 31500,
      electric: true,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "30/05/2023",
    },
    {
      make: "BMW",
      model: "i3",
      price: 44450,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "05/02/2023",
    },
    {
      make: "Audi",
      model: "Q5",
      price: 43700,
      electric: false,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "15/09/2022",
    },
    {
      make: "Hyundai",
      model: "Kona Electric",
      price: 37490,
      electric: true,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "25/11/2022",
    },
    {
      make: "Nissan",
      model: "Leaf",
      price: 31600,
      electric: true,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "17/04/2023",
    },
    {
      make: "Honda",
      model: "Civic",
      price: 25700,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "22/08/2022",
    },
    {
      make: "Mercedes-Benz",
      model: "EQC",
      price: 67000,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "12/06/2023",
    },
    {
      make: "Volkswagen",
      model: "ID.4",
      price: 41500,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "08/05/2023",
    },
    {
      make: "Subaru",
      model: "Outback",
      price: 33295,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "18/10/2022",
    },
    {
      make: "Mazda",
      model: "MX-30",
      price: 34395,
      electric: true,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "25/03/2023",
    },
    {
      make: "Rivian",
      model: "R1T",
      price: 73000,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "04/07/2023",
    },
    {
      make: "Lucid",
      model: "Air",
      price: 77400,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "09/08/2023",
    },
    {
      make: "Volvo",
      model: "XC40 Recharge",
      price: 53700,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "01/04/2023",
    },
    {
      make: "Porsche",
      model: "Taycan",
      price: 83000,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "15/09/2023",
    },
    {
      make: "Jaguar",
      model: "I-PACE",
      price: 69995,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "05/06/2023",
    },
    {
      make: "Kia",
      model: "Niro EV",
      price: 39690,
      electric: true,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "14/02/2023",
    },
    {
      make: "Ram",
      model: "1500",
      price: 37590,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "12/11/2022",
    },
    {
      make: "GMC",
      model: "Sierra 1500",
      price: 40900,
      electric: false,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "03/03/2023",
    },
    {
      make: "Chevrolet",
      model: "Silverado",
      price: 41800,
      electric: false,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "10/05/2023",
    },
    {
      make: "Ford",
      model: "Mustang Mach-E",
      price: 42995,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "20/04/2023",
    },
    {
      make: "Tesla",
      model: "Model 3",
      price: 43990,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "18/07/2023",
    },
    {
      make: "Jeep",
      model: "Wrangler",
      price: 31995,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "30/10/2022",
    },
    {
      make: "Dodge",
      model: "Charger",
      price: 32995,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "22/09/2022",
    },
    {
      make: "Honda",
      model: "Accord",
      price: 28300,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "14/12/2022",
    },
    {
      make: "Toyota",
      model: "Camry",
      price: 28400,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "18/08/2022",
    },
    {
      make: "Hyundai",
      model: "Elantra",
      price: 21700,
      electric: false,
      condition: { good: false, bad: true, average: false },
      dateOfManufacture: "25/06/2022",
    },
    {
      make: "Kia",
      model: "Soul EV",
      price: 33690,
      electric: true,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "27/02/2023",
    },
    {
      make: "Volkswagen",
      model: "Passat",
      price: 27995,
      electric: false,
      condition: { good: false, bad: false, average: true },
      dateOfManufacture: "07/11/2022",
    },
    {
      make: "Tesla",
      model: "Model S",
      price: 89990,
      electric: true,
      condition: { good: true, bad: false, average: false },
      dateOfManufacture: "03/08/2023",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    {
      field: "make",
      headerName: "Company",
      // valueGetter: (p: any) => p.data.make + " " + p.data.price,
      cellRenderer: CustomButtonComponent,

      filter: CustomFilter,
      cellRendererParams: {
        buttonText: "Push",
      },
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: ["Tesla", "Ford", "Toyota"] },
      checkboxSelection: true,
      //   pinned: "left",
      tooltipValueGetter: (p: any) => Math.random(),
      //   tooltipField: "model",
      //   lockPinned: true,

      //   flex: 2,
    },
    {
      field: "model",
      sortable: false,
      lockPosition: true,
      tooltipField: "make",
      //   hide: true,
      //   lockVisible: true,
      //   flex: 1,
    },
    {
      field: "price",
      filter: "agMultiColumnFilter",
      valueFormatter: (p: any) =>
        p && p.value && "£" + " " + p?.value?.toLocaleString(),
      cellClassRules: {
        "green-cell": (p: any) => p.value > 60000,
      },
      headerTooltip: "AG Grid is Great!",
      //   cellRenderer: (p: any) => <p>Price is {p.value}</p>,
      //   flex: 1,
    },
    {
      field: "electric",
      filter: "agSetColumnFilter",
      cellRendererSelector: (p: any) => {
        if (p.value == true) {
          return { component: CheckedComponent };
        } else if (p.value != undefined) {
          return { component: UnCheckedComponent };
        }
      },
      //   flex: 1,
    },
    {
      field: "dateOfManufacture",
      headerName: "Date Of Manufacture",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (dateFormFilter: any, cellValue: any) => {
          if (cellValue == null) {
            return 0;
          }
          const dateParts = cellValue.split("/");

          const day = Number(dateParts[0]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[2]);
          const celldate = new Date(year, month, day);

          if (celldate < dateFormFilter) {
            return -1;
          } else if (celldate > dateFormFilter) {
            return 1;
          }
          return 0;
        },
      },
    },
    {
      headerName: "Condition",
      marryChildren: true,
      children: [
        {
          field: "condition.good",
          headerName: "Good",
          //   columnGroupShow: "open",
        },
        {
          field: "condition.bad",
          headerName: "Bad",
          columnGroupShow: "open",
        },
        {
          field: "condition.average",
          headerName: "Average",
          columnGroupShow: "open",
        },
      ],
    },
    // {
    //   headerName: "AAA",
    //   children: [
    //     {
    //       headerName: "BBB",
    //       children: [
    //         {
    //           headerName: "CCC",
    //           children: [
    //             {
    //               field: "model",
    //             },
    //             {
    //               field: "model",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);

  const rowClassRules = useMemo(
    () => ({
      "red-row": (p: any) => p?.data?.make == "Tesla",
    }),
    []
  );

  const onPushMe = useCallback(() => {
    const allColumns = gridRef?.current.api.getAllGridColumns();
    const displayedColumns = gridRef.current.api.getAllDisplayedColumns();
    const make = gridRef.current.api.getColumn("make");
    gridRef.current.api.setColumnsPinned(["model"], "left");
    console.log("All col", allColumns);
    console.log("make", make);
    console.log("Displayed Cols", displayedColumns);
  }, []);

  const savedFilterState = useRef();
  const onBtSave = useCallback(() => {
    const filterModel = gridRef.current.api.getFilterModel();
    console.log("filterModal", filterModel);
    savedFilterState.current = filterModel;
  }, []);

  const onBtApply = useCallback(() => {
    const filterModel = savedFilterState.current;
    console.log("Apply Model", filterModel);
    gridRef.current.api.setFilterModel(filterModel);
  }, []);

  return (
    <>
      {/* ag-theme-material-dark */}
      <div className="ag-theme-material-dark" style={{ height: 500 }}>
        {/* <button onClick={() => onPushMe()}>Push Me</button> */}
        {/* <button onClick={() => onBtSave()}>Save</button>
        <button onClick={() => onBtApply()}>Apply</button> */}

        <AgGridReact
          ref={gridRef}
          popupParent={document.body}
          rowClassRules={rowClassRules}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection={"multiple"}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 40]}
          rowGroupPanelShow="always"
          enableFilter={true}
        />
      </div>
    </>
  );
};

export default MyComponent;
