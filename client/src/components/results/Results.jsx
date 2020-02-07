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
    this.getData(this.props.history.location.state);
  }

  getData = state => {
    const formData = state.formData;
    formData.operator = state.operator;
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
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  };

  createRestaurantDataComponents = data => {
    return data.map((restaurant, index) => {
      return (
        <RestaurantData
          title={restaurant.title}
          items={restaurant.items}
          key={index}
        />
      );
    });
  };

  backHome = () => {
    this.props.history.push("/");
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
              <button className="back-btn" onClick={this.backHome}>
                &larr; Back to home
              </button>
              {this.state.data.length ? (
                this.state.resturantDataComponents
              ) : (
                <div className="no-results">
                  No results <span className="sad-face">:(</span>
                </div>
              )}
            </section>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Results;
