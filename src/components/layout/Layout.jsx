import React from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <Row className="d-flex flex-row">
      <Col xs={1} className="p-0">
        <Sidebar />
      </Col>
      <Col xs={11} className="p-0">
        <Header />
        {children}
      </Col>
    </Row>
  );
};

export default Layout;
