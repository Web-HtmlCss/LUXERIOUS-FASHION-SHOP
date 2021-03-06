Vue.component('order', {
    data(){
      return {
        cart: this.$root.$refs.head.$refs.cart,
    }
    },
    methods: {
        removeProduct(item){
            let find = this.cart.cartItems.find(el => el.id_product === item.id_product);
            this.$parent.deleteJson(`/api/cart/${ item.id_product }`)
            .then(data => {
                if (data.result) {
                    this.cart.cartItems.splice(this.cart.cartItems.indexOf(item), 1);
                    this.cart.amount = +(this.cart.amount - find.price * find.quantity).toFixed(2);
                    this.cart.countGoods--;
                } else {
                    console.log('error');
                }
            })
        },
        removeAll(){
            this.$parent.deleteJson(`/api/cart`)
            .then(data => {
                if (data.result) {
                    this.cart.cartItems = [];
                    this.cart.amount = 0;
                    this.cart.countGoods = 0;
                } else {
                    console.log('error');
                }
            })
        },
    },
    template: `
        <main class="cartBody">
            <div class="cartFirstPart">
                <div class="cartFirstPart__items">
                    <order-item v-for="item of cart.cartItems" 
                    :key="item.id_product" 
                    :orderItem="item">
                    </order-item>
                </div>
                <div class="cartFirstPart__buttons">
                    <button class="cartFirstPart__button" @click="removeAll()">CLEAR SHOPPING CART</button>
                    <a href="/catalog/catalog.html">
                        <button class="cartFirstPart__button">CONTINUE SHOPPING</button>
                    </a>
                </div>
            </div>
            <div class="cartSecondPart">
                <div class="cartSecondPart__address b-address">
                    <div class="b-address_title">
                        SHIPPING ADRESS
                    </div>
                    <input type="text" name="country" placeholder="Bangladesh" class="b-address__input b-address__country">
                    <input type="text" name="state" placeholder="State" class="b-address__input b-address__state">
                    <input type="text" name="zip" placeholder="Postcode / Zip" class="b-address__input b-saddress__zip">
                    <button class="b-address__btn">GET A QUOTE</button>
                </div>
                <div class="cartSecondPart__checkout b-checkout">
                    <div class="b-checkout__sub">
                        SUB TOTAL <span class="b-checkout__subprice">$ {{cart.amount.toFixed(2)}}</span>
                    </div>
                    <div class="b-checkout__total">
                        GRAND TOTAL <span class="b-checkout__totalprice red-txt">$ {{cart.amount.toFixed(2)}}</span>
                    </div>
                    <div class="b-checkout__separator"></div>
                    <button class="b-checkout__btn">PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </main>

    `

});

Vue.component('order-item', {
    props: ['orderItem'],
    template: `<div class="cartFirstPart__item b-cartItem b-cartItem_shadow">
                   <a :href="'/product/product.html?id=' + orderItem.id_product">
                        <img class="b-cartItem__img" :src="orderItem.img" alt="1">
                   </a>
                   <div class="b-cartItem__descr">
                       <div class="b-cartItem__title">
                           {{ orderItem.product_name }}
                       </div>
                       <div class="b-cartItem__var">
                           Price: <span class="red-txt">$ {{ orderItem.price }}</span>
                       </div>
                       <div class="b-cartItem__var">
                           Color: <span class="b-cartItem__val">Red</span>
                       </div>
                       <div class="b-cartItem__var">
                           Size: <span class="b-cartItem__val">Xl</span>
                       </div>
                       <div class="b-cartItem__var">
                           Quantity: <div class="b-cartItem__valQ">{{ orderItem.quantity }}</div>
                       </div>
                   </div>
                   <img class="b-cartItem__close" @click="$parent.removeProduct(orderItem)" src="img/x.png" alt="x">
               </div>
    `


})
