import React, { Component } from "react";
// import "./TableStyle.css";

class ChildTable extends Component {
  state = {
    nama: "arif"
  };

  handleEdits = model => {
    this.props.handleEdit(model);
  };
  handleDeletes = model => {
    this.props.handleDelete(model);
  };

  renderTable = () => {
    let model = this.props.model;
    console.log(model);
    let tableUI = model.map(m => {
      let IDnumber = m.data_id;

      let tbAction;
      if (IDnumber !== undefined) {
        tbAction = (
          <React.Fragment>
            <td style={{ textAlign: "right" }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => this.handleEdits(IDnumber)}
              >
                edit
              </button>
            </td>
            <td style={{ align: "left" }}>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => this.handleDeletes(IDnumber)}
              >
                delete
              </button>
            </td>
          </React.Fragment>
        );
      }
      return (
        <tr key={"tr" + IDnumber}>
          <td>{m.name}</td>
          <td>{m.pob}</td>
          <td>{m.dob}</td>
          <td>{m.nik}</td>
          <td>{m.mmn}</td>
          <td>{m.npwp}</td>
          <td>{m.mob}</td>
          {tbAction}
          {/* <td style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => this.handleEdits(IDnumber)}
            >
              edit
            </button>
          </td>
          <td style={{ align: "left" }}>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => this.handleDeletes(IDnumber)}
            >
              delete
            </button>
          </td> */}
        </tr>
      );
    });
    return tableUI;
  };

  render() {
    // console.log(this.state.nama);
    return (
      <div className="container table-responsive table-striped">
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Tempat Lahir</th>
              <th>Tanggal Lahir</th>
              <th>NIK</th>
              <th>Ibu Kandung</th>
              <th>NPWP</th>
              <th>No. HP</th>
              <th colSpan="2" style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default ChildTable;
