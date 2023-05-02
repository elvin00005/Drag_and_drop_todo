import { createSlice } from "@reduxjs/toolkit";

const item1 = {
  name: "Elvin",
  todo: "sleep",
  id: Math.random().toString(),
};

const initialState = {
  // searchTerm: "",
  todo: {
    title: "Todo",
    items: [item1],
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

// export const selectFilteredTodos = (state) => {

//   const searchTerm = state.todo.searchTerm;
//   let newFilter = [];
//   for (let key of Object.keys(state.todo)) {
//     const value = state.todo[key];
//     if (typeof value === "object" && value.items) {
//       newFilter.push({
//         title: value.title,
//         items: value.items.filter((item) => item.name.includes(searchTerm)),
//       });
//     }
//   }
//   return newFilter;
// };

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      const newTodo = action.payload;
      const { name, todo, id } = newTodo;
      return {
        ...state,
        todo: {
          title: "todo",
          items: [
            {
              name,
              todo,
              id,
            },
            ...state.todo.items,
          ],
        },
      };
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
    updateTodo(state, action) {
      const data = action.payload;
    },
    // setSearchTerm(state, action) {

    //   state.searchTerm = action.payload;
    // },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
