<template>
  <div class="top-bar">
    <div class="btn save">
      <span class="icon"></span><span class="title">保存</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.top-bar {    
  position: fixed;
  left: 0;
  top: 0;
  z-index: 120;
  width: 100%;
  height: 37px;
  border-bottom: 1px solid #151515;
  background: #353535;

  display: flex;
  flex-direction: row;
  align-items: center;
}
.btn:hover {
  cursor: pointer;
  background-color: #000;
}
.btn:hover .title {
  color:#fff;
  font-weight: bold;
}
.btn:hover .icon {
}
.btn.save .icon{

    width: 22px;
    height: 24px;
  background-position: -40px 0;
  float: left;
}
.btn .title {
    height: 24px;
    line-height: 24px;
    display: block;
    float: left;
    font-size: 12px;
    color: #b5b5b5;
    /* float: left; */
    transform: scale(.9);
}

</style>
