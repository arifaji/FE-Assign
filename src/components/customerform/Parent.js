import React, { Component } from "react";

import DynamicForm from "./ChildForm";
import DynamicTable from "./sort/ChildTable";
import modelFormXML from "./modelForm.xml";
import modelTableXML from "./modelTable.xml";
import Search from "./Search";

class ParentForm extends Component {
  state = {
    dataID: "",
    modelFor: "",
    renderForm: false,
    renderSearch: "",
    renderTable: false,
    fetchFormXML: "",
    sendFormXML: "",
    fetchTableXML: "",
    sendTableXML: "",
    title: "",
    direction: {
      name: "asc"
    },
    navigate: ""
  };

  handleEdit = async model => {
    this.setState({ dataID: model });

    //let title = this.state.title;

    const { title } = this.state;

    this.handleSwitchForm(title, model);
  };

  handleDelete = async dataID => {
    const { title } = this.state;
    var r = window.confirm("Delete data with ID : " + dataID + " ?");
    if (r === true) {
      this.handleFormUnmount("renderTable");
      alert("Data ID " + dataID + " deleted");
      console.log(dataID);
      let url = "http://10.10.28.173:3000/api/customer/" + dataID + [];

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      // .then(res => res.json())
      // .then(response => {
      //   console.log("Status:", JSON.stringify(response));
      //   if (response.message === "Success") {
      //     alert(response.message);
      //   } else {
      //     alert("Failed");
      //   }
      // })
      // .then(window.location.reload());
      this.handleSwitch(title);
      this.handleFormUnmount("renderForm");
    } else {
    }
    // this.handleFormMount("renderTable");
  };

  handleFormUnmount = key => {
    this.setState({ [key]: false });
  };

  handleFormMount = key => {
    this.setState({ [key]: true });
  };

  onSort(sortKey) {
    alert("Sort by : " + sortKey);
    const { sendTableXML } = this.state;
    console.log(sendTableXML);
    // this.setState({
    //   sendTableXML: sendTableXML.sort((a, b) =>
    //     this.state.direction[sortKey] === "asc"
    //       ? parseFloat(a[sortKey]) - parseFloat(b[sortKey])
    //       : parseFloat(b[sortKey]) - parseFloat(a[sortKey])
    //   ),
    //   direction: {
    //     [sortKey]: this.state.direction[sortKey] === "asc" ? "desc" : "asc"
    //   }
    // });
  }

  onSubmit = async model => {
    alert(JSON.stringify(model));
    this.handleFormUnmount("renderTable");
    console.log(this.state.dataID);
    const { dataID, title, modelFor } = this.state;
    if (typeof this.state.dataID === "object") {
      let url = "http://10.10.18.199:5000/api/customer/" + dataID;

      await fetch(url, {
        method: "PUT",
        body: JSON.stringify(model),
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.handleSwitch(title);
      this.onSearch(title);
      this.handleFormUnmount("renderForm");
    } else {
      let url = "http://10.10.18.199:5000/api/customer/" + title;

      await fetch(url, {
        method: "POST",
        body: JSON.stringify(model),
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.handleSwitch(modelFor);
      this.onSearch(title);
      this.handleFormUnmount("renderForm");
    }
  };

  //Component DID MOUNT
  componentDidMount() {
    // this.getXML();
  }

  //How to convert XML to JSON then generate become a Dynamic Form
  getXML = async () => {
    let parseXML = require("xml2js");

    //-=> Fetch API / xml untuk Form (modelFormXML) / (newformat) CUSTOMER_FORM
    // let newformat = "http://10.10.18.199:5000/api/Form%20SME/customer";
    await fetch(modelFormXML)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchFormXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchFormXML = this.state.fetchFormXML;
    let sendFormXML;

    try {
      parseXML.parseString(fetchFormXML, function(err, result) {
        sendFormXML = result;
      });
      this.setState({
        sendFormXML
      });
    } catch (err) {
      alert(err.message);
    }

    //-=> Fetch API / xml untuk Form (modelTableXML) / () CUSTOMER_TABLE
    const tableAPI = "http://10.10.18.199:5000/api/SME/List";
    await fetch(modelTableXML)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchTableXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchTableXML = this.state.fetchTableXML;
    let sendTableXML;
    try {
      parseXML.parseString(fetchTableXML, function(err, result) {
        sendTableXML = result;
      });
      this.setState({
        sendTableXML
      });
    } catch (err) {
      alert(err.message);
    }
  };

  handleSwitch = async (model, value) => {
    this.setState({ modelFor: model });
    this.handleFormUnmount("renderSearch");
    let parseXML = require("xml2js");

    //-=> Fetch API / xml untuk Form (modelTableXML) / () CUSTOMER_TABLE
    const tableAPI = "http://10.10.18.199:5000/api/" + model + "/List";
    await fetch(tableAPI)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchTableXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchTableXML = this.state.fetchTableXML;
    let sendTableXML;
    try {
      parseXML.parseString(fetchTableXML, function(err, result) {
        sendTableXML = result;
      });
      this.setState({
        sendTableXML
      });
    } catch (err) {
      alert(err.message);
    }
    this.handleFormMount("renderSearch");
    this.setState({
      title: model
    });
  };

  handleSwitchForm = async (model, value) => {
    this.handleFormUnmount("renderForm");
    let parseXML = require("xml2js");

    //-=> Fetch API / xml untuk Form (modelFormXML) / (newformat) CUSTOMER_FORM
    let newformat = "http://10.10.18.199:5000/api/" + model + "/Form/" + value;
    await fetch(newformat)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchFormXML: response });
      })
      .catch(err => {
        alert("fetch", err);
      });
    let fetchFormXML = this.state.fetchFormXML;
    let sendFormXML;

    try {
      parseXML.parseString(fetchFormXML, function(err, result) {
        sendFormXML = result;
      });
      this.setState({
        sendFormXML
      });
    } catch (err) {
      alert(err.message);
    }
    this.handleFormMount("renderForm");
  };

  onSearch = async model => {
    this.handleFormUnmount("renderTable");
    let parseXML = require("xml2js");
    const { modelFor } = this.state;

    //-=> Fetch API / xml untuk Form (modelTableXML) / () CUSTOMER_TABLE
    const searchAPI =
      "http://10.10.18.199:5000/api/search/" + modelFor + "/List/";
    await fetch(searchAPI, {
      method: "POST",
      body: JSON.stringify(model),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchTableXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchTableXML = this.state.fetchTableXML;
    let sendTableXML;
    try {
      parseXML.parseString(fetchTableXML, function(err, result) {
        sendTableXML = result;
      });
      this.setState({
        sendTableXML
      });
    } catch (err) {
      alert(err.message);
    }
    this.handleFormMount("renderTable");
  };

  onChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };
  onNavigate = key => {
    // alert("Navigate by : " + key);
    if (key !== "") {
      // alert("nuasl");
      this.handleSwitch(key);
      this.handleFormUnmount("renderSearch");
      this.handleFormUnmount("renderTable");
      this.handleFormUnmount("renderForm");
    }
  };

  render() {
    let model = this.state.sendFormXML || [{}];
    let modelTable = this.state.sendTableXML || [{}];
    return (
      <div className="App">
        <div className="container ">
          <label htmlFor="basic-url">Your vanity URL</label>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">
                    URL
                  </span>
                </div>
                <input
                  type="text"
                  value={this.state.navigate}
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  onChange={e => {
                    this.onChange(e, "navigate");
                  }}
                />
              </div>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn"
                onClick={() => this.onNavigate(this.state.navigate)}
              >
                GO!
              </button>
            </div>
          </div>
        </div>
        <br />
        {this.state.renderSearch === false && <div>Please Wait ...</div>}
        {this.state.renderSearch && (
          <Search
            model={modelTable}
            onSearch={model => {
              this.onSearch(model);
            }}
          />
        )}
        {this.state.renderTable && (
          <React.Fragment>
            {/* <Search
              model={modelTable}
              onSearch={model => {
                this.onSearch(model);
              }}
            /> */}
            <br />
            <DynamicTable
              model={modelTable}
              onSort={sortKey => this.onSort(sortKey)}
              handleEdit={model => this.handleEdit(model)}
              handleDelete={model => this.handleDelete(model)}
            />
            {/* <DynamicForm
              model={model}
              className="form"
              title={"Form Customer " + this.state.title}
              onSubmit={model => {
                this.onSubmit(model);
              }}
            /> */}
          </React.Fragment>
        )}
        <br />
        {this.state.renderForm && (
          <DynamicForm
            model={model}
            className="form"
            title={"Form Customer " + this.state.title}
            onSubmit={model => {
              this.onSubmit(model);
            }}
          />
        )}
      </div>
    );
  }
}

export default ParentForm;
