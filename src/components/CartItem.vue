<template functional>
  <article class="cart-item">
    <img
      :src="props.imageUrl"
      class="cart-item__image"
      width="100"
      height="100"
      alt=""
    >
    <div class="cart-item__info">
      <h2>{{ props.title }}</h2>
      <p>SKU: {{ props.sku }}</p>
      <div>
        <span v-if="props.price.formattedValue">
          {{ props.price.formattedValue }}
        </span>
        ×
        <span>
          {{ props.quantity }}
        </span>
      </div>
    </div>
    <div
      v-if="props.totalPrice.value"
      class="cart-item__total"
    >
      {{ props.totalPrice.formattedValue }}
    </div>
  </article>
</template>

<script>
import { DEFAULT_PRICE } from '../constants.js';

export default {
  name: 'CartItem',
  props: {
    title: {
      type: String,
      default: 'we could not get title 😞',
    },
    imageUrl: {
      type: String,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII=',
    },
    sku: {
      type: String,
      default: 'we could not get SKU 😞',
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Object,
      default: () => DEFAULT_PRICE,
    },
    totalPrice: {
      type: Object,
      default: () => DEFAULT_PRICE,
    },
  },
};
</script>

<style lang="scss">
.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 80px;
  grid-gap: 16px;
  align-items: center;
  padding: 8px;
  background-color: #fff;
}

.cart-item__image {
  object-fit: cover;
  object-position: center;
}

.cart-item__info {
  h2 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    margin-bottom: 8px;
    color: #555;
  }

  > div {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
  }
}

.cart-item__total {
  font-size: 18px;
  text-align: right;
}
</style>
