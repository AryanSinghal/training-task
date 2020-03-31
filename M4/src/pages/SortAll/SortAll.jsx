import React from 'react';
import {
  Button, Grid, withStyles, InputLabel, NativeSelect,
} from '@material-ui/core';
import { M3_SORT_ALL_API } from '../../configs/constant';


const styles = () => ({
  buttonHeight: { lineHeight: '2.6' },
});

class SortAll extends React.Component {
  sortAll = async (objectId) => {
    const sortingAlgorithm = document.getElementById('sortingAlgorithm').value;
    console.log(objectId, sortingAlgorithm);
    try {
      const response = await fetch(M3_SORT_ALL_API, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ sortingAlgorithm }),
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

  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <InputLabel shrink>
              Sorting Algorithm
            </InputLabel>
            <NativeSelect
              id="sortingAlgorithm"
              name="sortingAlgorithm"
              fullWidth
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
              onClick={this.sortAll}
              color="primary"
              className={classes.buttonHeight}
              fullWidth
            >
              Sort All
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={this.sort}
              color="primary"
              className={classes.buttonHeight}
              fullWidth
            >
              Sort Unsorted
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default withStyles(styles)(SortAll);
