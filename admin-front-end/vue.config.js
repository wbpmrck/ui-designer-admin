module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
  ? '/production-sub-path/'
  : '/'
  ,outputDir:'dist'
  ,assetsDir:''
  ,indexPath:'index.html' // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。

  ,lintOnSave:true // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  ,runtimeCompiler:false // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  ,productionSourceMap:true // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  ,crossorigin:undefined // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。

  ,devServer: {
    overlay: { //让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    }
  }
  ,configureWebpack:{
    devtool: 'eval'
  } //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
}