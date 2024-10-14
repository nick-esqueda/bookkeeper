import { createSlice } from "@reduxjs/toolkit";
import { fetchStats } from "./statsApi";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setStats, setLoading, setError } = statsSlice.actions;

export const fetchStatsAsync = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await fetchStats();
    dispatch(setStats(response));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export default statsSlice.reducer;
