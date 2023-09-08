import React, { useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy
} from "react-table";
import data from "../../data.json"
import GlobalFilter from './GlobalFilter';
import DropdownFilter from './SelectFilter';
import DatepickerFilter from './DatepickerFilter';

const ReactTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "businessDate",
        disableSortBy: true
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true
      },
      {
        Header: "Shift",
        accessor: "shift",
        disableSortBy: true
      },
      {
        Header: "Time Frame",
        accessor: "start",
        disableGlobalFilter: true,
        disableSortBy: true,
        Cell: ({ row: { original: { start, end } } }) => <span>{new Date(start).toLocaleTimeString()} - {new Date(end).toLocaleTimeString()}</span>
      },
      {
        Header: "# of guests",
        accessor: "quantity",
        disableGlobalFilter: true,
      },
      {
        Header: "Name",
        accessor: "customer.firstName",
        Cell: ({ row: { original: { customer: { firstName, lastName } } } }) => <span>{firstName} {lastName}</span>
      },
      {
        Header: "Area",
        accessor: "area",
        disableSortBy: true
      },
      {
        Header: "Notes",
        accessor: "guestNotes",
        disableGlobalFilter: true,
        disableSortBy: true,
        Cell: ({ row: { original: { guestNotes } } }) => <textarea disabled value={guestNotes}>{guestNotes}</textarea>
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    setGlobalFilter,
    state: { globalFilter },
    prepareRow,
  } = useTable(
    {
      columns,
      data: data?.reservations,
      initialState: {
        sortBy: [{ id: "quantity", desc: false }],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  );

  const statusFilterOptions = [{ label: "Seated", value: "seated" }, { label: "Checked out", value: "checked out" }, { label: "Confirmed", value: "confirmed"}, {label: "Not confirmed", value: "not"}]
  const shiftilterOptions = [{ label: "Breakfast", value: "breakfast" }, {label: "Lunch", value: "lunch" }, {label: "Dinner", value: "dinner"}]

  return (
    <>
      <DropdownFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} options={statusFilterOptions} />
      <DropdownFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} options={shiftilterOptions} />
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <DatepickerFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <button onClick={() => setGlobalFilter("")}>Reset All filters</button>
      
      <h1>Reservations List</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={Math.random()} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={Math.random()} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (columns.isSortedDesc ? ' 🔽' : ' 🔼') : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {!rows?.length &&
            <tr>
              <td />
              <td>No more Reservations </td>
            </tr>
          }

          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={Math.random()}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={Math.random()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};
export default ReactTable;