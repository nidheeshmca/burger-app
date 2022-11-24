import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Axios from "../../../Axios-order";
import Loader from "../../../components/UI/Loader/Loader";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    orderForm: {
      controls: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name",
          },
          validation: {
            required: {
              errorMessage: "Please provide the name.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street",
          },
          validation: {
            required: {
              errorMessage: "Please provide the street.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "zip Code",
          },
          validation: {
            required: {
              errorMessage: "Please provide the zip code.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        city: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "City",
          },
          validation: {
            required: {
              errorMessage: "Please provide the city.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        state: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "State",
          },
          validation: {
            required: {
              errorMessage: "Please provide the state.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country",
          },
          validation: {
            required: {
              errorMessage: "Please provide the country.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your email",
          },
          validation: {
            required: {
              errorMessage: "Please provide the email.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        mobile: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your mobile",
          },
          validation: {
            required: {
              errorMessage: "Please provide the mobile.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            type: "text",
            placeholder: "Delivery Method",
            options: [
              { value: "fastest", text: "Fatstest" },
              { value: "cheapest", text: "Cheapest" },
            ],
          },
          validation: {
            required: {
              errorMessage: "Please slelct the delivery method.",
            },
          },
          value: "",
          valid: false,
          error: "",
          touched: false,
        },
      },
      valid: false,
    },

    loading: false,
  };

  checkValidity = (control) => {
    if (control.validation && control.validation.required) {
      control.valid = control.value.trim() !== "";
      control.error = control.validation.required.errorMessage;
    } else {
      control.valid = true;
      control.error = "";
    }
    return control;
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    console.log(this.state);
    const order = {
      ingredient: this.props.ingredient,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.controls.name.value,
        address: {
          street: this.state.orderForm.controls.street.value,
          zipCode: this.state.orderForm.controls.zipCode.value,
          city: this.state.orderForm.controls.city.value,
          state: this.state.orderForm.controls.state.value,
          country: this.state.orderForm.controls.country.value,
        },
        email: this.state.orderForm.controls.email.value,
        mobile: this.state.orderForm.controls.mobile.value,
      },
      deliveryMethod: this.state.orderForm.controls.deliveryMethod.value,
    };

    Axios.post("orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/burgerbuilder");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };
  inputChangedHandler = (event, elemIdentifire) => {
    const formObject = { ...this.state.orderForm };
    const updatedFormElement = { ...formObject.controls[elemIdentifire] };

    updatedFormElement.value = event.target.value;
    this.checkValidity(updatedFormElement);

    formObject.controls[elemIdentifire] = updatedFormElement;
    formObject.valid = this.validateForm(formObject);
    formObject.touched = true;
    console.log(formObject);
    this.setState({ orderForm: formObject });
  };

  validateForm = (formObject) => {
    let isValid = true;
    for (let key in formObject.controls) {
      if (formObject.controls[key].valid === false) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  render() {
    let formElementArray = [];
    console.log(this.state.orderForm);
    for (let key in this.state.orderForm.controls) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm.controls[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((elem) => {
          return (
            <Input
              key={elem.id}
              elementType={elem.config.elementType}
              elementConfig={elem.config.elementConfig}
              value={elem.config.value}
              changed={(event) => this.inputChangedHandler(event, elem.id)}
              valid={elem.config.valid}
              error={elem.config.error}
              touched={elem.config.touched}
            ></Input>
          );
        })}
        <div>
          <Button btnType="Success" disabled={!this.state.orderForm.valid}>
            ORDER
          </Button>
        </div>
      </form>
    );

    if (this.state.loading) {
      form = <Loader></Loader>;
    }

    return (
      <div className={classes.ContactData}>
        <h3>Please provide your contact information</h3>
        {form}
      </div>
    );
  }
}

export default ContactData;
