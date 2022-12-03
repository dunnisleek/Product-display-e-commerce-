app.component('product-display',{
    props:{
         premium:{
            type:Boolean,
            required:true
         }
        },
    template:
    /*html*/
   `<div class="product-display">
    <div class="product-container">
       <div class="product-image">
           <img :src="image">
           
       </div>
       <div class="product-info">
         <h1>{{title}}</h1>
         <p>{{description}}</p>
        //  props
         <p>shipping detail:{{shipping}}</p>

         <product-details :details="details"></product-details>
         <a :href="url"> click the link</a>
         <!-- <p v-show="inStock">Still Available</p> -->
         <p v-if="inStock">Still Available</p> 
      <p v-else>Out of Stock</p> 
     <!--
     <p v-if="inventory > 10"> In stock</p>
     <p v-else-if="inventory <= 10 && inventory >0">Almost sold out</p>
      <p v-else>Out of stocck</p>
      <p v-if="onsale">{{saleMessage}}</p>
      <p v-else></p> -->
      
      <!-- List Rendering-->
      
      <p v-for="item in sizes" :key='item.id'>{{item.size}}-{{item.id}}</p>
     
   
      <p class="color-circle hov"
        v-for="(colors, index) in variants"
        :key="colors.id" 
         @mouseover="updateVariant(index)"
         :style="{background:colors.color}">
         <!--{{colors.color}} -->
     </p>
   
        <!-- event listerner -->
    <!-- <p class="cartbtn">{{cart}}</p>-->
       <button class="button" 
       :class="{disabledButton:!inStock }"
       :disabled="!inStock" 
       @click="addToCart"> Add to Cart </button> 
       <!-- <span>Add to Cart</span>-->
        <button class="button" @click="reduceToCart">Reduce</button> 
     

    </div>
    
    <!--this is the review form-->
    <!--the v-if on review-list means it should only display if the form as an input-->
    <review-list v-if="reviews.length"  :reviews="reviews"></review-list>
    <review-form @review-submitted='addReview'></review-form>
    </div>
       </div>`,

       data(){
        return{
           
            product : 'Sock',
            brand:'gucci',
            description: "sock can be use at winter, buy from us",
            details: ['50% cotton', '30% wool', '20% polyester'],
            // image:'images/socks_blue.jpeg',
            selectedVariant: 0,
            url:'https://www.vuemastery.com/',
            // inStock:false,
            inventory:2,
            onsale:true,
            sizes:[
                {id:1, size:40},
                {id:2, size:39},
                {id:3, size:38}
            ],
            variants:[
              { id:11, color:'green', image:'images/socks_green.jpeg', quantity: 50},
              {id:12, color:'blue', image:'images/socks_blue.jpeg', quantity: 0}
            ],
            reviews:[]
        }
    },
    computed:{
       title(){
        return this.product + " " + this.brand
       },
       image(){
        return this.variants[this.selectedVariant].image
       },
       inStock(){
        return this.variants[this.selectedVariant].quantity
       },
       saleMessage(){
        if(this.onsale){
            return this.product +' ' +this.brand + ' ' + 'is on sale'
        } 
        return 'sorry no sales'
       },
       shipping(){
        if(this.premium){
            return 'Free'
        }
        return 2.99
    
       }
    },
    methods:{
      
        updateVariant(index){
            this.selectedVariant = index
           
        },
        addReview(review){
            this.reviews.push(review)
        },
         addToCart(){
           this.$emit('add-to-cart')
        },
        // reduceToCart(){
        //     this.$emit('remove')
        // }
        // reduceToCart(){
        //     if(this.cart >0)
        //     this.cart --
        // },
    }

    
});