import React, { Component } from "react";

function addCheckbox() {
  const { checkboxes } = this.state,
    label = this.refs.label.value;
  console.log(label);

  checkboxes.push({
    checked: true,
    label
  });

  this.setState({
    checkboxes
  });
}

function toggleCheckbox(index) {
  const { checkboxes } = this.state;

  checkboxes[index].checked = !checkboxes[index].checked;

  this.setState({
    checkboxes
  });
}

function renderCheckboxes() {
  const { checkboxes, filter } = this.state;

  return checkboxes
    .filter(
      checkbox =>
        filter === "ALL" ||
        (filter === "CHECKED" && checkbox.checked) ||
        (filter === "UNCHECKED" && !checkbox.checked)
    )
    .map((checkbox, index) => (
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkbox.checked}
            onChange={toggleCheckbox.bind(this, index)}
          />
          {checkbox.label}
        </label>
      </div>
    ));
}

function updateFilter(filter) {
  this.setState({
    filter
  });
}

class Jsbin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxes: [],
      filter: "ALL"
    };
  }

  render() {
    return (
      <div>
        {renderCheckboxes.call(this)}
        <input ref="label" type="text" />
        <button onClick={addCheckbox.bind(this)}>Add Checkbox</button>
        <div>
          <h4>Filters ({this.state.filter})</h4>
          <a href="#" onClick={updateFilter.bind(this, "ALL")}>
            ALL
          </a>
          &nbsp;|&nbsp;
          <a href="#" onClick={updateFilter.bind(this, "CHECKED")}>
            CHECKED
          </a>
          &nbsp;|&nbsp;
          <a href="#" onClick={updateFilter.bind(this, "UNCHECKED")}>
            UNCHECKED
          </a>
        </div>
      </div>
    );
  }
}

export default Jsbin;
