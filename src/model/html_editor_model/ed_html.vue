<template>
  <div >
    <vue-editor id="editor" 
    useCustomImageHandler 
    @image-added="handleImageAdded" @blur="changeHtml" v-model="htmlText"> </vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import API from "@api/api_upload";

export default {
    props:{
      params:{
        type:Object,
            default:()=>{
                return {html:""}
            }

      },
    },
  components: {
    VueEditor
  },
  computed:{


  },
  data() {
    return {
      htmlText: ""
    };
  },
  mounted(){
        this.htmlText=this.params.html
    },
  methods: {
    changeHtml(){
      this.$emit("changeParam",this.htmlText);
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      API.upload({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>