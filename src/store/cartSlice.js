// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Funções auxiliares para salvar/ler do localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  } catch (e) {
    return []
  }
}

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch (e) {
    console.error('Erro ao salvar carrinho no localStorage', e)
  }
}

const initialState = {
  items: loadCartFromStorage(), // carrega do localStorage
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, quantity = 1 } = action.payload
      const existingItem = state.items.find((i) => i.id === id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ id, quantity })
      }
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find((i) => i.id === id)
      if (existingItem) {
        if (quantity > 0) existingItem.quantity = quantity
        else state.items = state.items.filter((i) => i.id !== id) // remove se quantity = 0
      }
      saveCartToStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },
  },
})

export const { addItem, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
