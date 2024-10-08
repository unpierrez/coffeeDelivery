import { createContext, useEffect, useReducer } from 'react'
import {
  CartItem,
  CartContextType,
  CartContextProviderProps,
} from './CartContext.types'
import { cartReducer } from '../../reducers/cart/reducer'
import {
  addCoffeeToCartAction,
  changeCartItemQuantityAction,
  cleanCartAction,
  removeCartItemAction,
} from '../../reducers/cart/actions'

const COFFEE_ITEMS_STORAGE_KEY = '@coffeeDelivery:cartItems-1.0.0'

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    { cartItems: [] },
    () => {
      const storedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY)
      if (storedCartItems) {
        return JSON.parse(storedCartItems)
      }
      return {
        cartItems: [],
      }
    },
  )

  const { cartItems } = cartState

  const cartQuantity = cartItems.length

  const cartItemsTotal = cartItems.reduce((total, cartItem) => {
    return total + cartItem?.price * cartItem.quantity
  }, 0)

  const deliveryPrice = 5.5

  function addCoffeeToCart(coffee: CartItem) {
    dispatch(addCoffeeToCartAction(coffee))
  }

  function changeCartItemQuantity(
    cartItemId: string,
    type: 'increase' | 'decrease',
  ) {
    dispatch(changeCartItemQuantityAction(cartItemId, type))
  }

  function removeCartItem(cartItemId: string) {
    dispatch(removeCartItemAction(cartItemId))
  }

  function cleanCart() {
    dispatch(cleanCartAction())
  }

  useEffect(() => {
    localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartState))
  }, [cartState])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCoffeeToCart,
        cartQuantity,
        changeCartItemQuantity,
        removeCartItem,
        cleanCart,
        cartItemsTotal,
        deliveryPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
