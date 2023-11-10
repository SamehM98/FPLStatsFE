import { DataGrid } from "@mui/x-data-grid";

function Table({ rows, columns, getCellClassName, pageSizeOptions, style, pageSize }) {
  return (
    <DataGrid
      disableColumnFilter
      disableColumnMenu
      pageSizeOptions={pageSizeOptions || []}
      initialState={{
        pagination: { paginationModel: { pageSize } },
      }}
      disableColumnSelector
      rows={rows || []}
      sx={style}
      columns={columns || []}
      getCellClassName={getCellClassName || (() => null)}
    />
  )
}

export default Table;
