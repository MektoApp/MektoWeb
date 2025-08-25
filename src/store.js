import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './store/authSlice'
import cartReducer from './store/cartSlice'

// Estado antigo para tema/sidebar
const initialUIState = {
  sidebarShow: true,
  theme: 'light',
}

const uiReducer = (state = initialUIState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  cart: cartReducer, // 🔥 carrinho incluído aqui
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
