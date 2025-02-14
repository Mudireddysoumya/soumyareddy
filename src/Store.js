import { configureStore, createSlice } from "@reduxjs/toolkit";



// Initial product lists for Veg, NonVeg, and Milk
const productSlice = createSlice({
  name: 'products',
  initialState: {
    Veg: [
      { name: 'beetroot', price: 200.5,image:"beetroot.jpg"},
      { name: 'tomato', price: 300.5,image:"tomoto.jpg"},
      { name: 'cucumber', price: 250.5,image:"cucumber.jpg"},
      { name: 'carrot', price: 350.5,image:"carrot.jpg"},
      { name: 'drumstick', price: 450.5,image:"drumstick.jpg"},
      { name: 'onion', price: 50.5,image:"onion.jpg"},
      { name: 'chilli', price: 400.5,image:"chilli.jpg"},
      { name: 'ladiesfinger', price: 90.5,image:"ladiesfinger.jpg"},
    ],
    Nonveg: [
      { name: 'chicken', price: 800.0,image:"chicken.jpg"},
      { name: 'fish', price: 900.0,image:"fish.jpg"},
      { name: 'mutton', price: 1000.0,image:"mutton.jpg"},
      { name: 'prawns', price: 1100.0,image:"prawns.jpg"},
      { name: 'pig', price: 1200.0,image:"pig.jpg"},
    ],
    Milk: [
      { name: 'Vijay', price: 800.0,image:"vijay.jpg"},
      { name: 'amul', price: 900.0,image:"amul.jpg"},
      { name: 'sangam', price: 1000.0,image:"sangam.jpg"},
      { name: 'hatsun1', price: 1100.0,image:"hatsun1.jpg"},
      { name: 'dodla', price: 1200.0,image:"dodla.jpg"},
      { name: 'jersey', price: 1300.0,image:"jersey.jpg"},
      { name: 'krishna', price: 1400.0,image:"krishna.jpg"},
    ],
      // New cart state to store added products
  },
  reducers: {},
});
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    increament:(state,action) => {
      const item=state.find(item => item.name === action.payload.name);
      if(item)
      {
        item.quantity +=1;
      }
    },
    decraement:(state,action) => {
      const item = state.find(item => item.name === action.payload.name);
      if(item && item.quantity > 1)
      {
        item.quantity -= 1;
      }
      else{
        return state.filter(item =>item.name !== action.payload.name);
      }
    },
    remove: (state,action)=>{
      return state.filter(item =>item.name !== action.payload.name);
    },
    clearCart: ()=>[]
 },
});
let purchaseDetailsSlice = createSlice({
  name:"purchaseDetails",
  initialState : [], 
  reducers: 
  {
    addPurchaseDetails: (state,action)=>{
        state.push(action.payload)
    },
  },
});
const authSclice=createSlice({
  name:"auth",
  initialState: {
    isAuthenticated: localStorage.getItem("username")? true: false,
    user: localStorage.getItem("username") || " ",
  },
  reducers:{
    login:(state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("username", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = " ";
      localStorage.removeItem("username");
    },
  },
});
// Configure the store with the products slice reducer
const store = configureStore({
  reducer: { 
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    purchaseDetails: purchaseDetailsSlice.reducer,
    auth: authSclice.reducer
  },
});
export const{addToCart, increament, decraement, remove,clearCart}=cartSlice.actions;
export default store;
export const{addPurchaseDetails}= purchaseDetailsSlice.actions;
export const{login, logout} = authSclice.actions