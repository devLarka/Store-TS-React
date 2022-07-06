import { createContext, ReactNode, useContext, useState } from "react";

interface IShoppingCartProviderProps {
    children: ReactNode
}

interface IShoppingCartContext {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartItems:ICartItem[];
    cartQuantity: () => number
}

interface ICartItem {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}



export function ShoppingCartProvider({ children }: IShoppingCartProviderProps) {

    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
            if (currentItems.find(item => item.id) == null) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
            if (currentItems.find(item => item.id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems((currentItems) => {
            return currentItems.filter(item => item.id !== id);
        })
    }

    return <ShoppingCartContext.Provider value={{
        getItemQuantity,
        decreaseCartQuantity,
        increaseCartQuantity,
        removeFromCart,
        cartItems
    }}>
        {children}
    </ShoppingCartContext.Provider>
}