// import axios from 'axios';
const state = {
  user: "",
  cartItems: []
}

export const cart = {
  namespaced: true,
  state,
  actions: {
    setUser({ commit }, user) {
      commit('UPDATE_USER', user);
    },
    getCartItemsFromUser({ state }) {
      if (state.user !== "") {
        console.log("object:", JSON.parse(localStorage.getItem('userC'))?.cart);
        let cart = JSON.parse(JSON.parse(localStorage.getItem('userC'))?.cart) || [];
        localStorage.setItem('cartItems' + state.user, JSON.stringify(cart));
      }
    },
    getCartItems({ commit, state }) {
      commit('UPDATE_CART_ITEMS', JSON.parse(localStorage.getItem('cartItems' + state.user)))
    },
    addCartItem({ commit, state }, cartItem) {
      let cart = JSON.parse(localStorage.getItem('cartItems' + state.user)) || [];
      var check = true;
      cart.forEach(function (c, i) {
        if (c.productId == cartItem.productId) {
          cart[i].quantity += cartItem.quantity
          cart[i].maxQuantity = cartItem.maxQuantity;
          if (cart[i].quantity > cartItem.maxQuantity) {
            cart[i].quantity = cartItem.maxQuantity;
          }
          check = false
        }
      });
      if (check)
        cart = [...cart, cartItem];
      localStorage.setItem('cartItems' + state.user, JSON.stringify(cart));
      commit('UPDATE_CART_ITEMS', cart)
    },
    updateQuantity({ commit, state }, payload) {
      const { index, newQuantity, newMaxQuantity } = payload;
      let cart = JSON.parse(localStorage.getItem('cartItems' + state.user)) || [];

      cart[index].quantity = newQuantity;
      if (newMaxQuantity) {
        cart[index].maxQuantity = newMaxQuantity;
      }
      if (cart[index].quantity > cart[index].maxQuantity) {
        cart[index].quantity = cart[index].maxQuantity;
      }
      localStorage.setItem('cartItems' + state.user, JSON.stringify(cart));
      commit('UPDATE_CART_ITEMS', cart)
    },
    removeCartItem({ commit }, cartItem) {
      commit('UPDATE_CART_ITEMS', JSON.parse(localStorage.getItem('cartItems')).filter(c => !(c.productId == cartItem.productId)))
      // axios.delete('/cart/delete', cartItem).then((response) => {
      //   commit('UPDATE_CART_ITEMS', response.data)
      // });
    },
    removeAllCartItems({ commit }) {
      localStorage.removeItem('cartItems');
      commit('UPDATE_CART_ITEMS', JSON.parse(localStorage.getItem('cartItems')))
      // axios.delete('/cart/delete/all').then((response) => {
      //   commit('UPDATE_CART_ITEMS', response.data)
      // });
    }
  },
  mutations: {
    UPDATE_CART_ITEMS(state, payload) {
      state.cartItems = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    }
  },
  getters: {
    cartItems: state => state.cartItems,
    cartTotal: state => {
      return state.cartItems?.reduce((acc, cartItem) => {
        return (cartItem.quantity * cartItem.orderPrice) + acc;
      }, 0);
    },
    cartQuantity: state => {
      return (state.cartItems?.reduce((acc, cartItem) => {
        return cartItem.quantity + acc;
      }, 0) || 0);
    }
  }
};