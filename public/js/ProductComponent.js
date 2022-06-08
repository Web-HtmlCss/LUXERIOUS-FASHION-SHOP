Vue.component('products', {
    props: ['count'],
    data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           forshow: [],
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                    this.$data.forshow = this.$data.filtered.slice(0, +this.$props.count);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="fetured-container">
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
                    <a href="/product/product.html">
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