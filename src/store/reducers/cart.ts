import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type CartState = {
  items: Produto[]
  itemsFavorits: Produto[]
}

const initialState: CartState = {
  items: [],
  itemsFavorits: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Produto>) => {
      const item = action.payload
      if (state.items.find((product) => product.id === item.id)) {
        alert('Este item já está no carrinho')
      } else {
        state.items.push(item)
      }
    },
    addFavorit: (state, action: PayloadAction<Produto>) => {
      if (
        !state.itemsFavorits.some((product) => product.id === action.payload.id)
      ) {
        state.itemsFavorits.push(action.payload)
      }
    },
    removeFavorit: (state, action: PayloadAction<Produto>) => {
      state.itemsFavorits = state.itemsFavorits.filter(
        (item) => item.id !== action.payload.id
      )
    }
  }
})

export const { addCart, addFavorit, removeFavorit } = cartSlice.actions
export default cartSlice.reducer
