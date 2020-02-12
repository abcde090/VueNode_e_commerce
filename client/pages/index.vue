<template>
<main class="listingPage">
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-2 col-lg-3 md-4 col-sm-4">
        <!-- Sidebar -->
      </div>

      <!-- Main Content -->
      <div class="col-xl-10 col-lg-9 md-8 col-sm-8">
        <FeatureProduct />
      </div>

    </div>
  </div>
</main>
</template>

<script>
import FeatureProduct from '~/components/FeatureProduct'
export default {
  components: {
    FeatureProduct
  }
};
</script>
