import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/features/auth/infrastructure/services/auth.service";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat([authApi.middleware]),
});

setupListeners(store.dispatch);

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch