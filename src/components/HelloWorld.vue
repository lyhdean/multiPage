<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <button @click="toinfoone">toinfoone</button>
    <button @click="toinfotwo">toinfotwo</button>
    <button @click="toinfothree">toinfothree</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    toinfoone:function(){
          window.open("infoone.html","_blank");
    },
    toinfotwo:function(){
          window.open("infotwo.html","_blank");
    },
    toinfothree:function(){
          window.open("infothree.html","_blank");
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
