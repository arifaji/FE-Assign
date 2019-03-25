import React, { Component } from "react";
// import "./TableStyle.css";

class ChildTable extends Component {
  state = {
    data: undefined,
    orderBy: {}
  };

  handleEdits = model => {
    this.props.handleEdit(model);
  };
  handleDeletes = model => {
    this.props.handleDelete(model);
  };

  onSort(key) {
    // alert("Sort by : " + key);
    // console.log(key);
    const { data, orderBy } = this.state;
    // small medium enterprise hari kamis pago kumpul jam 8
    if (orderBy[key] === "asc") {
      this.setState({
        data: data.sort(this.predicateBy(key, "desc")),
        orderBy: { [key]: "desc" }
      });
    } else {
      this.setState({
        data: data.sort(this.predicateBy(key, "asc")),
        orderBy: { [key]: "asc" }
      });
    }
  }

  predicateBy(prop, order) {
    if (order === "asc") {
      return function(a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    } else if (order === "desc") {
      return function(a, b) {
        if (a[prop] < b[prop]) {
          return 1;
        } else if (a[prop] > b[prop]) {
          return -1;
        }
        return 0;
      };
    }
  }

  renderTable = () => {
    let model = this.props.model;
    let bodyRow = [];
    let headRow;
    let headLong;

    try {
      if (typeof model.form === "object") {
        // console.log(model);
        let tableHead = [];
        //-=> Searching For Header ===================================
        headLong = model.form.rows[0].row[0].columns[0].column;
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
              onClick={() => this.onSort(label.keyfield)}
              key={"head" + label.keyfield}
            >
              {label.label}
            </th>
          );
        });

        // //-=> Searching For Body ===================================
        let bodyLong = model.form.rows[0].row;
        // console.log(JSON.stringify(bodyLong));
        let arrBody = [];
        for (let i = 1; i < bodyLong.length; i++) {
          // console.log(JSON.stringify(bodyLong[i].column));
          arrBody.push(bodyLong[i].column[0]);
        }

        const { data } = this.state;
        if (data === undefined) {
          this.setState({
            data: arrBody
          });
        }

        if (data !== undefined) {
          let keys = Object.keys(data[0]);
          data.map(row => {
            let rows = [];
            for (let i = 0; i < keys.length; i++) {
              // console.log(Object.keys(row[keys[i]]));
              if (keys[i] !== "data_id") {
                rows.push(<td key={"rows" + keys[i]}>{row[keys[i]]}</td>);
              }
              if (keys[i] === "data_id") {
                let dataID = row[keys[i]];
                rows.push(
                  <React.Fragment key={"button" + dataID}>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => this.handleEdits(dataID)}
                      >
                        edit
                      </button>
                    </td>
                    <td style={{ align: "left" }}>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDeletes(dataID)}
                      >
                        delete
                      </button>
                    </td>
                  </React.Fragment>
                );
              }
            }

            return bodyRow.push(
              <tr
                key={
                  typeof (row.data_id + []) === "string"
                    ? "key" + row.data_id
                    : "key"
                }
              >
                {rows}
              </tr>
            );
          });
        }
      }
    } catch (error) {
      console.log(error.message);
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
        <tbody>
          {bodyRow + [] === "" ? (
            <tr>
              <td colSpan={headLong.length + 1} style={{ textAlign: "center" }}>
                No Result
              </td>
            </tr>
          ) : (
            bodyRow
          )}
        </tbody>
      </React.Fragment>
    );
  };

  render() {
    const { model } = this.props;
    return (
      <React.Fragment>
        {typeof model.form.rows[0].row[0].columns[0].column === "object" && (
          <div className="container table-responsive">
            <table className="table">{this.renderTable()}</table>
            <button onClick={() => this.handleEdits()} className="btn">
              tambah
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ChildTable;
