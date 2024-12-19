<script setup>
// Import ref
import { ref } from "vue";

// Import router
import { useRouter } from "vue-router";

// Import api
import api from "../../api";

// Initialize router
const router = useRouter();

// Define state
const image = ref("");
const name = ref("");
const price = ref("");
const errors = ref([]);
const selectedApi = ref("gamingapi"); // Default API

// Method for handling file changes
const handleFileChange = (e) => {
  image.value = e.target.files[0];
};

// Method "storePost"
const storePost = async () => {
  try {
    let formData = new FormData();
    formData.append("name", name.value); // Check the name field according to the API
    formData.append("price", price.value);
    formData.append("image", image.value);

    await api.post(`/${selectedApi.value}`, formData);
    router.push({ path: `/${selectedApi.value}/posts` }); // Redirect after success
  } catch (error) {
    console.error("Error adding post:", error);
    errors.value = error.response.data; // Display error from backend
  }
};

// Method "changeApi"
const changeApi = (apiName) => {
  selectedApi.value = apiName;
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg bg-dark text-light border-0 rounded-xl">
          <div class="card-body p-5">
            <!-- Dropdown to select API -->
            <div class="mb-4">
              <label class="form-label fw-bold text-white">Select API</label>
              <select
                class="form-select bg-dark text-light rounded-lg border-0 shadow-sm"
                v-model="selectedApi"
                @change="changeApi(selectedApi)"
              >
                <option value="gamingapi">Gaming API</option>
                <option value="productiveapi">Productive API</option>
              </select>
            </div>

            <form @submit.prevent="storePost()">
              <!-- Image Upload -->
              <div class="mb-4">
                <label class="form-label fw-bold text-white">Image</label>
                <input
                  type="file"
                  class="form-control bg-dark text-light rounded-lg border-0 shadow-sm"
                  @change="handleFileChange($event)"
                />
                <div v-if="errors.image" class="alert alert-danger mt-2">
                  <span>{{ errors.image[0] }}</span>
                </div>
              </div>

              <!-- Name Input -->
              <div class="mb-4">
                <label class="form-label fw-bold text-white">Name</label>
                <input
                  type="text"
                  class="form-control bg-secondary text-light rounded-lg border-0 shadow-sm"
                  v-model="name"
                  placeholder="Name Post"
                />
                <div v-if="errors.name" class="alert alert-danger mt-2">
                  <span>{{ errors.name[0] }}</span>
                </div>
              </div>

              <!-- Price Input -->
              <div class="mb-4">
                <label class="form-label fw-bold text-white">Price</label>
                <input
                  type="text"
                  class="form-control bg-secondary text-light rounded-lg border-0 shadow-sm"
                  v-model="price"
                  placeholder="Price Post"
                />
                <div v-if="errors.price" class="alert alert-danger mt-2">
                  <span>{{ errors.price[0] }}</span>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="btn btn-primary btn-lg w-100 rounded-lg shadow-lg border-0"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dark theme */
body {
  background-color: #121212;
  color: #e0e0e0;
}

/* Card Styles */
.card {
  background-color: #1e1e1e;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Form Elements */
.form-select,
.form-control,
textarea {
  background-color: #4a4a4a; /* Lighter background for input fields */
  color: #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #444;
}

button {
  background-color: #007bff;
  border-radius: 12px;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
}

.alert {
  background-color: #ff4444;
  color: white;
}

/* Inputs and select focus effects */
.form-control:focus,
.form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

textarea:focus {
  border-color: #007bff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .col-md-8 {
    max-width: 100%;
  }
}
</style>
