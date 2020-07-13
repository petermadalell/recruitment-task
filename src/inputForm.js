import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue ? props.defaultValue : "",
      isEmpty: true,
      isPristine: true,
      required: props.required ? true : false,
      label: props.label,
      nameid: props.nameid,
      type: props.type,
      pattern: props.pattern ? props.pattern : null,
    };
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleChange = this.props.onChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }

  //2. Each field should be validated itself on blur
  handleOnBlur(event) {
    this.setState({
      isEmpty: event.target.value === "" ? true : false,
      isPristine: false,
    });
  }

  render() {
    const {
      defaultValue,
      isEmpty,
      isPristine,
      required,
      label,
      nameid,
      type,
    } = this.state;
    return (
      <>
        {" "}
        {isEmpty && !isPristine && required ? (
          <TextField
            type={type}
            id={nameid}
            name={nameid}
            label={label}
            required={required}
            onBlur={this.handleOnBlur}
            onChange={this.handleChange}
            error
            helperText="Incorrect entry."
            defaultValue={defaultValue}
          />
        ) : (
          <TextField
            type={type}
            id={nameid}
            name={nameid}
            label={label}
            required={required}
            onBlur={this.handleOnBlur}
            onChange={this.handleChange}
            defaultValue={defaultValue}
          />
        )}
        {/* <div className="form-group">
        <label htmlFor={nameid}>
          {label} {required ? <span className="text-danger">*</span> : null}
        </label>
        <br />
        <TextField id={nameid} label={label}
          required={required}
          onBlur={this.handleOnBlur}
          onChange={this.handleChange} />
        <input
          type={type}
          placeholder={placeholder}
          id={nameid}
          name={nameid}
          className={`form-control${
            isEmpty && !isPristine && required ? " is-invalid" : ""
          }`}
          onBlur={this.handleOnBlur}
          onChange={this.handleChange}
          defaultValue={defaultValue}
          required={required}
        />
        {isEmpty && !isPristine && required ? (
          <small className="text-danger">
            <i>{label} is required.</i>
          </small>
        ) : null}
      </div> */}
      </>
    );
  }
}

export default InputForm;
