import { TableCell, TableHead as MuiTableHead, TableRow } from '@mui/material';

interface Props {
  columns: readonly Column[]
}

function TableHead({ columns }: Props) {
  return (
    <MuiTableHead>
      <TableRow>
        {
          columns.map((column) => (
            <TableCell
              sx={{ backgroundColor: column.bg }}
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))
        }
      </TableRow>
    </MuiTableHead>
  )
}

export default TableHead;