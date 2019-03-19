import React, { Component } from "react";
import "./NavStyle.scss";

class Navbar extends Component {
  state = {
    state: {
      showNav: false
    }
  };

  openNavClick = e => {
    e.preventDefault();
    this.openNav();
  };

  closeNavClick = e => {
    e.preventDefault();
    this.closeNav();
  };

  openNav = () => {
    this.setState({
      showNav: true
    });

    document.getElementById("root").style.marginLeft = "250px";

    document.addEventListener("keydown", this.handleEscKey);
  };
  closeNav = () => {
    this.setState({
      showNav: false
    });
    document.getElementById("root").style.marginLeft = "0px";
    document.removeEventListener("keydown", this.handleEscKey);
  };

  handleEscKey = e => {
    if (e.key === "Escape") {
      this.closeNav();
    }
  };

  render() {
    const { showNav } = this.state;
    // let navCoverStyle = { width: showNav ? "100%" : "0" };
    let sideNavStyle = { width: showNav ? "250px" : "0" };
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-5">
          <div className="container">
            <a className="navbar-brand" onClick={this.openNavClick} href="/">
              &#9776; ReactJS & Bootstrap
            </a>
            <div className="navbar-expand mr-auto">
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="/">
                  Home
                </a>
                <a className="nav-item nav-link" href="/about">
                  About
                </a>
                <a className="nav-item nav-link" href="/contact">
                  Contact
                </a>
                <a className="nav-item nav-link" href="/mypdf">
                  My PDF
                </a>
                <a className="nav-item nav-link" href="/myform">
                  Dynamic From
                </a>
              </div>
            </div>
            {/* <div className="navbar-expand ml-auto navbar-nav">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="https://github.com/medasaki">
                <i className="fa fa-github" />
              </a>
              <a
                className="nav-item nav-link"
                href="https://twitter.com/medasaki"
              >
                <i className="fa fa-twitter" />
              </a>
            </div>
          </div> */}
          </div>
        </nav>

        <div name="side-nav" className="side-nav" style={sideNavStyle}>
          <a href="/" onClick={this.closeNavClick} className="close-nav">
            &times;
          </a>
          <a href="/">Menu 1</a>
          <a href="/">Menu 2</a>
          <a href="/">Menu 3</a>
          <a href="/">Menu 4</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
