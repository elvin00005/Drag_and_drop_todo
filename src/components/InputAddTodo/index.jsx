import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";

import styles from "./InputAddTodo.module.scss";

const BtnAddTodo = ({ toggleShow }) => (
  <Button className={styles.add} onClick={toggleShow}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-plus-lg mx-1"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
      />
    </svg>
    Add todo
  </Button>
);

const InputAddTodo = ({ addTodoHandler, toggleShow, todoKey }) => {
  const [todoName, setTodoName] = useState("");
  const [lengthTodoName, setLengthTodoName] = useState(true);

  const handleAddTodo = () => {
    const trimmedTodoName = todoName.trim();
    if (trimmedTodoName.length < 3) {
      setLengthTodoName(false);
      return;
    }
    addTodoHandler({ todoKey, todoName, id: Math.random().toString() });
    setTodoName("");
    setLengthTodoName(true);
    toggleShow();
  };
  return (
    <div className={styles.form}>
      <Form.Group className="mb-3" controlId="formBasicTodo">
        <Form.Control
          placeholder="enter todo"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
      </Form.Group>
      {!lengthTodoName && <p>The minimum length must be at least 3</p>}
      <div className="d-flex flex-row justify-content-center">
        <Button variant="primary" onClick={handleAddTodo}>
          Add todo
        </Button>
        <Button onClick={toggleShow}>
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
    </div>
  );
};

export const AddTodoBLock = ({ addTodoHandler, todoKey }) => {
  const [showInput, setShowInput] = useState(false);

  const toggleShow = () => setShowInput((prev) => !prev);

  if (showInput) {
    return (
      <InputAddTodo
        todoKey={todoKey}
        toggleShow={toggleShow}
        addTodoHandler={addTodoHandler}
      />
    );
  }

  return <BtnAddTodo toggleShow={toggleShow} />;
};
