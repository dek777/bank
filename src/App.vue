<template>
  <div id="app">
    <Modal 
      :isModalVisible="isModalVisible"
       @cancel="toggleModalVisible" 
    />
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  name: 'App',
  data: () => {
    return {
      isModalVisible: false,
    }
  },
  methods: {
    toggleModalVisible(){
      this.isModalVisible = !this.isModalVisible
    }
  },
  mounted: [
    function startActionBtnListeners(){
      const buttons = document.querySelectorAll('.action-btn')
      buttons.forEach( (button) => {
        button.addEventListener ( 'click', (e) => {
          e.preventDefault()
          this.toggleModalVisible()
        })
      })
    }
  ],
  components: {
    Modal
  }
}
</script>

<style lang="scss">
#app{
  font-family: 'Geometria', 'sans-serif';
}

</style>
