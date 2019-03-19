import React, { Component } from "react";
// import axios from "axios";

class App extends Component {
  state = {
    isMJ: false,
    isJB: false,
    isDrake: false
  };

  toggleChangeMJ = () => {
    this.setState(prevState => ({
      isMJ: !prevState.isMJ
    }));
  };

  toggleChangeJB = () => {
    this.setState(prevState => ({
      isJB: !prevState.isJB
    }));
  };

  toggleChangeDrake = () => {
    console.log(this.state.isDrake);
    this.setState(prevState => ({
      isDrake: !prevState.isDrake
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    let arr = [];
    for (var key in this.state) {
      if (this.state[key] === true) {
        arr.push(key);
      }
    }
    // alert(arr);

    let data = {
      check: arr.toString()
    };

    alert(JSON.stringify(data));

    // axios
    //   .post("http://localhost:4000/checks/add", data)
    //   .then(res => console.log(res.data));
  };

  render() {
    return (
      <div className="container">
        <h2>Save the multiple checkbox values in React js</h2>
        <hr />
        <form onSubmit={this.onSubmit}>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.isMJ}
                onChange={this.toggleChangeMJ}
                className="form-check-input"
              />
              MJ
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.isJB}
                onChange={this.toggleChangeJB}
                className="form-check-input"
              />
              JB
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.isDrake}
                onChange={this.toggleChangeDrake}
                className="form-check-input"
              />
              Drake
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
