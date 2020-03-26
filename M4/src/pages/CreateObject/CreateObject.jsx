import React from 'react';
import { TextField, Grid, Button } from '@material-ui/core';

class CreateObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      depth: 0,
      depthError: '',
      countError: ''
    };
  }

  hasErrors = () => {
    const {
      count, depth, depthError, countError,
    } = this.state;
    return (!(count && depth)
      || (depthError || countError));
  }

  isDisabled = () => !!(this.hasErrors())

  getError = (field, value) => {
    if (value > 0 && value <= 500) return '';
    if (value === '' || value === undefined || value === null) return field + ' is required';
    if (value < 0 || value > 500) return field + ' should be between 0 and 500';
    if (Math.floor(value) !== value) return field + ' must be integer';
    return 'Must be Number';
  }

  handleCountChange = (event) => {
    const { value } = event.target;
    this.setState({ countError: this.getError('Root Key Count', value), count: value });
  }

  handleDepthChange = (event) => {
    const { value } = event.target;
    this.setState({ depthError: this.getError('Max Depth', value), depth: value });
  }

  render() {
    const { countError, depthError } = this.state;
    console.log(this.state);

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              required
              fullWidth
              size="small"
              id="root-key-count"
              label="Root Key Count"
              variant="outlined"
              helperText={countError}
              error={!!(countError)}
              onChange={this.handleCountChange}
              onBlur={this.handleCountChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              fullWidth
              size="small"
              id="max-depth"
              label="Max Depth"
              variant="outlined"
              helperText={depthError}
              error={!!(depthError)}
              onChange={this.handleDepthChange}
              onBlur={this.handleDepthChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={this.isDisabled()}
            >
              Generate Object
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default CreateObject;
