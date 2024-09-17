import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export default forwardRef((props, ref) => {
  const [filterState, setFilterState] = useState("off");

  useImperativeHandle(ref, () => {
    return {
      isFilterActive() {
        return filterState !== "off";
      },
      doesFilterPass(params) {
        console.log("Filter State:", filterState);
        console.log("Row Data Make:", params.data.make);
        return params.data.make === filterState;
      },
      getModel() {
        return undefined;
      },
      setModel() {},
    };
  });

  useEffect(() => {
    if (props.api) {
      props.api.onFilterChanged();
    }
  }, [filterState, props.api]);

  return (
    <>
      <div>Company Filter</div>
      <label>
        Filter Off
        <input
          type="radio"
          name="companyFilter"
          onChange={() => setFilterState("off")}
          checked={filterState === "off"}
        />
      </label>
      <label>
        Ford
        <input
          type="radio"
          name="companyFilter"
          onChange={() => setFilterState("Ford")}
          checked={filterState === "Ford"}
        />
      </label>
      <label>
        Honda
        <input
          type="radio"
          name="companyFilter"
          onChange={() => setFilterState("Honda")}
          checked={filterState === "Honda"}
        />
      </label>
    </>
  );
});
