import React, { Component } from "react";

import DynamicForm from "./Child";
import fileXML from "./newmodel.xml";
import xmlCustomer from "./anothertable.xml";
import customer7 from "./newmodelSample1.xml";
import modelAllData from "./modelAllData.xml";

import ChildTable from "./Child2table";
import DynamicTable from "./ChildTable";

import Search from "../search/Search";
import TableAPI from "./ChildTableAPI";
import AllModelAPI from "./AllModelAPI.xml";

class ParentForm extends Component {
  state = {
    //dataid buat post//
    dataID: "",
    //renderForm buat refresh?
    renderForm: true,
    //modelAllData
    modelAll: "",
    sendAllModel: "",
    //MODEL ALL API
    modelAPI: "",
    sendModelAPI: "",
    //
    fetchxml: "",
    xml2json: "",
    finalModelMK3: "",
    modelMK3: "",
    modelMK4: "",
    finalModelMK4: "",
    modelCustomer: "",
    tabelCustomer: "",
    data: []
  };

  //Component DID MOUNT
  componentDidMount() {
    this.getXML();
  }

  handleFormUnmount = () => {
    this.setState({ renderForm: false });
  };
  handleFormMount = () => {
    this.setState({ renderForm: true });
  };

  //How to convert XML to JSON then generate become a Dynamic Form
  getXML = async () => {
    let xml2js = require("xml2js");

    //-=> Fetch API / xml untuk Form (fileXML) / (newformat) CUSTOMER_FORM
    let newformat = "http://10.5.43.213:5000/api?formName=fcustomer";
    await fetch(newformat)
      .then(response => response.text())
      .then(response => {
        this.setState({ modelMK4: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    let modelMK4 = this.state.modelMK4;
    let parserX = new xml2js.Parser();
    let arrMK4left = [];
    let arrMK4right = [];
    try {
      parserX.parseString(modelMK4, function(err, result) {
        for (let i = 0; i < result.form.rows[0].row.length; i++) {
          arrMK4left.push(result.form.rows[0].row[i].columns[0].column[0]);
          if (result.form.rows[0].row[i].columns[0].column[1] !== undefined) {
            arrMK4right.push(result.form.rows[0].row[i].columns[0].column[1]);
          }
        }
      });
      this.setState({
        finalModelMK3: arrMK4left
      });
      this.setState({
        finalModelMK4: arrMK4right
      });
    } catch (err) {
      alert(err.message);
    }

    //-=> Fetch API / xml untuk Tabel (xmlCustomer) / (apicustomer)
    //Irfan
    let apicustomer = "http://10.5.43.213:5000/api/customers";
    //Fadhillah
    // let apicustomer = "http://10.10.28.173:3000/customers";

    await fetch(xmlCustomer)
      .then(response => response.text())
      .then(response => {
        this.setState({ modelCustomer: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    let modelCustomer = this.state.modelCustomer;
    let parserz = new xml2js.Parser();
    let valueTabel;

    try {
      parserz.parseString(modelCustomer, function(err, result) {
        valueTabel = result.elements.element;
      });
      this.setState({
        tabelCustomer: valueTabel
      });
    } catch (err) {
      alert(err.message);
    }
    console.log(valueTabel);

    //-=> COBAIN MODEL ALL TABLE PAKAI MODEL-ALL-DATA XML
    await fetch(modelAllData)
      .then(response => response.text())
      .then(response => {
        this.setState({ modelAll: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    let modelAll = this.state.modelAll;
    try {
      let tHead = [];
      let tBody = [];
      parserz.parseString(modelAll, function(err, result) {
        for (let p = 0; p < result.forms.form.length; p++) {
          tHead = [];
          for (let i = 0; i < result.forms.form[p].rows[0].row.length; i++) {
            for (
              let j = 0;
              j < result.forms.form[p].rows[0].row[i].columns[0].column.length;
              j++
            ) {
              // console.log(
              //   result.forms.form[p].rows[0].row[i].columns[0].column[j]
              // );
              let label =
                result.forms.form[p].rows[0].row[i].columns[0].column[j].label;
              let value =
                result.forms.form[p].rows[0].row[i].columns[0].column[j].value;
              let type =
                result.forms.form[p].rows[0].row[i].columns[0].column[j].type +
                [];
              // console.log(type);
              if (type === "idnumber") {
                tHead.splice(0, 0, { type, value });
              } else {
                tHead.push({ label, value });
              }
            }
          }
          // console.log(tHead);
          tBody.push(tHead);
        }
      });
      console.log(tBody);
      this.setState({
        sendAllModel: tBody
      });
    } catch (err) {
      alert(err.message);
    }
    // console.log(this.state.modelAll);

    //-=> COBAIN MODEL ALL TABLE PAKAI MODEL-API- API CUSTOMER_TABLE
    let tabelAPI =
      "http://10.5.43.213:5000/api/customer/?formName=listcustomer";
    await fetch(tabelAPI)
      .then(response => response.text())
      .then(response => {
        this.setState({ modelAPI: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    let modelAPI = this.state.modelAPI;
    let sendModelAPI;
    try {
      parserz.parseString(modelAPI, function(err, result) {
        // console.log(result);
        // console.log(result.form.rows[0].row);
        sendModelAPI = result.form.rows[0].row;
      });
    } catch (error) {
      alert(error.message);
    }
    this.setState({
      sendModelAPI: sendModelAPI
    });
    // console.log(this.state.sendAllModel);
  };

  onSubmit = model => {
    // alert(JSON.stringify(model));
    let dataID = this.state.dataID;
    console.log(dataID);
    if (dataID === undefined || dataID === null || dataID === "") {
      // alert("post");
      let url = "http://10.5.43.213:5000/api/?tableName=customer";

      fetch(url, {
        method: "POST",
        body: JSON.stringify(model),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          console.log("Status:", JSON.stringify(response));
          if (response.message === "Success") {
            alert(response.message);
          } else {
            alert("Failed");
          }
        })
        .then(window.location.reload());
    } else {
      // alert("edit");
      let urle = "http://10.5.43.213:5000/api/customers/" + dataID;

      try {
        fetch(urle, {
          method: "PUT",
          body: JSON.stringify(model),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response => {
            console.log("Status:", JSON.stringify(response));
            if (response.message === "Success") {
              alert(response.message);
              // window.location.reload();
            } else {
              alert("Failed");
            }
          })
          .then(window.location.reload());
      } catch (err) {}
    }
  };

  handleDelete = async model => {
    // alert("Delete data with ID : " + model);
    var r = window.confirm("Delete data with ID : " + model + " ?");
    if (r === true) {
      alert("Data ID " + model + " deleted");
      let url = "http://10.5.43.213:5000/api/customer/" + model;

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          console.log("Status:", JSON.stringify(response));
          if (response.message === "Success") {
            alert(response.message);
          } else {
            alert("Failed");
          }
        })
        .then(window.location.reload());
    } else {
    }
  };

  handleEdit = async model => {
    this.handleFormUnmount();
    this.setState({
      dataID: model
    });
    let arrMK4left;
    let arrMK4right;
    let xml2js = require("xml2js");
    alert("Edit Data with ID : " + model);

    //-=> Fetch API / xml untuk EDIT FORM (customer7) / (newformat) CUSTOMER_FORM_EDIT
    let newformat =
      "http://10.5.43.213:5000/api/customer/" + model + "?formName=fcustomer";
    await fetch(newformat)
      .then(response => response.text())
      .then(response => {
        this.setState({ modelMK4: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    let modelMK4 = this.state.modelMK4;
    let parserX = new xml2js.Parser();
    arrMK4left = [];
    arrMK4right = [];

    try {
      parserX.parseString(modelMK4, function(err, result) {
        for (let i = 0; i < result.form.rows[0].row.length; i++) {
          arrMK4left.push(result.form.rows[0].row[i].columns[0].column[0]);
          if (result.form.rows[0].row[i].columns[0].column[1] !== undefined) {
            arrMK4right.push(result.form.rows[0].row[i].columns[0].column[1]);
          }
        }
      });
      this.setState({
        finalModelMK3: arrMK4left
      });
      this.setState({
        finalModelMK4: arrMK4right
      });
    } catch (err) {
      alert(err.message);
    }
    this.handleFormMount();
  };

  render() {
    let xmlmodel = this.state.finalModelMK3 || [{}];
    let xmlmodel2 = this.state.finalModelMK4 || [{}];

    let modelTable = this.state.tabelCustomer || [{}];
    let modelAll = this.state.sendAllModel || [{}];

    let sendModelAPI = this.state.sendModelAPI || [{}];
    return (
      <div className="App">
        {/* <ChildTable
          model={modelTable}
          handleEdit={model => this.handleEdit(model)}
          handleDelete={model => this.handleDelete(model)}
        /> */}
        <Search />
        <TableAPI
          model={sendModelAPI}
          handleEdit={model => this.handleEdit(model)}
          handleDelete={model => this.handleDelete(model)}
        />

        {/* <DynamicTable
          model={modelAll}
          handleEdit={model => this.handleEdit(model)}
          handleDelete={model => this.handleDelete(model)}
        /> */}

        {this.state.renderForm ? (
          <DynamicForm
            className="form"
            title="Form Customer"
            // model={this.state.modele}
            model={xmlmodel}
            model2={xmlmodel2}
            onSubmit={model => {
              this.onSubmit(model);
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default ParentForm;
