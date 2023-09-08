import React, { useState, useEffect } from "react";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  
  useEffect(() => {
    if (!globalFilter) {
      setValue("")
    }
  }, [globalFilter])
  
  return (
    <input
        className={"global-filter"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setGlobalFilter(e.target.value);
        }}
        onClick={(e) => e.stopPropagation()}
        placeholder={"Search by Name or Area..."}
      />
  );
};

export default GlobalFilter;
