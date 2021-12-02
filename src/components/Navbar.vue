<template>
  <nav class="navbar navbar-expand-lg navbar-light nav-pills justify-content-between px-3" style="background-color: #e3f2fd;">
  <router-link to="/" class="navbar-brand px-3" >Video Player</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/" class="nav-link" >Home <span class="sr-only">(current)</span></router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>

</style>