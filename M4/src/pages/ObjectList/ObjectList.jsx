import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import * as querystring from 'querystring';
import {
  Table, TableBody, TableCell, TableContainer, NativeSelect,
  TableHead, TableRow, Paper, Button, Grid, withStyles, InputLabel,
} from '@material-ui/core';
import {
  OBJECT_COLUMNS, M3_OBJECT_API, M3_SORT_API, SKIP, LIMIT, COUNT,
} from '../../configs/constant';
import SortStatsDialog from './SortStatsDialog';

const styles = () => ({
  buttonHeight: { lineHeight: '2.6' },
  color: { backgroundColor: 'whitesmoke' },
  heading: { fontWeight: 'bold' },
});

class ObjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      skip: SKIP,
      limit: LIMIT,
      count: COUNT,
      open: false,
      objectId: '0'
    }
  }

  sort = async (objectId, index) => {
    const { items } = this.state;
    const sortingAlgorithm = document.getElementById(objectId + 'sortingAlgorithm').value;
    console.log(objectId, sortingAlgorithm);
    try {
      const response = await fetch(M3_SORT_API, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ sortingAlgorithm, objectId }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }
      const item = items[index];
      item.sortDuration = data.data.sortDuration;
      items[index] = item;
      this.setState({ items: [...items] });
    } catch (error) {
      console.log(error.message || error);
    }
  }

  sortStats = async (objectId) => {
    const sortingAlgorithm = document.getElementById(objectId + 'sortingAlgorithm').value;
    console.log(objectId, sortingAlgorithm);
    try {
      const response = await fetch(M3_SORT_API, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message || error);
    }
  }

  fetchData = async (skip, limit) => {
    try {
      const { items } = this.state;
      const url = M3_OBJECT_API + '?' + querystring.stringify({ skip, limit });
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
        throw new Error('response is not');
      }
      const { data } = await response.json();
      const item = [...items, ...data.objectData];
      this.setState({ items: item, skip: (skip + limit), limit, count: data.Count });
      return data.objectData;
    }
    catch (err) {
      console.log(err.message);
    }
  }

  loadFunc = () => {
    const { skip, limit } = this.state;
    this.fetchData(skip, limit);
  }

  handleClickOpen = (objectId) => {
    this.setState({ open: true, objectId });
  };

  handleClose = () => {
    this.setState({ open: false, objectId: '0' });
  };

  render() {
    const { classes } = this.props;
    const {
      items, skip, limit, count, open, objectId,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={!!(Number(skip) + Number(limit) <= Number(count))}
          loader={<div key="loader">Loading ...</div>}>
          <TableContainer component={Paper} className={classes.color} elevation={3}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                    OBJECT_COLUMNS && OBJECT_COLUMNS.length && OBJECT_COLUMNS.map((column) => (
                      <Fragment key={column.field}>
                        <TableCell align="center" className={classes.heading}> {column.label} </TableCell>
                      </Fragment>
                    ))
                  }
                  <TableCell align="center" className={classes.heading}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  items.map((obj, index) => (
                    <TableRow key={obj.id}>
                      {
                        OBJECT_COLUMNS.map((column) => (
                          <Fragment key={obj.id + column.field + obj[column.field]}>
                            <TableCell id={obj.id + column.field} align="center">
                              {(obj[column.field] !== undefined) ? obj[column.field] : 'NA'}
                            </TableCell>
                          </Fragment>
                        ))
                      }
                      <Fragment key={obj.id + 'Action'}>
                        <TableCell>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <InputLabel shrink>
                                Sorting Algorithm
                            </InputLabel>
                              <NativeSelect
                                id={obj.id + 'sortingAlgorithm'}
                                name="sortingAlgorithm"
                              >
                                <option value="" disabled>Select</option>
                                <option value="defaultSort">Default Sort</option>
                                <option value="selectionSort">Selection Sort</option>
                                <option value="bubbleSort">Bubble Sort</option>
                                <option value="quickSort">Quick Sort</option>
                              </NativeSelect>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="contained"
                                onClick={() => { this.sort(obj.id, index) }}
                                color="primary"
                                className={classes.buttonHeight}
                                fullWidth
                              >
                                Sort
                            </Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.buttonHeight}
                                onClick={() => { this.handleClickOpen(obj.id) }}
                                fullWidth
                              >
                                Sort Stats
                            </Button>
                              <SortStatsDialog
                                open={open}
                                onClose={this.handleClose}
                                objectId={objectId}
                              />
                            </Grid>
                          </Grid>
                        </TableCell>
                      </Fragment>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
      </>
    );
  }
};

export default withStyles(styles)(ObjectList);
