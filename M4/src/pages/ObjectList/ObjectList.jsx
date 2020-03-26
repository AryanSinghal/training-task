import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Grid, withStyles,
} from '@material-ui/core';

const styles = () => ({
  buttonHeight: { lineHeight: '2.6' },
});

class ObjectList extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchData = async () => {
    try {
      console.log('inside fetch data')
      const url = 'http://localhost:9003/api/object?skip=0&limit=2';
      const response = await fetch(url, {
        mode: 'no-cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   "rootKeyCount": '2',
        //   "maxDepth": '3'
        // }),
      });
      console.log('resp>>>>>>>>', response);
      console.log('data>>>>', await response.json())
    } catch (err) {
      console.log('inside catch>>>>', err);
    }
  }
  render() {
    const { classes } = this.props;
    console.log(classes);

    const items = [
      {
        "_id": "5e7c87773064c25509d38c0d",
        "keyCount": 2,
        "depth": 2,
        "size": 142,
        "generationTime": 0
      },
      {
        "_id": "5e7c87773064c255",
        "keyCount": 2,
        "depth": 2,
        "size": 1422,
        "generationTime": 20
      }
    ];
    this.fetchData();
    return (
      <>
        {/* <InfiniteScroll
          pageStart={0}
          // loadMore={loadFunc}
          hasMore={true || false}
          loader={<div className="loader">Loading ...</div>}>
        </InfiniteScroll> */}
        <TableContainer component={Paper} elevation={3}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">keyCount</TableCell>
                <TableCell align="center">depth</TableCell>
                <TableCell align="center">size</TableCell>
                <TableCell align="center">generationTime</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                items && items.length && items.map((obj) => (
                  <TableRow key={obj._id}>
                    {
                      Object.keys(obj).map((field) => (
                        <Fragment key={obj._id + field + obj[field]}>
                          <TableCell align="center">
                            {obj[field]}
                          </TableCell>
                        </Fragment>
                      ))
                    }
                    <Fragment key={obj._id + 'Action'}>
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
      </>
    );
  }
};

export default withStyles(styles)(ObjectList);
