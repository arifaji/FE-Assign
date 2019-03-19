import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    return (
      <form className=" container">
        <div className="row align-items-center">
          <div className="col">
            <input
              className="form-control form-control-lg form-control-borderless"
              type="search"
              placeholder="Search topics or keywords"
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
