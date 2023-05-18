import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "Pera  ", idList: "1", id: 1, isCheck: false },
  { name: "Zapallo", idList: "2", id: 2, isCheck: false },
  { name: "Manzana", idList: "1", id: 3, isCheck: false },
  { name: "Banana", idList: "1", id: 4, isCheck: false },
];

const ProdcutReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addProduct(state, action) {
      return [...state, action.payload];
      // state.push(action.payload) would be other option
    },
    deleteProduct(state, action) {
      return state.filter((product) => product.id !== action.payload);
    },
    checkProduct(state, action) {
      const product = state.find((product) => product.id === action.payload.id);
      product.isCheck = !product.isCheck;
    },

    editQuantity(state, action) {
      for (let product of state) {
        if (product.id === action.payload.id) {
          product.quantity = product.quantity + action.payload.value;
          if (product.quantity < 0) {
            product.quantity = 0;
          }
          return state;
        }
      }
    },

    editPrice(state, action) {
      for (let product of state) {
        if (product.id === action.payload.id) {
          product.price = action.payload.price;

          return state;
        }
      }
    },
  },
});

const { actions, reducer } = ProdcutReducer;
export const {
  addProduct,
  deleteProduct,
  checkProduct,
  deleteListProducts,
  editQuantity,
  editPrice,
} = actions;
export default reducer;
