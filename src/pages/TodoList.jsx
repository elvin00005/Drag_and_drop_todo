import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/TodoSlice";
import { Button, Form } from "react-bootstrap";

import styles from "./TodoList.module.scss";

const TodoList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);
  const handlerDragged = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    dispatch(todoActions.changeState({ destination, source }));
  };
  const onChangeHandler = (data) => {
    setSearch(data);
    dispatch(todoActions.setSearchTerm(data));
  };

  return (
    <Layout>
      <Form.Group className="mb-3 w-25" controlId="Todo">
        <Form.Label className="text-white">Search</Form.Label>
        <Form.Control
          type="text"
          value={search}
          onChange={({ target }) => onChangeHandler(target.value)}
        />
      </Form.Group>

      <div className={styles.container}>
        <DragDropContext onDragEnd={handlerDragged}>
          {_.map(todos, (data, key) => {
            return (
              <div key={key} className={styles.column}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.dropColumn}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={el.id}
                                  >
                                    <div className={styles.content}>
                                      <div>
                                        <h4>Name : {el.name}</h4>
                                        <p>Todo : {el.todo}</p>
                                      </div>
                                      <Button
                                        onClick={() =>
                                          dispatch(
                                            todoActions.deleteTodo({ key, el })
                                          )
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          className="bi bi-trash3"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                      </Button>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </Layout>
  );
};

export default TodoList;
