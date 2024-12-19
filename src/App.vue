<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand logo">
          <span>HOME</span>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-th-large"></i> POSTS
              </a>
              <ul
                class="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <router-link
                    :to="{ name: 'posts.index', params: { api: 'gamingapi' } }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-gamepad"></i> Gaming API
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'posts.index',
                      params: { api: 'productiveapi' },
                    }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-chart-line"></i> Productive API
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <a href="#" target="_blank" class="btn btn-login">
              <i class="fas fa-sign-in-alt"></i> LOGIN
            </a>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ModernNavbar",
};
</script>

<style scoped>
.app-container {
  background-color: #121212;
  color: #e0e0e0;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
}

.custom-navbar {
  background: linear-gradient(90deg, #1a1a1a, #333333);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #444;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00c9a7;
}

.navbar-brand.logo span {
  background: linear-gradient(45deg, #00c9a7, #005bea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link {
  color: #e0e0e0;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #00c9a7;
}

.dropdown-menu-dark {
  background-color: #1f1f1f;
  border: 1px solid #444;
}

.dropdown-item {
  color: #e0e0e0;
}

.dropdown-item:hover {
  background-color: #333;
  color: #00c9a7;
}

.btn-login {
  background: linear-gradient(90deg, #00c9a7, #005bea);
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: linear-gradient(90deg, #005bea, #00c9a7);
}
</style>
