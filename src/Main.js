import React from "react";
import "./App.css";
import InputForm from "./inputForm";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { db } from "./config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      carCategory: [{ name: "Small" }, { name: "Premium" }, { name: "Van" }],
      selectedCarCategory: "",
      selectedCarCategoryIsEmpty: false,
      carModel: [],
      selectedCarModel: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCarCategory = this.onChangeCarCategory.bind(this);
    this.onChangeCarModel = this.onChangeCarModel.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //3. All fields should be validated on submit; required fields are validated on submit
  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    this.onSubmit();
  }

  onSubmit = () => {
    const {
      name,
      email,
      phone,
      selectedCarCategory,
      selectedCarModel,
    } = this.state;
    db.ref("/carReservation").set({
      Name: name,
      Email: email,
      Phone: phone,
      CarCategory: selectedCarCategory,
      CarModel: selectedCarModel,
    });
    toast.success("Data Saved!");
    //can use history.push as well but since this is just a test, will do with window.location.href
    window.location.href = "/thankyou";
  };

  onChangeCarCategory(event) {
    //6. Select fields are dependent, use this scheme:
    const carCategoryValue = event.target.value;
    if (carCategoryValue === "") {
      this.setState({
        selectedCarCategoryIsEmpty: true,
      });
    }
    this.setState({
      selectedCarCategory: carCategoryValue,
    });
    //7. Car Category:
    switch (carCategoryValue) {
      case "Small": {
        this.setState({
          carModel: [
            { name: "Opel Corsa" },
            { name: "Toyota Yaris" },
            { name: "Smart for Two" },
          ],
        });
        break;
      }
      case "Premium": {
        this.setState({
          carModel: [
            { name: "Audi S8" },
            { name: "Jaguar XJR" },
            { name: "BMW 750iL" },
          ],
        });
        break;
      }
      case "Van": {
        this.setState({
          carModel: [
            { name: "Volkswagen Touran" },
            { name: "Renault Espace" },
            { name: "Fiat Talento" },
          ],
        });
        break;
      }
      default:
        this.setState({
          carModel: [],
        });
        break;
    }
  }
  onChangeCarModel(event) {
    const carModelValue = event.target.value;
    this.setState({
      selectedCarModel: carModelValue,
    });
  }

  render() {
    const {
      name,
      email,
      phone,
      carCategory,
      selectedCarCategory,
      selectedCarCategoryIsEmpty,
      carModel,
      selectedCarModel,
    } = this.state;
    return (
      <div className="container">
        <Card className="root">
          <CardContent>
            <h1>Car Reservation</h1>
            <form onSubmit={this.handleSubmit}>
              <InputForm
                label="Name"
                type="name"
                nameid="name"
                defaultValue={name}
                onChange={this.handleChange}
                required
              />
              <InputForm
                label="Email"
                type="email"
                nameid="email"
                defaultValue={email}
                onChange={this.handleChange}
                required
              />
              <InputForm
                label="Phone"
                type="number"
                nameid="phone"
                defaultValue=""
                onChange={this.handleChange}
              />
              {selectedCarCategoryIsEmpty ? (
                <FormControl required error className="form-control">
                  <InputLabel id="car_category">Car Category</InputLabel>
                  <Select
                    labelId="car_category"
                    name="car_category"
                    id="car_category"
                    onChange={this.onChangeCarCategory}
                    onBlur={this.onChangeCarCategory}
                    value={selectedCarCategory}
                  >
                    {carCategory.map(function (item, i) {
                      return (
                        <MenuItem key={i} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Error</FormHelperText>
                </FormControl>
              ) : (
                <FormControl required className="form-control">
                  <InputLabel id="car_category">Car Category</InputLabel>
                  <Select
                    labelId="car_category"
                    name="car_category"
                    id="car_category"
                    onChange={this.onChangeCarCategory}
                    onBlur={this.onChangeCarCategory}
                    value={selectedCarCategory}
                  >
                    {carCategory.map(function (item, i) {
                      return (
                        <MenuItem key={i} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
              <FormControl className="form-control">
                <InputLabel id="car_model">Car Model</InputLabel>
                <Select
                  labelId="car_model"
                  name="car_model"
                  id="car_model"
                  onChange={this.onChangeCarModel}
                  value={selectedCarModel}
                >
                  {carModel.map(function (item, i) {
                    return (
                      <MenuItem key={i} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div className="root">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="root">
          <CardContent>
            {/* 4. Render form values on change just below form */}
            <div className="form-values">
              <h4>Form Values</h4>
              <span>Name: {name}</span>
              <br />
              <span>Email: {email}</span>
              <br />
              <span>Phone: {phone}</span>
              <br />
              <span>Car Category: {selectedCarCategory}</span>
              <br />
              <span>Car Model: {selectedCarModel}</span>
            </div>
          </CardContent>
        </Card>
        <ToastContainer />
      </div>
    );
  }
}

export default Main;
