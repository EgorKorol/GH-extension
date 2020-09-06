<template>
  <div class="app">
    <h1 class="app__title">
      Your cart
    </h1>

    <template v-if="items && items.length">
      <ul class="app__list">
        <li
          v-for="{ title, imageUrl, sku, quantity, price, totalPrice } in items"
          :key="sku"
        >
          <cart-item
            :title="title"
            :image-url="imageUrl"
            :total-price="totalPrice"
            :sku="sku"
            :quantity="quantity"
            :price="price"
          />
        </li>
      </ul>

      <p
        v-if="total && total.value"
        class="app__total"
      >
        {{ total.formattedValue }}
      </p>
    </template>

    <h2
      v-else
      class="app__empty"
    >
      Is empty now. Let's add some products 😉
    </h2>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    CartItem: () => import('./CartItem.vue'),
  },
  data() {
    return {
      items: [],
      total: {},
    };
  },
  mounted () {
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { isShowCart: true }, ({ total, items }) => {
        this.total = total;
        this.items = items;
      });
    });
  },
};
</script>

<style lang="scss">
.app {
  font-family: -apple-system, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 550px;
  font-size: 18px;
  padding: 8px;
  background-color: #fafafa;
  color: #333;

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
}

.app__title {
  margin-top: 0;
  margin-bottom: 16px;
  text-align: center;
}

.app__list {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 8px;
  max-height: 469px;
  overflow-y: auto;

  li {
    &:not(:last-child) {
      border-bottom: 1px solid #bdbdbd;
    }
  }
}

.app__total {
  text-align: right;
  font-weight: 500;
  font-size: 22px;
}

.app__empty {
  text-align: center;
  font-size: 22px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 8px;
}
</style>
