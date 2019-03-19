import React, { Component } from "react";

class ChildTableAPI extends Component {
  state = {};
  handleEdits = model => {
    this.props.handleEdit(model);
  };
  handleDeletes = model => {
    this.props.handleDelete(model);
  };
  renderTable = () => {
    let model = this.props.model;
    console.log(model);

    //-=> Searching For Table Head
    let tableHead = [];
    let bodyRow = [];
    if (typeof model[0].columns === "object") {
      //   console.log(model[0].columns[0].column);
      let headTab = model[0].columns[0].column;

      for (let i = 0; i < headTab.length; i++) {
        tableHead.push(headTab[i].label + []);
      }

      for (let i = 1; i < model.length; i++) {
        let arrBody = [];
        let arrBtn = [];
        // console.log(Object.values(model[i].columns[0].column[0]));
        let bodymap = Object.values(model[i].columns[0].column[0]);
        for (let i = 1; i < bodymap.length; i++) {
          arrBody.push(<td key={"row" + bodymap[i]}>{bodymap[i]}</td>);
        }
        for (let i = 0; i < 1; i++) {
          //   console.log(bodymap[0]);
          let modID = bodymap[0];
          arrBtn.push(
            <React.Fragment>
              <td style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => this.handleEdits(modID)}
                >
                  edit
                </button>
              </td>
              <td style={{ align: "left" }}>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => this.handleDeletes(modID)}
                >
                  delete
                </button>
              </td>
            </React.Fragment>
          );
        }
        bodyRow.push(
          <tr>
            {arrBody}
            {arrBtn}
          </tr>
        );
      }
    }
    // let bodyRow = <tr key={"body " + IDnumber}>{tableBody}</tr>;

    // let bodyRow = { tableBody };
    //-=> Head Structure
    let headRow = tableHead.map(label => {
      return <th key={"head" + label}>{label}</th>;
    });

    //-=> Searching For Table Body
    let IDnumber;

    return (
      <table className="table">
        <thead>
          <tr>
            {headRow}
            <th colSpan="2" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>{bodyRow}</tbody>
      </table>
    );
  };
  render() {
    return (
      <div className="container table-responsive">{this.renderTable()}</div>
    );
  }
}

export default ChildTableAPI;
