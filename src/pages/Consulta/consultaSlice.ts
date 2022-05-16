import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import LocalStorage from "services/local-storage";

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
            "fed42b06bccdbea9bf8eba44f3cdfd357d2a3f8ad02849017ea6c3aa88899ef",
        },
      }
    );
    const data = await response.json();

    return data;
  },
  {
    condition: (_, { getState, extra }) => {
      const { consulta } = getState() as any;
      if (new Date().getTime() - consulta.fetchDate <= 5000) {
        return false;
      }
      return true;
    },
  }
);

const loadKwInicial = () => {
  return LocalStorage.getSync<number>("kwInicial") ?? 0;
};

// https://github.com/jorgeatgu/apaga-luz/blob/main/update_create_datasets.js
const transform_today_prices = (json_today_prices: any) => {
  function createZone(price: number) {
    if (price <=0.24) {
      return "valle";
    } else if (
      price >0.24 && price <=0.28
    ) {
      return "llano";
    } else {
      return "punta";
    }
  }

  return json_today_prices.PVPC.map(
    ({ Dia, Hora, PCB }: { Dia: any; Hora: any; PCB: any }) => {
      const get_first_hour = Hora.split("-")[0];
      return {
        day: Dia,
        hour: +get_first_hour,
        price: +PCB.split(",")[0] / 1000,
        zone: createZone(+(+PCB.split(",")[0] / 1000)),
      };
    }
  );
};

const initialState: {
  loading?: boolean;
  error?: any;
  result: number;
  date?: number;
  datos?: any;
  fetchDate?: number;
} = {
  result: loadKwInicial(),
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
      state.datos = transform_today_prices(action.payload);
      state.loading = false;
      state.fetchDate = new Date().getTime();
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
