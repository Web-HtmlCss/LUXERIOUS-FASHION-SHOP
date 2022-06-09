Vue.component('good', {
    data(){
      return {
          product: { "id_product": 0, "product_name": "нет данных", "price": 0, "img": "/img/0.jpg", "desc": "нет данных..." },
      }
    },
    mounted(){
        let id = new URLSearchParams(document.location.search).get("id");
        this.$parent.getJson(`/api/product/${id}`)
            .then(data => {
                this.$data.product = data
            });
    },
    template: `
        <div>    
            <div class="b-slider">
                <div class="b-slider__slideLeft"></div>
                <img class="b-slider__image" :src="product.img" alt="">
                <div class="b-slider__slideRight"></div>
            </div>
            <div class="b-collection b-collection_centrize">
                <div class="b-collection__title">
                    NEW COLLECTION
                </div>
                <div class="b-collection__separator b-collection__separator_pink"></div>
                <div class="b-collection__subtitle">
                    {{product.product_name}}
                </div>
                <div class="b-collection__descr">
                    {{product.desc}}
                </div>
                <div class="b-collection__prise">
                    {{product.price}}
                </div>
                <div class="b-collection__separator b-collection__separator_grey"></div>
                <div class="b-collection__choose b-choose">
                    <span class="b-choose__item">
                        CHOOSE COLOR
                        <img class="b-choose__img" src="img/down.png" alt="down">
                    </span>
                    <span class="b-choose__item">
                        CHOOSE SIZE
                        <img class="b-choose__img" src="img/down.png" alt="down">
                    </span>
                    <span class="b-choose__item">
                        QUANTITY
                        <img class="b-choose__img" src="img/down.png" alt="down">
                    </span>
                </div>
                <button class="b-collection__button" @click="$root.$refs.head.$refs.cart.addProduct(product)">
                    <img src="img/cartRed.svg" alt="cart">
                    Add to Cart
                </button>
            </div>
        </div>
    `

});

