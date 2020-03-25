import React from 'react';
import { TextField } from '@material-ui/core';
import { VALIDATION_SCHEMA } from '../../configs/constant';

class CreateObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      depth: '',
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

  getError = async (label, labelValue) => {
    const key = `${[label]}Error`;
    try {
      await VALIDATION_SCHEMA.validateAt(label, { [label]: labelValue });
      return '';
    } catch (error) {
      return error.errors;
    }
  }

  isDisabled = () => !!(this.hasErrors())

  handleCountChange = (event) => {
    const { value } = event.target;
    this.getError('count', value)
      .then((state) => this.setState({ countError: state, count: value }))
      .catch((stateError) => (
        this.setState({ countError: stateError, count: value })
      ));
  }

  handleDepthChange = (event) => {
    const { value } = event.target;
    this.getError('depth', value)
      .then((state) => this.setState({ depthError: state, depth: value }))
      .catch((stateError) => (
        this.setState({ depthError: stateError, depth: value })
      ));
  }


  render() {
    const { countError, depthError } = this.state;
    console.log(this.state);

    return (
      <>
        <TextField
          required
          id="root-key-count"
          label="Root Key Count"
          variant="outlined"
          helperText={countError}
          error={!!(countError)}
          onChange={this.handleCountChange}
          onBlur={this.handleCountChange}
        />
        <TextField
          required
          id="max-depth"
          label="Max Depth"
          variant="outlined"
          helperText={depthError}
          error={!!(depthError)}
          onChange={this.handleDepthChange}
          onBlur={this.handleDepthChange}
        />
      </>
    );
  }
}

export default CreateObject;
