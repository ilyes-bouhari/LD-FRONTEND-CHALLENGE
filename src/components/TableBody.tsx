import { TableBody as MuiTableBody, Skeleton, TableCell, TableRow } from '@mui/material';

interface Props {
  data: Pokemon[] | undefined,
  columns: readonly Column[]
}

function TableBody({ data, columns }: Props) {
  return (
    <MuiTableBody>
      {data?.map((row: Pokemon) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map((column) =>
              <TableCell key={column.id} align={column.align}>
                {
                  column.type === 'array'
                    ? (row[column.id as keyof typeof row] as string[]).join(', ')
                    : row[column.id as keyof typeof row]
                }
              </TableCell>
            )}
          </TableRow>
        );
      })}
      {!data && <TableRow>
        {columns.map((column) =>
          <TableCell key={column.id} align={column.align}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        )}
      </TableRow>}
      {data?.length === 0 && (<TableRow><TableCell align="center" colSpan={10}>No data found. Try adjusting the filter settings.</TableCell></TableRow>)}
    </MuiTableBody>
  );
}

export default TableBody;