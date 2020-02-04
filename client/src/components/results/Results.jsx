import React from "react";
import axios from "axios";
import RestaurantData from "./RestaurantData";

class Results extends React.Component {
  state = {
    data: {}
  };

  componentDidMount() {
    this.getData(this.props.history.location.state.formData);
  }

  getData = formData => {
    axios
      .get("http://localhost:8080/api/scraper", {
        params: formData
      })
      .then(response => {
        const resturantDataComponents = this.createRestaurantDataComponents(
          response.data
        );
        this.setState({
          data: response.data
        });
      })
      .catch(error => console.log(error));
  };

  createRestaurantDataComponents = data => {
    debugger;
    data.map(restaurant => {
      return <RestaurantData />;
    });
  };

  render() {
    return (
      <div className="results-container">
        <section className="results-content">results</section>
      </div>
    );
  }
}

export default Results;
