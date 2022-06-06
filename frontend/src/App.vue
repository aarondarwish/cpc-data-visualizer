<template>
  <!-- <BarChart v-if="renderComponent" /> -->
  <BarChart />
</template>

<script>
import BarChart from './components/ChartComponent';

export default {
  name: 'App',
  components: {
    BarChart 
  }
}
// 
//  export default {
//    data() {
//      return {
//        renderComponent: true,
//      };
//    },
//    methods: {
//      forceRerender() {
//        // Remove my-component from the DOM
//        this.renderComponent = false;
//
//        this.$nextTick(() => {
//          // Add the component back in
//          this.renderComponent = true;
//        });
//      }
//    }
//  };

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
