<template>     
     <div class="form-image">
        <el-input 
        class="image-url-input"
        v-model="val"
        >
               <el-upload 
                slot="prefix" 
                class="uploader ud-v-middle"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :limit="1"
                :show-file-list="false"
                :before-upload="fileBeforeUpload"
                :on-progress="fileUploadProgress"
                :on-change="fileChange"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :auto-upload="true">
                <div slot="trigger" class="upload-icon icon-5 pressable" title="点击上传本地图片"></div>
              </el-upload>
        </el-input>
     </div>
</template>

<script>

export default {
  name: 'form-image',
  props: {
  },
  components: {
  },
  data(){
    return {
      val:""
    };
  },
  methods:{
      submitUpload() {
        this.$refs.upload.submit();
      },
      fileChange(arg){
        //TODO:在选择文件的时候，自动调用上传，并拿到最终的资源地址，写在文本框里
        console.log(`file change `)
        console.log(arg)
      },
      fileUploadSuccess(arg){
        console.log(`fileUploadSuccess `)
        console.log(arg)
      },
      fileUploadError(arg){
        console.log(`fileUploadError `)
        console.log(arg)
      },
      fileUploadProgress(arg){
        console.log(`fileUploadProgress `)
        console.log(arg)
      },
        fileBeforeUpload(arg){
        console.log(`fileBeforeUpload `)
        console.log(arg)
      },
  }
}
</script>

<style lang="scss" scoped>

.form-image {    
  .uploader {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: initial;
  }
  .upload-icon {
    width: 18px;
    min-width: 18px;
    height: 18px;
    background-position: 0 0;
  }
  .upload-icon:hover {
    background-position: 0px -80px;
  }
 /* 定制的输入框，因为在prefix里添加了图片上传的按钮，所以需要把文本框内容区缩短 */
  .image-url-input {
    padding-left:28px; 
   }
}
</style>
