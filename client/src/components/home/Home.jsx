import React from "react";
import MacroInputContainer from "./MacroInputContainer";
import Chart from "./Chart";
import axios from "axios";

class Home extends React.Component {
  state = {
    operator: "less",
    formData: {
      calories: "",
      protein: "",
      carbs: "",
      fat: ""
    },
    chartData: {
      labels: ["Protein", "Carbs", "Fat"],
      datasets: [
        {
          data: [33, 33, 33],
          backgroundColor: ["#52dc63", "#4957d9", "#c74ddb"],
          hoverBackgroundColor: ["#52dc63", "#4957d9", "#c74ddb"]
        }
      ]
    }
  };

  changeHandler = e => {
    const key = e.currentTarget.name;
    const formData = { ...this.state.formData };
    formData[key] = e.currentTarget.value;
    this.setState({
      formData
    });
  };

  blurHandler = e => {
    const value = parseInt(e.currentTarget.value);
    const data = [...this.state.chartData.datasets[0].data];
    switch (e.currentTarget.name) {
      case "calories":
        return;
      case "protein":
        data[0] = value;
        break;
      case "carbs":
        data[1] = value;
        break;
      case "fat":
        data[2] = value;
        break;
      default:
        return;
    }
    this.setState({
      chartData: {
        labels: ["Protein", "Carbs", "Fat"],
        datasets: [
          {
            data: data,
            backgroundColor: ["#52dc63", "#4957d9", "#c74ddb"],
            hoverBackgroundColor: ["#52dc63", "#4957d9", "#c74ddb"]
          }
        ]
      }
    });
  };

  selectChangeHandle = e => {
    const value = e;
    this.setState({
      operator: value
    });
  };

  search = e => {
    e.preventDefault();
    const formData = { ...this.state.formData };
    debugger;
    axios
      .get("http://localhost:8080/api/scraper", { formData })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="home">
        <h1>
          <span className="title">McMacro</span>
        </h1>
        <main className="content-container">
          <MacroInputContainer
            changeHandler={this.changeHandler}
            blurHandler={this.blurHandler}
            value={this.state.formData}
            operator={this.state.operator}
            selectChangeHandle={this.selectChangeHandle}
            search={this.search}
          />
          <Chart data={this.state.chartData} />
        </main>
      </div>
    );
  }
}

export default Home;
