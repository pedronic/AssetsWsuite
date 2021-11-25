<template>
  <div class="home">
    <img alt="Licença Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" />
    <HelloWorld msg="Licença Creative Commons" />
    <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
    
    </a>
    <br />
    <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">W Suite</span> de <a xmlns:cc="http://creativecommons.org/ns#" href="wtechnology.com.br" property="cc:attributionName" rel="cc:attributionURL">W Technology</a> está licenciado com uma Licença <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons - Atribuição-NãoComercial-SemDerivações 4.0 Internacional</a>.<br />Baseado no trabalho disponível em <a xmlns:dct="http://purl.org/dc/terms/" href="wtechnology.com.br" rel="dct:source">wtechnology.com.br</a>.<br />Podem estar disponíveis autorizações adicionais às concedidas no âmbito desta licença em <a xmlns:cc="http://creativecommons.org/ns#" href="wtechnology.com.br/contato" rel="cc:morePermissions">wtechnology.com.br/contato</a>.
  
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
export default {
  components: {
    HelloWorld,
  },
  name: "Licence",
};
</script>

<style>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>