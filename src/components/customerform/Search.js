import React, { Component } from "react";

class Search extends Component {
  state = {
    nik: ""
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSearch) this.props.onSearch(this.state);
  };
  onChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    return (
      <form
        className=" container"
        onSubmit={e => {
          this.onSubmit(e);
        }}
      >
        <div className="row align-items-center">
          <div className="col">
            <input
              className="form-control form-control-lg form-control-borderless"
              type="search"
              value={this.state.search}
              placeholder="Search by NIK"
              onChange={e => {
                this.onChange(e, "nik");
              }}
            />
          </div>

          <div className="col-auto">
            <button className="btn btn-lg btn-success" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Search;
