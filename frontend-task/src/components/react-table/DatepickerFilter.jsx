import React, { useState, useEffect } from "react";

const DatepickerFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);

  useEffect(() => {
    if (!globalFilter) {
      setValue("")
    }
  }, [globalFilter])

  return (
    <input
      className={"global-filter"}
      type={"date"}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setGlobalFilter(e.target.value.replaceAll("-", ".").split(".").reverse().join("."));
      }}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default DatepickerFilter;
