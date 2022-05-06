import { combineReducers, configureStore } from "@reduxjs/toolkit";
import consultaSlice from "pages/Consulta/consultaSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appStateSlice from "./appStateSlice";

const rootReducer = combineReducers({
  appState: appStateSlice,
  consulta: consultaSlice,
});

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: {
        warnAfter: 48,
        ignoredPaths: ["error"],
      },
    }),
});
export type State = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default store;
