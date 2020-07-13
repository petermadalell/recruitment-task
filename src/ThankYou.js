import React from "react";
import { db } from "./config";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Phone: "",
      CarCategory: "",
      CarModel: "",
    };
  }
  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
    let ref = db.ref("/carReservation");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };
  render() {
    const { Name, Email, Phone, CarCategory, CarModel } = this.state;
    return (
      <div className="container">
        <Card className="root">
          <CardContent>
            <h1>Form Values</h1>
            <div className="form-values">
              <span>Name: {Name}</span>
              <br />
              <span>Email: {Email}</span>
              <br />
              <span>Phone: {Phone}</span>
              <br />
              <span>Car Category: {CarCategory}</span>
              <br />
              <span>Car Model: {CarModel}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ThankYou;
