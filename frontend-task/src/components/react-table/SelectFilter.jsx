import React, { useState, useEffect } from "react";

const SelectFilter = ({ globalFilter, setGlobalFilter, options }) => {
  const [value, setValue] = useState(globalFilter);

  useEffect(() => {
    if (!globalFilter) {
      setValue("")
    }
  }, [globalFilter])
  
  return (
    <select
      className={"select-filter"}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setGlobalFilter(e.target.value);
      }}
    >
      <option value={""}>Default</option>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
};

export default SelectFilter;
