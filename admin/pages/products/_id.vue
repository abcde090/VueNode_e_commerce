<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Update {{ product.title }}</h2>
            <form>
              <!-- Category Dropdown -->
              <div class="a-spacing-top-medium">
                <label>Categoty</label>
                <select class="a-select-option" v-model="categoryID">
                  <option v-for="category in categories" :value="category._id"
                  :key="category._id"> {{ category.type }} </option>
                </select>
              </div>
              <!-- Owner -->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerID">
                    <option v-for="owner in owners" :value="owner._id"
                  :key="owner._id"> {{ owner.name }} </option>
                </select>
              </div>
              <!-- Title  -->
              <div class="a-spacing-top-medium">
                <label class="margin-bottom: 0px">Title</label>
                <input type="text" class="a-input-text" style="width: 100%" v-model="title" :placeholder="product.title"/>
              </div>
              <!-- Price -->
              <div class="a-spacing-top-medium">
                <label class="margin-bottom: 0px">Stock</label>
                <input type="number" class="a-input-text" style="width: 100%" v-model="stockQuantity" :placeholder="product.stockQuantity"/>
              </div>
              <!-- Stock quantity -->
              <div class="a-spacing-top-medium">
                <label class="margin-bottom: 0px">Price</label>
                <input type="number" class="a-input-text" style="width: 100%" v-model="price" :placeholder="product.price"/>
              </div>
              <!-- Description -->
              <div class="a-spacing-top-medium">
                <label class="margin-bottom: 0px">Description</label>
                <textarea
                  style="width: 100%"
                  v-model="description"
                  :placeholder="product.description"
                ></textarea>
              </div>
              <!-- Photo -->
              <div class="a-spacing-top-medium">
                <label class="margin-bottom: 0px">Add a photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFile" />
                    <p style="margin-top:-70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="updateProduct">Update product</span>
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  // async fetch data before page is loaded on the browser, it is good for SEO because data
  // will be loaded first.
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get(
        "http://localhost:3001/api/categories"
      );
      let owners = $axios.$get("http://localhost:3001/api/owners");
      let product = $axios.$get(`http://localhost:3001/api/products/${params.id}`);
      const [catResponse, ownerResponse, productResponse] = await Promise.all([
        categories,
        owners,
        product
      ])

      console.log(productResponse);
      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners,
        product: productResponse.product
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: "",
      price: "",
      description: "",
      selectedFile: null,
      fileName: "",
      stockQuantity: "",
    };
  },


  methods: {
    onFile(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
    },

    async updateProduct() {
      let data = new FormData();
      data.append('title', this.title);
      data.append('price', this.price);
      data.append('stockQuantity', this.stockQuantity);
      data.append('description', this.description);
      data.append('ownerID', this.ownerID),
      data.append('categoryID', this.categoryID),
      data.append('photo', this.selectedFile, this.selectedFile.name);

      let result = await this.$axios.$put(`http://localhost:3001/api/products/${this.$route.params.id}`, data);
      this.$router.push('/');
    }
  }
};
</script>
