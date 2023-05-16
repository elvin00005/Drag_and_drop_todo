import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: {
    title: "Todo",
    items: [],
  },
  "in progress": {
    title: "In Progress",
    items: [],
  },
  done: {
    title: "Done",
    items: [],
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      const { key, todo, id } = action.payload;

      state[key].items.push({ todo, id });
    },
    changeState(state, action) {
      const data = action.payload;
      const { destination, source } = data;
      const copyTodos = { ...state[source.droppableId].items[source.index] };

      state[source.droppableId].items.splice(source.index, 1);
      state[destination.droppableId].items.splice(
        destination.index,
        0,
        copyTodos
      );
    },
    deleteTodo(state, action) {
      const data = action.payload;
      const { key, el } = data;

      state[key].items.splice(el, 1);
    },
    createColumn(state, action) {
      const { key } = action.payload;
      return {
        ...state,
        [key]: {
          title: key,
          items: [],
        },
      };
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
