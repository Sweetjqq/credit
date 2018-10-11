<template>
    <div>
        <quill-editor
                :value="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
        </quill-editor>
    </div>

</template>
<script>
  import { quillEditor , Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import {IpUrl,ImageUrl} from '../../config/IpUrl'
  import {setStore,getStore,getCookie} from '../../config/mUtils'
  Quill.register('modules/ImageExtend', ImageExtend)
  export default{
    components: {quillEditor},
    props: ['content','myQuillEditor'],
    data() {
      return {
        contents: "",
        editorOption: {
          modules: {
            ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
              name: 'img',  // 图片参数名
              size: 10,  // 可选参数 图片大小，单位为M，1M = 1024kb
              action: ImageUrl,  // 服务器地址, 如果action为空，则采用base64插入图片
              response: (res) => {
                var picIp;
                if (HOST == "http://10.21.10.192") {
                  picIp = "http://10.21.10.170/";
                } else if (HOST == "http://192.168.10.91") {
                  picIp = "http://192.168.10.94/";
                } else{
                  picIp = "https://imgs.fw-fintech.com/";
                }
                console.log(HOST,"HOST");
                console.log(picIp,"picIp");
                return picIp+res.ReturnParam //后台返回的图片url
              },
              headers: (xhr) => {
                 xhr.setRequestHeader('Authorization',"bearer " +getCookie("Token"))
              },  // 可选参数 设置请求头部
              sizeError: () => {
              },  // 图片超过大小的回调
              start: () => {
              },  // 可选参数 自定义开始上传触发事件6
              end: () => {
              },  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              error: () => {
              },  // 可选参数 上传失败触发的事件
              success: () => {
              },  // 可选参数  上传成功触发的事件
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                // formData.append('token', 'myToken')
              },// 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },
            toolbar: {  // 如果不上传图片到服务器，此处不必配置
              container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//              ['blockquote', 'code-block'],

//              [{'header': 1}, {'header': 2}],               // custom button values
//                [{'list': 'ordered'}, {'list': 'bullet'}],
//              [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'direction': 'rtl'}],                         // text direction

              [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
              [{'header': [1, 2, 3, 4, 5, 6, false]}],

//              [{'color': []}, {'background': []}],          // dropdown with defaults from theme
              [{'font': []}],
                [{'align': []}],
                ['link', 'image'],
//              ['clean']
              ],  // container为工具栏，此次引入了全部工具栏，也可自行配置
              handlers: {
                'image': function () {  // 劫持原来的图片点击按钮事件
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    computed:{
      editor() {

      }
    },
    methods:{
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件

      },
      onEditorChange({editor, html, text}){//内容改变事件
//        console.log(this.$refs.myQuillEditor,"%%%%%%%%%%%%");
//       console.log(html,"html");
//        console.log(text,"text");
      }
    }
  }
</script>
<style scoped>
.avatar-uploader{
    /*border:1px solid red;*/
    position: absolute;
    top:-1000000000px;
    left: -1000000000px;
    z-index: -100;
}
</style>
