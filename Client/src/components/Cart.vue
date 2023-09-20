<script>
import CartModal from './Modal.vue';
import InputTypeNumber from '@/components/InputTypeNumber.vue';

export default {
  name: "Cart",
  data() {
    return {
      cartItems: [],
      showModal: false
    };
  },
  methods: {
    update() {
      this.$store.dispatch("cart/getCartItems");
      this.cartItems = this.$store.getters['cart/cartItems'];
    },
    showModalHandler() {
      this.showModal = true;
    },
    hideModalHandler() {
      this.showModal = false;
    },
    toPrice(v = 0) {
      const result = parseInt(v).toLocaleString('vi', { style: 'currency', currency: 'VND' });
      return result;
    },
    removeAllCartItems() {
      //
    },
    removeCartItem($event) {
      const index = $event.currentTarget.getAttribute('data-index');
      this.$store.dispatch('cart/removeCartItem')
    },
    cartChangedHandler(payload) {
      this.$store.dispatch('cart/updateQuantity', { index: payload.params.index, newQuantity: payload.value })
      this.update()
    }
  },
  computed: {
    cartQuantity() {
      return this.$store.getters["cart/cartQuantity"]
    },

  },
  created() {
    this.update();
  },
  components: { CartModal, InputTypeNumber }
}
</script>
<template>
  <div class="menu">
    <div @click="showModalHandler" class="menu-label">
      <img class="icon" src="http://127.0.0.1:3001/cart.png" alt="">
      <a href="#" class="text">Cart: {{ cartQuantity }}</a>
    </div>
    <Teleport to="body">
      <CartModal width="500px" :show="showModal" @close="hideModalHandler">
        <template #header>
          <h3>Cart items</h3>
        </template>
        <template #body>
          <table class="table">
            <tr>
              <th class="shrink"></th>
              <th></th>
              <th class="shrink">Qty</th>
              <th class="shrink">Price</th>
              <th class="shrink">SubTotal</th>
            </tr>
            <tr v-for="(item, index) in cartItems" :data-pid="item.productId">
              <td>
                <button type="button" role="remove" @click="removeCartItem" :data-index="index">X</button>
              </td>
              <td>{{ item.productName }}</td>
              <td class="shrink">
                <InputTypeNumber :params="{ index }" @changeWithParams="cartChangedHandler" width="2em"
                  :value="item.quantity" :max="item.maxQuantity" :min="1" />
              </td>
              <td class="shrink">{{ toPrice(item.orderPrice) }}</td>
              <td class="shrink">{{ toPrice(item.orderPrice * item.quantity) }}</td>
            </tr>
            <tr>
              <th colspan="4">Total:</th>
              <th>{{ toPrice($store.getters['cart/cartTotal']) }}</th>
            </tr>
          </table>
        </template>
        <template #footer>
          <button class="modal-default-button" @click="hideModalHandler">OK</button>
          <button class="modal-default-button remove" @click="removeAllCartItems">Remove all</button>
        </template>
      </CartModal>
    </Teleport>
  </div>
</template>
<style scoped>
.icon {
  border-radius: 50%;
  overflow: hidden;
  width: 25px;
  height: 25px;
  padding: 5px;
}

.menu {
  max-width: 140px;
  height: 32px;
  display: block;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.21) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-radius: 16px;
}

.menu-label {
  height: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  &>.text {
    text-align: center;
    overflow: hidden;
    border-radius: 25px;
    font-weight: 800;
    width: calc(140px - 40px - 10px);
    padding-right: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000;
  }
}

.table {
  width: 100%;
  border-spacing: 4px;


  &>tr:nth-child(even) {
    background: linear-gradient(to right, #fff, #008d6033, #008d6033, #008d6033, #008d6033, #008d6033, #008d6033, #fff);
  }
}

[role=remove] {
  margin: 4px;
  padding: 4px;
  background-color: transparent;
  border: none;
}

button.remove {
  color: #ddd;
  background-color: rgb(255, 56, 56);
}

.shrink {
  width: 1%;
  padding-inline: 8px;
  min-width: 20px;
  white-space: nowrap;
  text-align: right;
}

th.shrink {
  text-align: center;
}
</style>