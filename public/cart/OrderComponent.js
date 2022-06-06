Vue.component('order', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
     //     showCart: false,
          amount: 0,
      //    countGoods: 0
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
                this.$data.amount = data.amount;
        //        this.$data.countGoods = data.countGoods;
            });
            
    },
    methods: {
        removeProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            this.$parent.deleteJson(`/api/cart/${ item.id_product }`)
            .then(data => {
                if (data.result) {
                    this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    this.countGoods--;
                    this.amount -= (find.price * find.quantity);
                } else {
                    console.log('error');
                }
            })
        },
    },
    template: `<div class="cartFirstPart__items">
                  <order-item v-for="item of cartItems" 
                  :key="item.id_product" 
                  :orderItem="item">
                  </order-item>
               </div>
    `

});

Vue.component('order-item', {
    props: ['orderItem'],
    template: `<div class="cartFirstPart__item b-cartItem b-cartItem_shadow">
                   <img class="b-cartItem__img" :src="orderItem.img" alt="1">
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
                   <img class="b-cartItem__close" src="img/x.png" alt="x">
               </div>
    `


})
