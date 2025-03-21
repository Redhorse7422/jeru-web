import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/components/storage";
import productsReducer from "./features/products/productsSlice";
import cartsReducer from "./features/carts/cartsSlice";
import menusReducer from "./features/menus/menusSlice";
import checkoutReducer from "./features/checkout/checkoutSlice";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["carts"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  menus: menusReducer,
  checkout: checkoutReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware), // Add the RTK-Query middleware here
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

const store = makeStore().store;

// Infer the type of the store
export type AppStore = typeof store;
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
