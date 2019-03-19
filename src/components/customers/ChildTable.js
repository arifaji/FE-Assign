import React, { Component } from "react";
// import "./TableStyle.css";

class ChildTable extends Component {
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
    for (let i = 0; i < model[0].length; i++) {
      let filter = model[0][i];
      if (filter.label !== undefined) {
        tableHead.push(filter.label);
      }
      // console.log(tableHead);
    }

    //-=> Searching For Table Body
    let IDnumber;
    let bodyRow = model.map(mod => {
      let column = [];
      let buttons = [];
      for (let i = 0; i < mod.length; i++) {
        console.log(mod[i].label);
        if (mod[i].label !== undefined) {
          console.log(mod[i].value);
          column.push(<td key={"row" + [mod[i].label]}>{mod[i].value}</td>);
        }
        if (mod[i].type === "idnumber") {
          IDnumber = mod[i].value;
          let modID = mod[i].value;
          buttons.push(
            <React.Fragment key={"button" + IDnumber}>
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
      }
      return (
        <tr key={"body " + IDnumber}>
          {column}
          {buttons}
        </tr>
      );
    });
    // for (let i = 0; i < model.length; i++) {
    //   //-=> Sample Looping 3x
    //   let arr = [];
    //   for (let j = 0; j < model[i].length; j++) {
    //     //-=> Sample Loop 8x
    //     let filter = model[i][j];
    //     console.log(filter.type);
    //     if (filter.label !== undefined) {
    //       arr.push(filter.value);
    //     }
    //   }
    //   tableBody = [...tableBody, arr];
    // }

    //-=> Searching For Table Button and value
    let valueButton = [];
    let tbAction = model.map(mod => {
      console.log(mod.length);
      for (let i = 0; i < mod.length; i++) {
        if (mod[i].type === "idnumber") {
          valueButton.push(mod[i].value);
        }
      }
    });
    console.log(valueButton);

    //-=> Head Structure
    let headRow = tableHead.map(label => {
      return <th key={"head" + label}>{label}</th>;
    });

    //-=> Button Structure
    let btnRow;

    //-=> body Structure
    // let bodyRow = tableBody.map(mapvalue => {
    //   console.log(mapvalue[0]);
    //   let column = [];
    //   if (mapvalue !== undefined) {
    //     for (let i = 0; i < mapvalue.length; i++) {
    //       for (let j = 0; j < mapvalue[i].length; j++) {
    //         column.push(<td>{mapvalue[i]}</td>);
    //       }
    //     }
    //   }
    //   return (
    //     <tr>
    //       {column}
    //       <th>{btnRow}</th>
    //     </tr>
    //   );
    // });

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
    // console.log(this.state.nama);
    return (
      <div className="container table-responsive">
        {/* <span>Table</span>
        <table className="table">{this.renderTable()}</table> */}

        {this.renderTable()}
      </div>
    );
  }
}

export default ChildTable;
