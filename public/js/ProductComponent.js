Vue.component('products', {
    props: ['count'],
    data(){
       return {
           products: [],
           forshow: [],
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.forshow = this.$data.products.slice(0, +this.$props.count);
                }
            });
    },
    methods: {

    },
   template: `
        <div class="fetured-container">
            <product v-for="item of forshow" 
            :key="item.id_product" 
            :product="item">
            </product>
        </div>`
});
Vue.component('product', {
    props: ['product'],
    template: `
        <div class="fetured-block">
            <div class="fetured-img">
                <img :src="product.img" alt="Some img">
                <div class="hover-fog">
                    <button class="hover-fog-btn" @click="$root.$refs.head.$refs.cart.addProduct(product)">
                        <img src="/img/Vector.svg" alt="cart">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="fetured-txt">
                <a :href="'/product/product.html?id=' + product.id_product">
                    <div class="fetured-txt-title">
                        {{product.product_name}}
                    </div>
                    <div class="fetured-txt-body">
                        {{product.desc}}
                    </div>
                    <div class="fetured-txt-prise red-txt">
                        $ {{product.price}}
                    </div>
                </a>
            </div>
        </div>
    `
})