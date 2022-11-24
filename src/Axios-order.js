import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://react-burger-1959d.firebaseio.com/",
});

export default instance;
