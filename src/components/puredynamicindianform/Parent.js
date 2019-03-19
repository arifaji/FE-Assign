import React, { Component } from "react";

import DynamicForm from "./Child";
import fileXML from "./model.xml";
import fileMK3 from "./modelMK3.xml";

import ChildTable from "./Child2table";

class ParentForm extends Component {
  state = {
    fetchxml: "",
    xml2json: "",
    finalModelMK3: "",
    modelMK3: "",
    modelMK4: "",
    finalModelMK4: "",
    modelCustomer: "",
    tabelCustomer: "",
    data: [],
    modeleMK2: [
      {
        key: "gender",
        label: "Gender",
        type: "radio",

        options: [
          { key: "male", label: "Male", name: "gender", value: "male" },
          { key: "female", label: "Female", name: "gender", value: "female" }
        ]
      },
      // {
      //   key: "features",
      //   label: "Features",
      //   type: "checkbox",
      //   required: false,
      //   options: [
      //     { key: "atm-card", label: "ATM - Card", value: "atm-card" },
      //     { key: "m-banking", label: "M-Banking", value: "m-bangking" },
      //     { key: "vcc", label: "VCC", value: "vcc" }
      //   ]
      // },
      {
        key: "featuresmk2",
        label: "Features MK2",
        type: "checkbox",
        required: false,
        options: [
          { key: "atm-card", label: "ATM - Card", value: "atm-card" },
          { key: "m-banking", label: "M-Banking", value: "m-bangking" },
          { key: "vcc", label: "VCC", value: "vcc" }
        ]
      }
    ],
    modele: [
      {
        key: "nama",
        label: "Nama",
        type: "text",
        value: "Aji",
        placeholder: "Masukkan Nama",
        required: true
      },
      {
        key: "usia",
        label: "Usia",
        type: "number",
        required: true
      },
      {
        key: "alamat",
        label: "Alamat",
        type: "textarea",
        placeholder: "Masukkan Alamat",
        cols: 50,
        required: true
      },
      {
        key: "bankcabang",
        label: "Bank Cabang",
        type: "select",
        required: true,
        options: [
          { key: "kcp-jakarta", label: "KCP Jakarta", value: "kcp-jakarta" },
          {
            key: "kcp-tangerang",
            label: "KCP Tangerang",
            value: "kcp-tangerang"
          },
          { key: "kcp-bekasi", label: "KCP Bekasi", value: "kcp-bekasi" }
        ]
      },
      {
        key: "gender",
        label: "Gender",
        type: "radio",
        required: true,
        options: [
          { key: "male", label: "Male", name: "gender", value: "male" },
          { key: "female", label: "Female", name: "gender", value: "female" }
        ]
      },
      {
        key: "features",
        label: "Features",
        type: "checkbox",
        required: true,
        options: [
          { key: "atm-card", label: "ATM - Card", value: "atm-card" },
          { key: "m-banking", label: "M-Banking", value: "m-bangking" },
          { key: "vcc", label: "VCC", value: "vcc" }
        ]
      }
    ]
  };

  //Component DID MOUNT
  componentDidMount() {
    this.getXML();
  }

  //How to convert XML to JSON then generate become a Dynamic Form
  getXML = async () => {
    let xml2js = require("xml2js");
    // let urle = "http://10.10.18.199:3000/?tableName=form";
    // let newurl = "http://10.10.18.199:3000/form";
    // let urlvalue = "http://10.10.18.199:5000/modify/7?tableName=form";
    let urlcombo = "http://10.10.18.199:5000/options?tableName=form";

    //Proses Fetch file.xml agar bisa dibaca sebagai teks
    await fetch(fileXML)
      // await fetch(urlcombo)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchxml: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    let convertedXML;
    let xml = this.state.fetchxml;
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err, result) {
      // console.log(result);
      convertedXML = result["elements"]["element"];
      // console.log(convertedXML);
    });
    this.setState({ xml2json: convertedXML });
    // console.log(this.state.xml2json);
    // console.log(this.state.modele);

    await fetch(fileMK3)
      // await fetch(urlcombo)
      .then(response => response.text())
      .then(response => {
        this.setState({ modelMK3: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    //-=> Batas Suci - Atas pakai model lama, bawah pakai model baru

    // let modelMK3 = this.state.modelMK3;
    // let parser2 = new xml2js.Parser();
    // let arr = [];
    // let arr2 = [];
    // parser2.parseString(modelMK3, function(err, result) {
    //   console.log(result.form.row);
    //   for (let i = 0; i < result.form.row.length; i++) {
    //     arr.push(result.form.row[i].column[0]);
    //     if (result.form.row[i].column[1] !== undefined) {
    //       arr2.push(result.form.row[i].column[1]);
    //     }
    //   }
    // });
    // this.setState({
    //   finalModelMK3: arr
    // });
    // this.setState({
    //   finalModelMK4: arr2
    // });
    // console.log(this.state.finalModelMK3);
    // console.log(this.state.finalModelMK4);

    //-=> Batas suci fetch xml model baru DARI API

    let newformat = "http://10.10.28.173:3000/form";
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
    parserX.parseString(modelMK4, function(err, result) {
      // console.log(result.form.rows[0].row);
      // console.log(result.form.rows[0].row[0].columns[0].column[0]);
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
    // console.log(arrMK4left);
    // console.log(arrMK4right);

    //-=> Batas suci fetch xml model baru DARI API TABEL

    let apicustomer = "http://10.10.18.199:5000/customer";
    await fetch(apicustomer)
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
    parserz.parseString(modelCustomer, function(err, result) {
      // console.log(result.elements.element);
      valueTabel = result.elements.element;
    });
    this.setState({
      tabelCustomer: valueTabel
    });
    // console.log(this.state.tabelCustomer);
  };

  onSubmit = model => {
    alert(JSON.stringify(model));
  };

  handleEdit = async model => {
    this.setState({
      finalModelMK3: undefined
    });
    this.setState({
      finalModelMK4: undefined
    });
    let arrMK4left;
    let arrMK4right;
    let xml2js = require("xml2js");
    alert("Edit Start Here :) : " + model);
    let newformat =
      "http://10.10.18.199:5000/modify/" + model + "?tableName=form";
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
    parserX.parseString(modelMK4, function(err, result) {
      // console.log(result.form.rows[0].row);
      // console.log(result.form.rows[0].row[0].columns[0].column[0]);
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
  };

  render() {
    // let xmlmodel = this.state.xml2json || [{}];
    let xmlmodel = this.state.finalModelMK3 || [{}];
    let xmlmodel2 = this.state.finalModelMK4 || [{}];

    let modelTable = this.state.tabelCustomer || [{}];
    return (
      <div className="App">
        <ChildTable
          model={modelTable}
          handleEdit={model => this.handleEdit(model)}
        />
        <DynamicForm
          className="form"
          title="Registration"
          // model={this.state.modele}
          model={xmlmodel}
          model2={xmlmodel2}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />
      </div>
    );
  }
}

export default ParentForm;
