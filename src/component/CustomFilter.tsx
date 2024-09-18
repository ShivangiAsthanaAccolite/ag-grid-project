import { forwardRef, useCallback, useState } from "react";

import { useGridFilter } from "ag-grid-react";

export default forwardRef(({ onModelChange, getValue }, ref) => {
  const [filterState, setFilterState] = useState("off");

  // Callback function to determine if the filter passes for a given node
  const doesFilterPass = useCallback(
    ({ node }) => {
      const value = getValue(node).toString().toLowerCase();

      // Check the current filter state and filter accordingly
      if (filterState === "off") {
        return true; // If filter is off, all rows pass
      }
      return value.includes(filterState.toLowerCase());
    },
    [filterState, getValue]
  );

  // Use the AG Grid filtering hook to apply the filter logic
  useGridFilter({
    doesFilterPass,
    isFilterActive: () => filterState !== "off", // Filter is active when not "off"
  });

  // Update the filter model and state when "Ford" is selected
  const onChangeFord = () => {
    setFilterState("Ford");
    onModelChange({ value: "Ford" });
  };

  // Update the filter model and state when "Honda" is selected
  const onChangeHonda = () => {
    setFilterState("Honda");
    onModelChange({ value: "Honda" });
  };

  // Turn off the filter
  const onChangeOff = () => {
    setFilterState("off");
    onModelChange({ value: "" });
  };

  return (
    <>
      <div>Company Filter</div>
      <label>
        Filter Off
        <input
          type="radio"
          name="companyFilter"
          onChange={onChangeOff}
          checked={filterState === "off"}
        />
      </label>
      <label>
        Ford
        <input
          type="radio"
          name="companyFilter"
          onChange={onChangeFord}
          checked={filterState === "Ford"}
        />
      </label>
      <label>
        Honda
        <input
          type="radio"
          name="companyFilter"
          onChange={onChangeHonda}
          checked={filterState === "Honda"}
        />
      </label>
    </>
  );
});
