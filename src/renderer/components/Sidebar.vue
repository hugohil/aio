<template>
  <aside class="sidebar container">
    <div class="sidebar__child sidebar__child--inputs">
      <h2>inputs</h2>
      <select v-model="input.type">
        <option disabled value="">Select input type</option>
        <option>file</option>
        <option>device</option>
      </select>
      <div class="inputs__type inputs__type--file" v-show="input.type === 'file'">
        <h3>file</h3>
        <button class="file__button--remove" @click="removeFileInput">&minus;</button>
        <button class="file__button--add" @click="addFileInput">&plus;</button>
        <div class="file-input__container" v-for="index in input.file.count">
          <label :for="`file-${index}`">track {{index}}:</label>
          <!-- accept="audio/*" -->
          <input
            class="file__selector"
            type="file"
            @change="onFile($event, index)"
            :id="`file-${index}`"
            :name="`file-${index}`"
          >
        </div>
      </div>
      <div class="inputs__type inputs__type--device" v-show="input.type === 'device'">
        <h3>device</h3>
      </div>
    </div>
    <div class="sidebar__child sidebar__child--outputs">
      <h2>outputs</h2>
    </div>
    <div class="sidebar__child sidebar__child--params">
      <h2>params</h2>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        input: {
          type: '',
          file: {
            count: 1,
            files: []
          }
        }
      }
    },
    methods: {
      removeFileInput () {
        if (this.input.file.count > 1) {
          this.input.file.count--
          this.input.file.files.splice(-1, 1)
        }
      },
      addFileInput () {
        this.input.file.count++
      },
      onFile ({ target }, index) {
        this.input.file.files[(index - 1)] = target.files[0]
      }
    }
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 1;
    grid-auto-rows: repeat(3, 1fr);
    width: 100%;
    height: 100%;
  }
/*  .sidebar__child {
    grid-column: 1;
  }
  .sidebar__child.sidebar__child--inputs {
    grid-row: 1;
  }
  .sidebar__child.sidebar__child--outputs {
    grid-row: 2;
  }
  .sidebar__child.sidebar__child--params {
    grid-row: 3;
  }*/
  .sidebar__child:not(:last-child) {
    border-bottom: 1px solid #000;
  }
</style>
