import { useState } from "react";
import PropTypes from "prop-types";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import "../styles/table.css";

const TakaTable = ({ data, columns }) => {
  const [sortUser, setSortUser] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting: sortUser },
    onSortingChange: setSortUser,
  });

  const buttonClasses =
    "px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-lightBlue border-lightBlue hover:bg-lightBlue hover:text-white";

  return (
    <div className='taka-container container overflow-x-auto mx-auto'>
      <table className='taka-table table'>
        <thead>
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers?.map((header) => (
                <th
                  className='text-white bg-lightBlue text-lg font-semibold'
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    {
                      asc: <RiSortAsc className='inline ml-2' />,
                      desc: <RiSortDesc className='inline ml-2' />,
                    }[header.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells()?.map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center items-center gap-6 mt-5 mb-12'>
        <button
          className={buttonClasses}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}>
          First
        </button>
        <button
          className={buttonClasses}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}>
          Previous
        </button>
        <button
          className={buttonClasses}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}>
          Next
        </button>
        <button
          className={buttonClasses}
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last
        </button>
      </div>
    </div>
  );
};

TakaTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

export default TakaTable;
