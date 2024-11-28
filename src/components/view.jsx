import React, { useState, useEffect } from 'react';
import {supabase} from '../supabaseClient';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
      id: 'member_id',
      numeric: true,
      disablePadding: true,
      label: 'member_id',
    },
    {
      id: 'member_name',
      numeric: false,
      disablePadding: false,
      label: 'member_name',
    },
    {
      id: 'member_type',
      numeric: false,
      disablePadding: false,
      label: 'member_type',
    },
    {
      id: 'registration_date',
      numeric: false,
      disablePadding: false,
      label: 'registration_date',
    },
    {
      id: 'avg_response_time',
      numeric: true,
      disablePadding: false,
      label: 'avg_response_time',
    },
    {
      id: 'max_response_time',
      numeric: true,
      disablePadding: false,
      label: 'max_response_time',
    },
    {
      id: 'min_response_time',
      numeric: true,
      disablePadding: false,
      label: 'min_response_time',
    },
    {
      id: 'clearing_member_count',
      numeric: true,
      disablePadding: false,
      label: 'clearing_member_count',
    },
    {
      id: 'timestamp',
      numeric: false,
      disablePadding: false,
      label: 'timestamp',
    },
    {
      id: 'response_status',
      numeric: false,
      disablePadding: false,
      label: 'response_status',
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
};
  
return (
    <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}   
              align='center'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
    </TableHead>
);
}
  
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          },
        ]}
      >

        <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            Logged Data
        </Typography>
      </Toolbar>
    );
}

export function EnhancedTable({data}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('member_id');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  
    const visibleRows = React.useMemo(
      () =>
        [...data]
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [data, order, orderBy, page, rowsPerPage],
    );


  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar/>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>

                {visibleRows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.member_id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="center">{row.member_id}</TableCell>
                      <TableCell align="center">{row.member_name}</TableCell>
                      <TableCell align="center">{row.member_type}</TableCell>
                      <TableCell align="center">{row.registration_date}</TableCell>
                      <TableCell align="center">{row.avg_response_time}</TableCell>
                      <TableCell align="center">{row.max_response_time}</TableCell>
                      <TableCell align="center">{row.min_response_time}</TableCell>
                      <TableCell align="center">{row.clearing_member_count}</TableCell>
                      <TableCell align="center">{row.timestamp}</TableCell>
                      <TableCell align="center">{row.response_status}</TableCell>

                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    );
}

export default function View() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let {data, error} = await supabase
                .from('clearing_member')
                .select(`
                    member_id,
                    member_name,
                    member_type,
                    registration_date,
                    clearing_member_metrics (
                        avg_response_time,
                        max_response_time,
                        min_response_time,
                        clearing_member_count,
                        response_status,
                        timestamp
                    )
                `);

                if(error) throw error;
                data = data.map((ele) => {
                    return (
                        {
                            member_id: ele.member_id,
                            member_name: ele.member_name,
                            member_type: ele.member_type,
                            registration_date: ele.registration_date,
                            avg_response_time: ele.clearing_member_metrics.avg_response_time,
                            max_response_time: ele.clearing_member_metrics.max_response_time,
                            min_response_time: ele.clearing_member_metrics.min_response_time,
                            clearing_member_count: ele.clearing_member_metrics.clearing_member_count,
                            timestamp: ele.clearing_member_metrics.timestamp,
                            response_status: ele.clearing_member_metrics.response_status
                        }
                    )
                });

                setData(() => {
                    return data
                });
            }
            catch (error) {
                console.error('Error fetching Data : ', error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <EnhancedTable data={data}/>
        </div>
    );
}