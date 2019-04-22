<template>
  <div class="ud-page">{{udObject.name().value}}</div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    name: 'ud-page',
    data() {
      return {};
    },
    props: {
      udObject: {
        type: Object,
        default: {}
      }
    },
    methods: {},
    created() {},
    mounted() {},
    computed: {}
  };
</script>

<style lang="scss" scoped>
  .ud-page {
  }
</style>