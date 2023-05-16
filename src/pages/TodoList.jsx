import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/TodoSlice";

import styles from "./TodoList.module.scss";
import BoardColumn from "../components/BoardColumn";
import { AddTodoBLock } from "../components/InputAddTodo";
import AddColumn from "../components/AddColumn/AddColumn";

const TodoList = () => {
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

  const addTodoHandler = ({ todoKey, todoName, id }) => {
    dispatch(
      todoActions.addTodo({
        todo: todoName,
        id,
        key: todoKey,
      })
    );
  };

  const addColumnHandler = ({ columnName }) => {
    dispatch(
      todoActions.createColumn({
        key: columnName,
      })
    );
  };
  return (
    <Layout>
      <div className={styles.container}>
        <DragDropContext onDragEnd={handlerDragged}>
          {_.map(todos, (data, todoKey) => {
            return (
              <div key={todoKey} className={styles.column}>
                <h3 onClick={() => console.log("click")}>{data.title}</h3>
                <Droppable droppableId={todoKey}>
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
                                  <BoardColumn
                                    provided={provided}
                                    key={el.id}
                                    todoKey={todoKey}
                                    el={el}
                                  />
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
                <AddTodoBLock
                  addTodoHandler={addTodoHandler}
                  todoKey={todoKey}
                />
              </div>
            );
          })}
        </DragDropContext>
        <AddColumn addColumnHandler={addColumnHandler} />
      </div>
    </Layout>
  );
};

export default TodoList;
