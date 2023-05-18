import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Frutería", date: "03/01/2023" },
  { id: "2", name: "Verdulería", date: "12/02/2022" },
];

const ListReducer = createSlice({
  name: "list",
  initialState: initialState,
  reducers: {
    createList(state, action) {
      return (state = [...state, action.payload]);
    },
    deleteList(state, action) {
      return (state = state.filter((list) => list.id != action.payload));
    },
    editList(state, action) {
      for (let list of state) {
        if (list.id === action.payload.id) {
          list.name = action.payload.name;
          list.type = action.payload.type;
          return state;
        }
      }
    },
  },
});

const { actions, reducer } = ListReducer;
export const { createList, deleteList, editList } = actions;
export default reducer;
