import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class RentalSearchInput extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  handleSearch = async () => {
    const { history } = this.props;
    const city = this.searchInput.current.value;
    (await city)
      ? history.push(`/rentals/${city}/homes`)
      : history.push("/rentals");
    this.searchInput.current.value = "";
  };

  render() {
    return (
      <div className="form-inline my-2 my-lg-0 d-none d-md-block">
        <input
          onKeyPress={event => {
            this.handleKeyPress(event);
          }}
          ref={this.searchInput}
          className="form-control mr-sm-2 bwm-search"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          onClick={() => {
            this.handleSearch();
          }}
          className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
          type="submit"
        >
          Search
        </button>
      </div>
    );
  }
}

export default withRouter(RentalSearchInput);
