<template>
  <h1>Tela home</h1>
</template>

<script>
import AsyncUserStoraged from "@/assets/scripts/asyncUserStoraged";

export default {
  extends: AsyncUserStoraged,
  name: 'home',
  layout: 'standard',
  middleware: 'auth',
  created() {    
    if(this.actualUser === null || this.actualUser === undefined)    
      this.$router.push("/lobby");
    else{
      console.log("actual user home");
      console.log(this.actualUser);
    }  
  }

  
}
</script>
