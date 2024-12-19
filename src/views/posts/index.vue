<script setup>
// Import ref and onMounted
import { ref, onMounted } from "vue";

// Import API
import api from "../../api";

// Define state
const posts = ref([]);
const selectedApi = ref("gamingapi"); // Set default API

const fetchDataPosts = async () => {
  try {
    const response = await api.get(`/${selectedApi.value}`);
    posts.value = response.data.data.data; // Ensure data structure is correct
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// Delete post
const deletePost = async (id) => {
  try {
    await api.delete(`/${selectedApi.value}/${id}`);
    fetchDataPosts(); // Refetch after delete
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

// Run hook "onMounted"
onMounted(() => {
  fetchDataPosts();
});

// Change API method
const changeApi = (apiName) => {
  selectedApi.value = apiName; // Update selected API
  fetchDataPosts(); // Fetch posts for the new API
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-12">
        <!-- API Selection Buttons -->
        <div class="mb-3 text-center">
          <button
            class="btn btn-md btn-gradient-dark me-2"
            @click="changeApi('gamingapi')"
          >
            Gaming API
          </button>
          <button
            class="btn btn-md btn-gradient-dark-secondary"
            @click="changeApi('productiveapi')"
          >
            Productive API
          </button>
        </div>

        <!-- Add New Post Button -->
        <router-link
          :to="{ name: 'posts.create' }"
          class="btn btn-md btn-success rounded shadow border-0 mb-3"
        >
          ADD NEW POST
        </router-link>

        <!-- Posts Table -->
        <div class="card border-0 rounded shadow-lg bg-dark text-light">
          <div class="card-body">
            <table class="table table-hover text-light">
              <thead class="bg-gradient-dark text-light">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col" style="width: 15%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="posts.length == 0">
                  <td colspan="4" class="text-center">
                    <div class="alert alert-warning bg-dark text-light mb-0">
                      No Data Available!
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(post, index) in posts" :key="index">
                  <td class="text-center">
                    <img
                      :src="post.image"
                      width="200"
                      class="rounded-3 shadow-sm"
                    />
                  </td>
                  <td>{{ post.name }}</td>
                  <td>{{ post.price }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'posts.edit', params: { id: post.id } }"
                      class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                    >
                      EDIT
                    </router-link>
                    <button
                      @click.prevent="deletePost(post.id)"
                      class="btn btn-sm btn-danger rounded-sm shadow border-0"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-gradient-dark {
  background: linear-gradient(135deg, #2b2b2b, #1a1a1a);
  color: #fff;
  border: none;
  transition: background 0.3s ease;
}

.btn-gradient-dark-secondary {
  background: linear-gradient(135deg, #454545, #2b2b2b);
  color: #fff;
  border: none;
  transition: background 0.3s ease;
}

.btn-gradient-dark-secondary:hover {
  background: linear-gradient(135deg, #2b2b2b, #454545);
}

.card {
  border: none;
  border-radius: 10px;
}

.table-hover tbody tr:hover {
  background-color: dimgray;
}

.bg-gradient-dark {
  background: linear-gradient(135deg, #1e1e1e, #333333);
}
</style>
