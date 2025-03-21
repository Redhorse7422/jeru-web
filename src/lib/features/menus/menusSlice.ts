import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Color = {
  name: string;
  code: string;
};

// Define a type for the slice state
interface MenusState {
  colorSelection: Color;
  sizeSelection: string;
}

// Define the initial state using that type
const initialState: MenusState = {
  colorSelection: {
    name: "Brown",
    code: "bg-[#4F4631]",
  },
  sizeSelection: "Large",
};

export const menusSlice = createSlice({
  name: "menus",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setColorSelection: (state, action: PayloadAction<Color>) => {
      state.colorSelection = action.payload;
    },
    setSizeSelection: (state, action: PayloadAction<string>) => {
      state.sizeSelection = action.payload;
    },
  },
});

export const { setColorSelection, setSizeSelection } = menusSlice.actions;

export default menusSlice.reducer;
