import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay"
import Spinner from "./Spinner";



class App extends React.Component {
  state = { laititud: null, errormsg: "" }


  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ laititud: position.coords.latitude }),
      (err) => this.setState({ errormsg: err.message })
    );
  }
  componentDidUpdate() {
    console.log('updated');
  }
  renderContent() {
    if (this.state.errormsg && !this.state.laititud) {
      return <div>Error:{this.state.errormsg}</div>;
    }
    if (!this.state.errormsg && this.state.laititud) {
      return <SeasonDisplay latitude={this.state.laititud} />
    }
    return <Spinner message="please allow location" />;
  }

  render() {
    return <div> {this.renderContent()}</div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector("#root")
)