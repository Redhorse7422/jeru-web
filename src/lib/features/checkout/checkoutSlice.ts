import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentMethod {
  method: 'credit_card' | 'paypal' | 'cash_on_delivery';
}

export interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  orderSummary: {
    items: any[]; // Cart items
    totalPrice: number;
    adjustedTotalPrice: number;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CheckoutState = {
  shippingAddress: null,
  paymentMethod: null,
  orderSummary: null,
  status: 'idle',
  error: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    setOrderSummary(state, action: PayloadAction<{ items: any[]; totalPrice: number; adjustedTotalPrice: number }>) {
      state.orderSummary = action.payload;
    },
    placeOrderStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    placeOrderSuccess(state) {
      state.status = 'succeeded';
      state.shippingAddress = null;
      state.paymentMethod = null;
      state.orderSummary = null;
    },
    placeOrderFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  setShippingAddress,
  setPaymentMethod,
  setOrderSummary,
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFailure,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;