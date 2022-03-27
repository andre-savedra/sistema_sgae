export default {

    async asyncData({ $auth, $router }) {
        //cheack if there is value storaged
        const actualUser = await $auth.$storage.getUniversal("actualUserStoraged");
        if(actualUser){
          console.log("Storaged already defined extends");
          console.log(actualUser)
          return {
            actualUser,
          };
        }    
      },
}