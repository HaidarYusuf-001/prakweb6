<script setup>
//import ref, onMounted
import { ref, onMounted } from "vue";

//import router
import { useRouter, useRoute } from "vue-router";

//import api
import api from "../../api";

//init router and route
const router = useRouter();
const route = useRoute();

//define state
const image = ref("");
const name = ref("");
const price = ref("");
const errors = ref([]);
const selectedApi = ref("gamingapi"); // Default API

//onMounted
onMounted(async () => {
  //fetch detail data post by ID dari API dinamis
  await api.get(`/${route.params.api}/${route.params.id}`).then((response) => {
    //set response data ke state
    name.value = response.data.data.name;
    price.value = response.data.data.price;
  });
});

//method "updatePost"
const updatePost = async () => {
  try {
    let formData = new FormData();
    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("image", image.value);

    formData.append("_method", "PATCH"); // Pastikan server menerima method PATCH

    await api.post(`/${selectedApi.value}/${route.params.id}`, formData);
    router.push({ path: `/${selectedApi.value}/posts` });
  } catch (error) {
    console.error("Error updating post:", error);
    errors.value = error.response.data;
  }
};

//method for handle file changes
const handleFileChange = (e) => {
  //assign file to state
  image.value = e.target.files[0];
};

//method "changeApi"
const changeApi = (apiName) => {
  selectedApi.value = apiName;

  // Re-fetch data when API changes
  api.get(`/${selectedApi.value}/${route.params.id}`).then((response) => {
    name.value = response.data.data.name;
    price.value = response.data.data.price;
  });
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <!-- Dropdown to select API -->
            <div class="mb-3">
              <label class="form-label fw-bold">Select API</label>
              <select
                class="form-select"
                v-model="selectedApi"
                @change="changeApi(selectedApi)"
              >
                <option value="gamingapi">Gaming API</option>
                <option value="productiveapi">Productive API</option>
              </select>
            </div>

            <form @submit.prevent="updatePost()">
              <div class="mb-3">
                <label class="form-label fw-bold">Image</label>
                <input
                  type="file"
                  class="form-control"
                  @change="handleFileChange($event)"
                />
                <div v-if="errors.image" class="alert alert-danger mt-2">
                  <span>{{ errors.image[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Name Post"
                />
                <div v-if="errors.name" class="alert alert-danger mt-2">
                  <span>{{ errors.name[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Price</label>
                <textarea
                  class="form-control"
                  v-model="price"
                  rows="5"
                  placeholder="Price Post"
                ></textarea>
                <div v-if="errors.price" class="alert alert-danger mt-2">
                  <span>{{ errors.price[0] }}</span>
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-md btn-primary rounded-sm shadow border-0"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
