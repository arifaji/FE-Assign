import React, { Component } from "react";
import DynamicForm from "./Child";
import fileXML from "./model.xml";
import fileMK3 from "./modelMK3.xml";

class ParentForm extends Component {
  state = {
    fetchxml: "",
    xml2json: "",
    finalModelMK3: "",
    modelMK3: "",
    modelMK4: "",
    finalModelMK4: "",
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
      console.log(convertedXML);
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

    let modelMK3 = this.state.modelMK3;
    let parser2 = new xml2js.Parser();
    let arr = [];
    parser2.parseString(modelMK3, function(err, result) {
      console.log(result.form.row);
      for (let i = 0; i < result.form.row.length; i++) {
        arr.push(result.form.row[i].column[0]);
      }
    });
    this.setState({
      finalModelMK3: arr
    });
    console.log(this.state.finalModelMK3);

    //-=> Batas suci fetch xml model baru

    let newformat = "http://10.10.18.199:5000/limit?tableName=form";
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
    let arrMK4 = [];
    parserX.parseString(modelMK4, function(err, result) {
      // console.log(result.form.rows[0].row);
      for (let i = 0; i < result.form.rows[0].row.length; i++) {
        arrMK4.push(result.form.rows[0].row[i].column[0]);
      }
    });
    this.setState({
      finalModelMK4: arrMK4
    });
    console.log(this.state.finalModelMK4);
  };

  onSubmit = model => {
    alert(JSON.stringify(model));
  };

  render() {
    // let xmlmodel = this.state.xml2json || [{}];
    // let xmlmodel = this.state.finalModelMK3 || [{}];
    let xmlmodel = this.state.finalModelMK4 || [{}];
    return (
      <div className="App">
        <DynamicForm
          className="form"
          title="Registration"
          // model={this.state.modele}
          model={xmlmodel}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />
      </div>
    );
  }
}

export default ParentForm;
