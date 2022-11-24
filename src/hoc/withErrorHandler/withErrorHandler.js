import React, { Component } from "react";
import Aux from "../Aux";
import Modal from "../../components/UI/Modal/Modal";
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      this.interceptorsReq = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      this.interceptorsRes = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.interceptorsReq);
      axios.interceptors.response.eject(this.interceptorsRes);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            backDropClicked={this.errorConfirmHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
