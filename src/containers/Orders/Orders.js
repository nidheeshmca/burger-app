import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Axios from "../../Axios-order";
import Loader from "../../components/UI/Loader/Loader";
class Orders extends Component {
  componentDidMount() {
    Axios.get("orders.json")
      .then((response) => {
        let orderDetails = [];
        for (let key in response.data) {
          orderDetails.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ orders: orderDetails, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error, loading: false });
      });
  }

  state = {
    orders: [],
    error: null,
    loading: true,
  };
  render() {
    let orders = this.state.orders.map((order) => {
      return <Order key={order.id} order={order}></Order>;
    });
    if (this.state.loading) {
      orders = <Loader></Loader>;
    }

    return (
      <div>
        <h1 style={{ margin: "auto" }}>Placed Orders</h1>
        {orders}
      </div>
    );
  }
}

export default Orders;
