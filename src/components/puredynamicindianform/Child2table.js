import React, { Component } from "react";
import "./TableStyle.css";

class ChildTable extends Component {
  state = {
    nama: "arif"
  };

  handleEdits = model => {
    this.props.handleEdit(model);
  };

  renderTable = () => {
    let model = this.props.model;
    let tableUI = model.map(m => {
      console.log(m.name);
      return (
        <tr>
          <td>{m.name}</td>
          <td>{m.pob}</td>
          <td>{m.dob}</td>
          <td>{m.nik}</td>
          <td>{m.mmn}</td>
          <td>{m.npwp}</td>
          <td>{m.mob}</td>
          <td>
            <button onClick={() => this.handleEdits(m.customer_id)}>
              edit
            </button>
          </td>
        </tr>
      );
    });
    return tableUI;
  };

  render() {
    // console.log(this.state.nama);
    return (
      <div className="container">
        <table>
          <tr>
            <th>Nama</th>
            <th>Tempat Lahir</th>
            <th>Tanggal Lahir</th>
            <th>NIK</th>
            <th>Ibu Kandung</th>
            <th>NPWP</th>
            <th>No. HP</th>
            <th>Action</th>
          </tr>
          {this.renderTable()}
        </table>
      </div>
    );
  }
}

export default ChildTable;
