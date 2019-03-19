import React, { Component } from "react";
import "./Style.css";
import NumberFormat from "react-number-format";

class DynamicForm extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  onChange = (e, key, type = "single") => {
    console.log(`${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      let found = this.state[key]
        ? this.state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = this.state[key].filter(d => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        this.setState({
          [key]: [e.target.value, ...this.state[key]]
        });
      }
    }
  };

  renderForm = () => {
    let model = this.props.model;
    let defaultValues = this.props.defaultValues;

    let formUI = model.map(m => {
      let key = m.keyfield;
      let type = m.type || "text";
      let props = m.props || {};
      let name = m.name;
      let value = m.value;
      let required = m.required;
      let options = m.options;

      let target = key;
      value = this.state[target];

      let input = (
        <input
          required={required}
          {...props}
          className="form-input"
          type={type}
          key={key}
          name={name}
          value={value}
          onChange={e => {
            this.onChange(e, target);
          }}
        />
      );

      if (type == "number") {
        input = (
          <NumberFormat
            required={required}
            {...props}
            className="form-input"
            isNumericString={true}
            allowNegative={false}
            decimalSeparator={false}
            key={key}
            name={name}
            value={value}
            onChange={e => {
              this.onChange(e, target);
            }}
          />
        );
      }

      if (type == "radio") {
        input = m.options.map(o => {
          let checked = o.value == value;
          return (
            <React.Fragment key={"fr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                onChange={e => {
                  this.onChange(e, o.name);
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }

      if (type == "select") {
        let requireds;
        if (m.required + [] === "true" || m.required === true) {
          requireds = true;
        }
        input = options.map(o => {
          console.log("select: ", o.value, value);
          return (
            <option
              {...props}
              className="form-input"
              key={o.key}
              value={o.value}
            >
              {o.label}
            </option>
          );
        });

        // console.log("Select default: ", value);
        input = (
          <select
            defaultValue=""
            required={requireds}
            onChange={e => {
              this.onChange(e, m.key);
            }}
          >
            <option value="" disabled>
              {"-= Select " + m.label + " =-"}
            </option>
            {input}
          </select>
        );
      }
      //End If

      if (type == "checkbox") {
        input = m.options.map(o => {
          //let checked = o.value == value;
          let checked = false;
          if (value && value.length > 0) {
            checked = value.indexOf(o.value) > -1 ? true : false;
          }
          console.log("Checkbox: ", checked);
          return (
            <React.Fragment key={"cfr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                // onChange={e => {
                //   this.onChange(e, m.key, "multiple");
                // }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });

        input = <div className="form-group-checkbox">{input}</div>;
      }

      return (
        <React.Fragment>
          {/* <div key={"g" + key} className="form-group"> */}
          <label
            key={"g" + key}
            className="form-label"
            key={"l" + key}
            htmlFor={key}
          >
            <b>{m.label}</b>
          </label>
          {input}
          {/* </div> */}
        </React.Fragment>
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <React.Fragment>
        {/* <div className={this.props.className} > */}
        <div className="container">
          <h1>{title}</h1>
          <form
            className="dynamic-form"
            onSubmit={e => {
              this.onSubmit(e);
            }}
          >
            {this.renderForm()}
            <div className="form-group">
              <button type="submit" className="registerbtn">
                Submit!
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default DynamicForm;
