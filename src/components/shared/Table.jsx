import { DataGrid } from "@mui/x-data-grid";

function Table({ rows, columns, getCellClassName, pageSizeOptions, style }) {
  return (
    <DataGrid
      disableColumnFilter
      disableColumnMenu
      pageSizeOptions={pageSizeOptions || []}
      disableColumnSelector
      rows={rows || []}
      sx={style}
      columns={columns || []}
      getCellClassName={getCellClassName || (() => null)}
    />
  )
}

export default Table;
