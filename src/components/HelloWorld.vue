<template>
  <div class="hello">
    <img alt="Vue logo" src="@/assets/img/logo-login.png" />
    <h1>{{ msg }}</h1>
    <p>
      Para obter um guia sobre como configurar / personalizar este ambiente, <br>
      Confira nossa
      <a href="#" target="_blank" rel="noopener">documentação</a>.
    </p>
    
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .hello {
    font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
 }
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
