import React from "react";
import axios from "axios";
import RestaurantData from "./RestaurantData";
import loading from "../../media/gifs/loading-200px.svg";

class Results extends React.Component {
  state = {
    data: {},
    resturantDataComponents: [],
    loading: true
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
          response.data.data
        );
        this.setState({
          loading: false,
          resturantDataComponents,
          data: response.data
        });
      })
      .catch(error => console.log("error" + error));
  };

  createRestaurantDataComponents = data => {
    return data.map(restaurant => {
      return (
        <RestaurantData title={restaurant.title} items={restaurant.items} />
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <div className="loading">
            <img src={loading} alt="loading" />
          </div>
        ) : (
          <div className="results-container">
            <section className="results-content">
              {this.state.resturantDataComponents}
            </section>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Results;
