import { useMemo, useState } from "react"
import { useTable, usePagination, useSortBy } from "react-table"
import StarIcon from "../icons/star"

const ReviewTable = ({ reviews, isApproved }) => {

   const columns = useMemo(() => [
         {
            id: "reviews",
            Header: "",
            columns: [
               {
                  Header: <StarIcon />,
                  accessor: "rating",
               },
               {
                  Header: "Customer",
                  accessor: "display_name",
               },
               {
                  Header: "Review",
                  accessor: "content"
               },
               {
                  id: "menu",
                  Header: "",
                  accessor: "approved"
               }
            ],
         },
      ],
      []
   )

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
         columns,
         data: reviews,
         defaultColumn: {
            width: "auto",
         },
      }
   )

   return (
      <table {...getTableProps()} className="table-auto w-full">
         <thead>
            {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                     <th {...column.getHeaderProps()} className="p-2 pt-0 text-center first-of-type:text-left">
                        {column.render("Header")}
                     </th>
                  ))}
               </tr>
            ))}
         </thead>
         <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
               prepareRow(row)
               return (
                  <tr {...row.getRowProps()}>
                     {row.cells.map((cell) => {
                        return (
                           <td {...cell.getCellProps()} className="border-t border-b p-2 text-left">
                              {cell.render("Cell")}
                           </td>
                        )
                     })}
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}

export default ReviewTable

