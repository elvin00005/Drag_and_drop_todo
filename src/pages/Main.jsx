import React from "react";
import Layout from "../components/layout/Layout";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/TodoSlice";

import styles from "./Main.module.scss";

const Main = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const onSubmitHandler = ({ name, todo }) => {
    dispatch(
      todoActions.addTodo({
        name,
        todo,
        id: Math.random().toString(),
      })
    );

    reset();
  };
  return (
    <Layout>
      <Form
        className={styles.container}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Form.Group className="mb-3" controlId="Todo">
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo"
            {...register("todo", {
              required: "The field is required",
              minLength: {
                value: 3,
                message: "The minimum message length must be at least 3",
              },
            })}
          />
          <div className={styles.error}>
            {errors?.todo && <p>{errors?.todo?.message || "Error!"}</p>}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register("name", {
              required: "The field is required",
              minLength: {
                value: 3,
                message: "The minimum message length must be at least 3",
              },
            })}
          />
          <div className={styles.error}>
            {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
          </div>
        </Form.Group>
        <Button disabled={!isValid} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default Main;
