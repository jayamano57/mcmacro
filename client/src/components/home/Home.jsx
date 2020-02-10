import React from "react";
import MacroInputContainer from "./MacroInputContainer";
import Chart from "./Chart";

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
    },
    errors: {
      calories: true,
      protein: true,
      carbs: true,
      fat: true
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

  // sets up the options and data for chart.js
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
            data,
            backgroundColor: ["#52dc63", "#4957d9", "#c74ddb"],
            hoverBackgroundColor: ["#52dc63", "#4957d9", "#c74ddb"]
          }
        ]
      }
    });
  };

  // Handles the dropdown change
  selectChangeHandle = e => {
    const value = e;
    const operator = value;
    this.setState({
      operator
    });
  };

  search = async e => {
    e.preventDefault();
    const errors = await this.formValidationCheck();
    const isValid = Object.values(errors).every(value => {
      return !!value;
    });
    if (isValid) {
      const formData = { ...this.state.formData };
      this.props.history.push({
        pathname: "/results",
        state: { formData, operator: this.state.operator }
      });
    } else {
      this.setState({
        errors
      });
    }
  };

  // checks for empty input fields
  formValidationCheck = () => {
    const formData = { ...this.state.formData };
    let errors = { ...this.state.errors };
    const { calories, protein, carbs, fat } = formData;
    errors = { calories, protein, carbs, fat };

    return errors;
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
            errors={this.state.errors}
          />
          <Chart data={this.state.chartData} />
        </main>
      </div>
    );
  }
}

export default Home;
