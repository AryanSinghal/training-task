import React, { Fragment } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import InfiniteScroll from 'react-infinite-scroller';
import * as querystring from 'querystring';
import { M3_SORT_API, SORT_COLUMNS } from '../../configs/constant';

class SortStatsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
      count: 10,
      items: []
    }
  }

  getSortStats = async () => {
    try {
      const { objectId } = this.props;
      const { skip, limit, items } = this.state;
      const url = M3_SORT_API + '?' + querystring.stringify({ skip, limit, objectId });
      const response = await fetch(url, {
        mode: 'cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (!response.ok) {
        throw { message: ' response.ok is false ' };
      }
      const { data } = await response.json();
      console.log(data.list, data);
      const item = [...items, ...data.list];
      this.setState({ items: item, skip: (skip + limit), limit, count: data.count });
      return data;
    }
    catch (err) {
      console.log(err.message || err);
    }
  }

  render() {
    const { open, onClose, objectId } = this.props;
    const { count, skip, limit, items } = this.state;
    return (
      <Dialog fullWidth open={open} onClose={onClose} maxWidth="md">
        <DialogTitle id="form-dialog-title" onClose={onClose}>
          <Grid container>
          <Grid item xs={6}>
              Sort Stats
            </Grid>
            <Grid item xs={6}>
            <div align="right">
              <CloseSharpIcon onClick={onClose} />
            </div>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sort Stats for Object Id: {objectId}
          </DialogContentText>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.getSortStats}
            hasMore={!!(Number(skip) + Number(limit) <= Number(count))}
            loader={<div className="loader">Loading ...</div>}
          >
            <TableContainer component={Paper} elevation={3}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {
                      SORT_COLUMNS && SORT_COLUMNS.length && SORT_COLUMNS.map((column) => (
                        <TableCell align="center"> {column.label || column.field} </TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    items.map((obj) => (
                      <TableRow key={obj.id}>
                        {
                          SORT_COLUMNS.map((column) => (
                            <Fragment key={obj.id + column.field + obj[column.field]}>
                              <TableCell align="center">
                                {obj[column.field]}
                              </TableCell>
                            </Fragment>
                          ))
                        }
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>

          </InfiniteScroll>

        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    );
  }
}

export default SortStatsDialog;
