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

  onSort(event, sortKey) {
    this.props.onSort(sortKey);
  }

  renderTable = () => {
    let model = this.props.model;
    let bodyRow = [];
    let headRow;
    try {
      if (typeof model.form === "object") {
        // console.log(model);
        let tableHead = [];
        //-=> Searching For Header ===================================
        let headLong = model.form.rows[0].row[0].columns[0].column;
        for (let i = 0; i < headLong.length; i++) {
          // console.log(headLong[i].label);
          if (headLong[i].label !== undefined) {
            tableHead.push({
              label: headLong[i].label,
              keyfield: headLong[i].keyfield
            });
          }
        }
        //-=> Push ALL Label and Mapping for Head Structure =========
        headRow = tableHead.map(label => {
          return (
            <th
              onClick={e => this.onSort(e, label.keyfield)}
              key={"head" + label.keyfield}
            >
              {label.label}
            </th>
          );
        });

        //-=> Searching For Body ===================================
        let bodyLong = model.form.rows[0].row;
        console.log(JSON.stringify(bodyLong));
        for (let i = 1; i < bodyLong.length; i++) {
          //-=> EDIT YAA ============================================
          // let columnLong = bodyLong[i].columns[0].column[0];
          let columnLong = bodyLong[i].column[0];
          let columnFill = Object.values(columnLong);
          // console.log(JSON.stringify(columnFill));
          let colRow = [];
          //-=> PUSH FOR Text/List VALUE ==============================
          //-=> EDIT YAA ============================================
          for (let j = 0; j < columnFill.length - 1; j++) {
            // for (let j = 1; j < columnFill.length; j++) {
            colRow.push(<td key={"col" + columnFill[j]}>{columnFill[j]}</td>);
          }
          //-=> PUSH FOR BUTTON ACTION ================================
          for (let j = columnFill.length - 1; j < columnFill.length; j++) {
            colRow.push(
              <React.Fragment key={"button" + columnFill[j]}>
                <td style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => this.handleEdits(columnFill[j])}
                  >
                    edit
                  </button>
                </td>
                <td style={{ align: "left" }}>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDeletes(columnFill[j])}
                  >
                    delete
                  </button>
                </td>
              </React.Fragment>
            );
          }
          bodyRow.push(<tr key={"row" + i}>{colRow}</tr>);
        }
      }
    } catch (err) {
      console.log(err.message);
    }

    return (
      <React.Fragment>
        <thead>
          <tr>
            {headRow}
            <th colSpan="2" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>{bodyRow}</tbody>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="container table-responsive">
        <table className="table">{this.renderTable()}</table>
      </div>
    );
  }
}

export default ChildTable;
