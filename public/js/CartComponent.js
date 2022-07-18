Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
          amount: 0,
          countGoods: 0
      }
    },
    mounted(){
        this.$root.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
                this.$data.amount = data.amount;
                this.$data.countGoods = data.countGoods;
            });
            
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$root.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$root.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
                this.countGoods++;
            }
            this.amount += item.price;
        
        },
    },
    template: `<div style="display: inline-block">
               <a href="/cart/cart.html" @mouseover="showCart = true" @mouseout="showCart = false" class="menu-p cart">
                   <div class="cart-items">
                       <img src="/img/headcart.png" alt="" class="menu-img">
                       <span>{{ countGoods }}</span>
                   </div>
               </a>

               <div class="cart-panel" v-show="showCart">
                   <div class="cartPanel-header">
                       <div class="prod-name">Товар</div>
                       <div>Кол-во</div>
                       <div>Цена</div>
                       <div>Сумма</div>
                   </div>
                   <hr>
                   <div class="cartPanel-items">
                       <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item">
                       </cart-item>
                   </div>
                   <h3 v-show="cartItems.length==0">Нет данных...</h3>
                   <div class="cartPanel-total">
                       Итого: <span class="cart-total">{{ amount.toFixed(2) }}</span> $
                   </div>
               </div>
               </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<div class="cartPanel-item"">
                   <div class="prod-name">{{ cartItem.product_name }}</div>
                   <div>{{ cartItem.quantity }}</div>
                   <div>{{ cartItem.price }}</div>
                   <div>{{(cartItem.quantity*cartItem.price).toFixed(2)}}</div>
               </div>
    `
})
