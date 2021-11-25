<template>
  <footer class="page-footer" role="contentinfo">
    <div class="d-flex align-items-center flex-1 text-muted">
      <span class="hidden-md-down fw-700">
        2021 © W Suite &nbsp;
        <a href="https://www.wtechnology.com.br" class="text-primary fw-500" title="W suite" target="_blank" >W Technology</a>
        </span
      >
    </div>
    <div>
      <ul class="list-table m-0">
        <li>
          <a href="intel_introduction.html" class="text-secondary fw-700"
            >Sobre</a
          >
        </li>
        <li class="pl-3">
          <router-link to="/license" class="text-secondary fw-700">
            License
          </router-link>
        </li>
        <li class="pl-3">
          <a href="https://wtchnology.com.br/info_app_docs.html" class="text-secondary fw-700"
            >Documentation</a
          >
        </li>
        <li class="pl-3 fs-xl">
          <a
            href="https://wtchnology.com.br"
            class="text-secondary"
            target="_blank"
            ><i class="fal fa-question-circle" aria-hidden="true"></i
          ></a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
</style>