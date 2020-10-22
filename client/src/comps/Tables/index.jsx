import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Button, Container } from '@material-ui/core';

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, headCells, onRequestSort, actions } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ border: '1px solid #F9A639' }}>
        {headCells.map(headCell => {
          const cols = Object.keys(headCell).indexOf('label')
          const colName = Object.values(headCell)[cols]

          return (
            <TableCell
              key={headCell.id}
              align="left"
              padding='default'
              sortDirection={orderBy === headCell.id ? order : false}
              style={{ border: 'none' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                style={{ color: '#F9A639' }}
              >
                {colName}
              </TableSortLabel>
            </TableCell>
          )
        }
        )}
        {
          actions && (
            <TableCell
              align="right"
              padding='default'
            >
              <TableSortLabel
                style={{ color: '#F9A639', align: "right" }}
              >
                Ações
              </TableSortLabel>
            </TableCell>
          )
        }
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: '#F9A639',
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: '#F9A639',
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = ({ title, style, btnAddLink, btnAddLabel }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={classes.root}
      style={{ overflow: 'hidden' }}
    >
      <Typography
        className={classes.title + ' tabela-titulo'}
        variant="h6"
        component="h2"
        id="tableTitle"
        style={style}
      >
        {
          btnAddLink && (
            <div style={{ float: 'right' }}>
              <Link to={btnAddLink}><Button variant="contained" color="primary">{btnAddLabel}</Button></Link>
            </div>
          )
        }
        {title}
      </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '10px auto',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    backgroundColor: 'transparent',
    color: '#F9A639'
  },
  table: {
    minWidth: 750,
  },
}));

export default function EnhancedTable({ headCells, list, title, actions, link = "", linkMoreCampo = "id", btnAddLink = "", btnAddLabel = "" }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name_enterprise');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Container center="true" maxWidth="lg">

          <EnhancedTableToolbar
            title={title}
            style={{ color: '#F9A639' }}
            btnAddLink={btnAddLink}
            btnAddLabel={btnAddLabel}
          />

          <TableContainer style={{ border: 'none' }}>
            <Table
              className={classes.table}
              size="medium"
              aria-label="enhanced table"
              style={{ border: 'none' }}
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                headCells={headCells}
                onRequestSort={handleRequestSort}
                rowCount={list.length}
                actions={actions}
                style={{ color: '#F9A639' }}
              />

              <TableBody>
                {stableSort(list, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const hc = headCells.map(nameCell => ({
                      cell: nameCell.id
                    }))
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={`${row[hc[0].cell]}-${index}`}
                        className="table-pointer-onclick"
                        style={{ color: '#F9A639', border: '1px solid #F9A639' }}
                        onClick={() => {
                          if (link) {
                            window.location.href = "" + link + "" + row[linkMoreCampo]
                          }
                        }}
                      >
                        {
                          hc.map(name => {
                            let c = '-';
                            const s = name.cell.split('.');

                            if (s.length === 1) c = row[s[0]];
                            else c = row[s[0]][s[1]];

                            return (
                              <TableCell padding="default" key={name.cell} style={{ color: '#F9A639', border: 'none' }}>
                                {c}
                              </TableCell>
                            )
                          })
                        }
                        {
                          actions && (
                            <TableCell align="right">
                              {actions.map(action => {
                                return (
                                  <Tooltip title={action.tooltip} key={action.action}>
                                    {
                                      action.type === 'link' ? (
                                        <> {
                                          action.target ? (
                                            <a href={`${action.action}${row[action.actionCampo]}`} target={action.target} title={action.tooltip}>
                                              <IconButton aria-label="delete">{action.btn}</IconButton>
                                            </a>
                                          ) : (
                                              <Link to={`${action.action}${row[action.actionCampo]}`} title={action.tooltip}>
                                                <IconButton aria-label="delete">{action.btn}</IconButton>
                                              </Link>
                                            )
                                        } </>
                                      ) : (
                                          <IconButton aria-label="delete" onClick={() => { action.action(row[action.actionCampo], action.actionShelf) }} data={row[action.actionCampo]} title={action.tooltip}>{action.btn}</IconButton>
                                        )
                                    }
                                  </Tooltip>
                                )
                              })}
                            </TableCell>
                          )
                        }
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            style={{ color: '#F9A639' }}
            labelRowsPerPage="Linhas:"
          />
        </Container>
      </Paper>

    </div>
  );
}
