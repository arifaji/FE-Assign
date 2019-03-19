import React, { Component } from "react";

class SortTable extends Component {
  state = {
    data: [
      { id: "1", nama: "Labby", nik: "077", alamat: "Jakarta" },
      { id: "3", nama: "Aisha", nik: "091", alamat: "Solo" },
      { id: "2", nama: "Eve", nik: "003", alamat: "Bandung" }
    ],
    orderBy: {}
  };

  onSort(key) {
    // alert("Sort by : " + key);
    console.log(key);
    const { data, orderBy } = this.state;
    {
      orderBy[key] === "asc"
        ? this.setState({
            data: data.sort(this.predicateBy(key, "desc")),
            orderBy: { [key]: "desc" }
          })
        : this.setState({
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

  renderBody = () => {
    const { data } = this.state;
    let render = [];
    let keys = Object.keys(data[0]);
    data.map(row => {
      let rows = [];
      for (let i = 0; i < keys.length; i++) {
        rows.push(<td>{row[keys[i]]}</td>);
      }
      render.push(<tr>{rows}</tr>);
    });
    return render;
  };
  render() {
    return (
      <div className="container table">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.onSort("id")}>#</th>
              <th onClick={() => this.onSort("nama")}>Nama</th>
              <th onClick={() => this.onSort("nik")}>Nik</th>
              <th onClick={() => this.onSort("alamat")}>Alamat</th>
            </tr>
          </thead>
          <tbody>{this.renderBody()}</tbody>
        </table>
      </div>
    );
  }
}

export default SortTable;
