import { SetStateAction, useState } from 'react';

interface Props<T> {
  data: T[] | undefined
  rowsPerPage?: number
}

function usePagination<T>(props: Props<T>) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(props?.rowsPerPage ?? 10)

  const handleChangePage = (_event: unknown, newPage: SetStateAction<number>) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const resetPagination = () => setPage(0)

  const data: T[] | undefined = Array.isArray(props.data) ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : undefined

  return { data, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage, resetPagination }
}

export default usePagination