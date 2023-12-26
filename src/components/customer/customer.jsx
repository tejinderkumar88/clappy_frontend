import { Navigate } from "react-router-dom";
import GetAllCustomer from "./getAllCust";

const Customer = (props) => {


  return (
    <>
      <GetAllCustomer status={props.status} />
    </>
  );
};

export default Customer;
