import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const SLICE_CONSTANTS = {
  NAME: "consulta",
  ACTIONS: {
    FETCH_DATOS: "consulta.FETCH_DATOS",
  },
};

export const getDatos = createAsyncThunk<any, void>(
  SLICE_CONSTANTS.ACTIONS.FETCH_DATOS,
  async (_, thunkAPI) => {
    const response = await fetch(
      "https://api.esios.ree.es/archives/70/download_json",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          authorization:
            "fed42b06bccdbea9bf8eba44f3cdfd357d2a3f8ad02849017ea6c3aa88899efa",
        },
      }
    );
    const data = await response.json();

    return data;
  }
);

const initialState: {
  loading?: boolean;
  error?: any;
  result: number;
  date?: number;
  datos?: any;
} = {
  result: 0,
  date: undefined,
  datos: undefined,
};

export const appStateSlice = createSlice({
  name: SLICE_CONSTANTS.NAME,
  initialState: initialState,
  reducers: {
    setKWatios(state, action: PayloadAction<number>) {
      state.result = action.payload;
    },
    setConsultaDate(state, action: PayloadAction<number>) {
      state.date = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getDatos.pending, (state, action) => {
      console.log(
        `Fetching data in ${action.type} with args:`,
        action.meta.arg
      );
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getDatos.fulfilled, (state, action) => {
      console.log(`Data retrieved in ${action.type}`, action.payload);
      state.datos = action.payload;
      state.loading = false;
    });
    builder.addCase(getDatos.rejected, (state, action) => {
      if (action.error && action.error.name === "AbortError") {
        console.log(`Fetching data ABORTED in ${action.type}`);
        return;
      }
      console.error(`Error in ${action.type}`, action.payload, action.error);
      state.error = action.payload ?? action.error;
      state.loading = false;
    });
  },
});

export const { setKWatios, setConsultaDate } = appStateSlice.actions;

export default appStateSlice.reducer;
