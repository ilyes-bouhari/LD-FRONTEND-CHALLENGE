import { FavoriteBorder } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, Grid, InputAdornment, Paper, Table, TableContainer, TablePagination, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import usePagination from '../hooks/usePagination';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { filterPokemons } from '../helpers';

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', align: 'center', minWidth: 100, bg: '#F3F6F9' },
  { id: 'name', label: 'name', align: 'center', minWidth: 100, bg: '#F3F6F9' },
  { id: 'type', label: 'type', align: 'center', minWidth: 100, type: 'array', bg: '#F3F6F9' },
  { id: 'hp', label: 'health', align: 'center', bg: '#F3F6F9' },
  { id: 'attack', label: 'attack', align: 'center', bg: '#F3F6F9' },
  { id: 'defense', label: 'defense', align: 'center', bg: '#F3F6F9' },
  { id: 'special_attack', label: 'special attack', align: 'center', bg: '#F3F6F9' },
  { id: 'special_defense', label: 'special defense', align: 'center', bg: '#F3F6F9' },
  { id: 'speed', label: 'speed', align: 'center', bg: '#F3F6F9' },
  { id: 'power', label: 'power', align: 'center', bg: '#F3F6F9' },
]

interface PokemonListProps {
  pokemons: Pokemon[] | undefined
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  const [powerThreshold, handlePowerThreshold] = useState<number>(0)
  const [search, handleSearch] = useState<string>('')

  const filteredPokemons = filterPokemons({ pokemons, search, powerThreshold })
  const {
    data,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    resetPagination,
  } = usePagination<Pokemon>({ data: filteredPokemons });

  const sortedPokemons = data && [...data].sort((a: Pokemon, b: Pokemon) => a.power - b.power);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ padding: '20px', borderRadius: '20px' }}>
        <Grid container spacing={2} columns={16} sx={{ paddingBottom: '40px' }}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              type="text"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={event => {
                handleSearch(event.target.value)
                resetPagination()
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              type="number"
              placeholder="Power threshold"
              inputProps={{
                min: 0,
              }}
              value={powerThreshold}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FavoriteBorder />
                  </InputAdornment>
                ),
              }}
              onChange={event => {
                handlePowerThreshold(~~event.target.value)
                resetPagination()
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="body1">Min power : {sortedPokemons?.length && sortedPokemons[0].power}</Typography>
        <Typography variant="body1">Max power : {sortedPokemons?.length && sortedPokemons[sortedPokemons.length - 1].power}</Typography>
      </Paper>
      <Box sx={{ height: '80px' }} />
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '20px' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead columns={columns} />
            <TableBody
              data={data}
              columns={columns}
            />
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100, 300, 500]}
        component="div"
        count={filteredPokemons?.length ? filteredPokemons.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container >
  )
}