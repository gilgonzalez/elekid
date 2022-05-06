import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const APP_STATE_CONSTANTS = {
  NAME: "appState",
};

const initialState: {
  error: any;
  loading: boolean;
  menu: {
    toggled: boolean;
  };
} = {
  loading: false,
  error: undefined,
  menu: {
    toggled: false,
  },
};

export const appStateSlice = createSlice({
  name: APP_STATE_CONSTANTS.NAME,
  initialState: initialState,
  reducers: {
    toggleMenuOpen(state, action: PayloadAction<boolean | undefined>) {
      state.menu.toggled =
        action.payload !== undefined ? action.payload : !state.menu.toggled;
    },
  },
});

export const { toggleMenuOpen } = appStateSlice.actions;

export default appStateSlice.reducer;
