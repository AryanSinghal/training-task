import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import * as querystring from 'querystring';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Grid, withStyles,
} from '@material-ui/core';
import { TABLE_HEAD } from '../../configs/constant';

const styles = () => ({
  buttonHeight: { lineHeight: '2.6' },
});

class ObjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      skip: 0,
      limit: 2,
      count: 2
    }
  }

  fetchData = async (skip, limit) => {
    try {
      const { items } = this.state;
      console.log('inside fetch data')
      const url = 'http://localhost:9003/api/object' + '?' + querystring.stringify({ skip, limit });
      const response = await fetch(url, {
        mode: 'cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if(! response.ok){
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

  render() {
    const { classes } = this.props;
    const { items, skip, limit, count } = this.state;
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
                  items && items.length && items.map((obj) => (
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
                          <Grid item xs={6}>
                            <Button variant="contained" color="primary" className={classes.buttonHeight} fullWidth>
                              Sort
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button variant="contained" color="primary" className={classes.buttonHeight} fullWidth>
                              Sort Stats
                            </Button>
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
