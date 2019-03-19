import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navigator/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Post from "./components/Post";
import MyPdfViever from "./components/MyPdfViewer";
// import ParentForm from "./components/dynamicform/ParentForm";
// import ParentForm from "./components/olddynamicform/ParentForm";
// import ParentForm from "./components/puredynamicindianform/Parent";
// import ParentForm from "./components/customers/Parent";
import ParentForm from "./components/customerform/Parent";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/mypdf" component={MyPdfViever} />
            <Route path="/myform" component={ParentForm} />
            <Route path="/:post_id" component={Post} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
