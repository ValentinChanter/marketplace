import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {

    // Déclaration des variables d'état
    // Pour le panier
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);
    // Autres
    const [isSubscribed, setIsSubscribed] = useState(false);


    // Monter / Baisser la quantité de produits à mettre dans le panier 
    const incQty = (stock) => {
        setQty((actQty) => {
            if(actQty + 1 > stock) return actQty;
            return actQty + 1;
        })
    }
    const decQty = () => {
        setQty((actQty) => {
            if(actQty < 2 ) return 1;
            return actQty - 1;
        })
    }


    // Changer la quantité de chaque produit individuellement dans le panier
    const toggleQty = (product, value) => {
        let toChange = cartItems.find((item) => item.id === product.id);
        // Prendre tous les cartItems sauf le produit à changer
        const newCartItems = cartItems.filter((item) => item.id !== product.id);
        
        // Si on appuie sur +
        if (value === 'inc') {
          if (toChange.quant < product.quantity) {
            // Rajouter le produit avec sa nouvelle quantité
            const updatedCart = cartItems.map(
              toChange => (toChange.id === product.id ? { ...toChange, quant: toChange.quant + 1 } : toChange));

            const newTotalPrice = totalPrice + toChange.price * 1;
            setCartItems(updatedCart);
            setTotalQty((actTotalQty) => actTotalQty + 1);
            setTotalPrice(newTotalPrice);
          }

        // Et sur -
        } else if (value === 'dec') {
          if (toChange.quant > 1) {
            const updatedCart = cartItems.map(
              toChange => (toChange.id === product.id ? { ...toChange, quant: toChange.quant - 1 } : toChange));
      
            const newTotalPrice = totalPrice - toChange.price;
            setCartItems(updatedCart);
            setTotalQty((actTotalQty) => actTotalQty - 1);
            setTotalPrice(newTotalPrice);
          }
        }
      };
    

    const addToCart = (product, quant) => {
        // Vérifier si le produit est déjà dans le panier
        const isInCart = cartItems.find((item) => item.id === product.id);

        // Calculer le nv prix et quantité
        setTotalPrice((actTotalPrice) => actTotalPrice + product.price * quant);
        setTotalQty((actTotalQty) => actTotalQty + quant);

        // Ajouter les nv produits à la liste des produits mis dans le panier
        if (isInCart) {
            // Parcourir les cartItems pour modifier la quantité de ceux déjà présents dans le panier
            const newCart = cartItems.map((cartItem) => {
                if (cartItem.id === product.id) {
                  return {
                    ...cartItem,
                    quant: cartItem.quant + quant,
                  };
                }
                return cartItem;
              });
              
            setCartItems(newCart);

        } else {
            product.quant = quant;
            setCartItems([...cartItems, product]);
        }

        setQty(1);
        toast.success(`${qty} ${product.product.name} ajouté au panier`);
    }


    const removeFromCart = (product) => {
        let toRemove = cartItems.find((item) => item.id === product.id);

        setTotalPrice((actTotalPrice) => actTotalPrice - toRemove.price * toRemove.quant);
        setTotalQty((actTotalQty) => actTotalQty - toRemove.quant);
        // Filtre les cartItem et garder uniquement ceux qui n'ont pas le même id que l'item concerné
        setCartItems(cartItems.filter(item => item.id !== product.id));    
    }

    return (
        <Context.Provider
            value={{    // Info qu'on veut garder dans tt le site
                cartItems, totalPrice, totalQty, qty,
                setCartItems, setTotalPrice, setTotalQty, setIsSubscribed,
                incQty, decQty, toggleQty, addToCart, removeFromCart
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);