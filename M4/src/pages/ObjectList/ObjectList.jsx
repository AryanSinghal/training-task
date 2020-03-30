import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import * as querystring from 'querystring';
import {
  Table, TableBody, TableCell, TableContainer, NativeSelect,
  TableHead, TableRow, Paper, Button, Grid, withStyles, InputLabel,
} from '@material-ui/core';
import { TABLE_HEAD, M3_OBJECT_API, M3_SORT_API } from '../../configs/constant';
import SortStatsDialog from './SortStatsDialog';

const styles = () => ({
  buttonHeight: { lineHeight: '2.6' },
});

class ObjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      skip: 0,
      limit: 10,
      count: 10,
      open: false
    }
  }

  sort = async (objectId) => {
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
        throw { message: data }
      }
      console.log(data);
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
        throw { message: data }
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
        throw { message: ' response.ok is false ' };
      }
      const { data } = await response.json();
      console.log(data.objectData);
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const {
      items, skip, limit, count, open,
    } = this.state;
    console.log(skip, limit, count);
    return (
      <>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={!!(Number(skip) + Number(limit) <= Number(count))}
          loader={<div className="loader">Loading ...</div>}>
          <TableContainer component={Paper} elevation={3}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                    TABLE_HEAD && TABLE_HEAD.length && TABLE_HEAD.map((field) => (
                      <TableCell align="center"> {field} </TableCell>
                    ))
                  }
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  items.map((obj) => (
                    <TableRow key={obj.id}>
                      {
                        TABLE_HEAD.map((field) => (
                          <Fragment key={obj.id + field + obj[field]}>
                            <TableCell align="center">
                              {obj[field]}
                            </TableCell>
                          </Fragment>
                        ))
                      }
                      <Fragment key={obj.id + 'Action'}>
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
                              onClick={() => { this.sort(obj.id) }}
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
                              onClick={this.handleClickOpen}
                              fullWidth
                            >
                              Sort Stats
                            </Button>
                            <SortStatsDialog open={open} onClose={this.handleClose} />
                          </Grid>
                        </Grid>
                        <TableCell align="right">
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
