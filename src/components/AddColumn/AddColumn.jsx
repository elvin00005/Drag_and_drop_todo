import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./AddColumn.module.scss";

const BtnAddColumn = ({ toggleShow }) => {
  return (
    <Button className={styles.myBtn} onClick={toggleShow}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus-lg"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
        />
      </svg>{" "}
      Add column
    </Button>
  );
};

const InputAddColumn = ({ toggleShow, addColumnHandler }) => {
  const [columnName, setColumnName] = useState("");
  const [lengthColumnName, setLengthColumnName] = useState(true);

  const handleAddColumn = () => {
    const trimmedColumnName = columnName.trim();
    if (trimmedColumnName.length < 3) {
      setLengthColumnName(false);
      return;
    }
    addColumnHandler({ columnName });
    setColumnName("");
    setLengthColumnName(true);

    toggleShow();
  };
  return (
    <Form className={styles.myForm} onSubmit={handleAddColumn}>
      <Form.Group className="mb-3" controlId="Todo">
        <Form.Control
          type="text"
          value={columnName}
          placeholder="Enter column name"
          onChange={({ target }) => setColumnName(target.value)}
        />
      </Form.Group>
      {!lengthColumnName && <p>The minimum length must be at least 3</p>}
      <div className="d-flex flex-row justify-content-center gap-3">
        <Button className={styles.btn} onClick={handleAddColumn}>
          add column
        </Button>
        <Button className={styles.btn} onClick={toggleShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </Button>
      </div>
    </Form>
  );
};

const AddColumn = ({ addColumnHandler }) => {
  const [showInput, setShowInput] = useState(false);
  const toggleShow = () => setShowInput((prev) => !prev);

  if (showInput) {
    return (
      <InputAddColumn
        toggleShow={toggleShow}
        addColumnHandler={addColumnHandler}
      />
    );
  }
  return <BtnAddColumn toggleShow={toggleShow} />;
};

export default AddColumn;
