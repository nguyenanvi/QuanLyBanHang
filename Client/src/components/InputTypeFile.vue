<script>
import Marquee from './Marquee.vue';

const init = {
  filename : "Choose file..."
}
export default{
  name:"InputTypeFile",
  components:{
    Marquee
  },
  props:['iaccept', 'icapture'],
  data(){
    return {
      filename: init.filename
    }
  },
  methods:{
    fileChangedHandler($event){
      const target = $event.target;
      const file = target.files[0];
      if (target && target.files) {
        this.$emit('fileSelected', file.value);
      }
      this.filename = file.name;
    },
    clearFile($event) {
      $event.target.value = null;
      this.filename = init.filename;
      this.$emit('cleared');
    }
  }
}
</script>

<template>
  <label class="file">
    <input 
      type="file" 
      :accept="iaccept"
      :capture="icapture"
      @click="clearFile($event)"
      @change="fileChangedHandler($event)"
    >
    <span class="file-custom"><Marquee>{{ filename }}</Marquee></span>
  </label>
</template>

<style scoped>
 .file {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 36px;
  width: 100%;
}
.file input {
  min-width: inherit;
  margin: 0;
  filter: alpha(opacity=0);
  opacity: 0;
}
.file-custom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 1rem;
  padding: .5rem 1rem;
  line-height: 1;
  color: #555;
  background-color: #fff;
  border: .075rem solid #ddd;
  border-radius: .25rem;
  box-shadow: inset 0 .2rem .4rem rgba(0,0,0,.05);
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1rem;
  white-space: nowrap;
  &:hover:before{
    display: none;
  }
}
.file-custom:before {
  position: absolute;
  top: -.075rem;
  right: -.075rem;
  bottom: -.075rem;
  z-index: 6;
  display: block;
  content: "Browse";
  height: 1rem;
  padding: .5rem 1rem;
  line-height: 1;
  color: #555;
  background-color: #eee;
  border: .075rem solid #ddd;
  border-radius: 0 .25rem .25rem 0;
}

/* Focus */
.file input:focus ~ .file-custom {
  box-shadow: 0 0 0 .075rem #fff, 0 0 0 .2rem #0074d9;
}
</style>