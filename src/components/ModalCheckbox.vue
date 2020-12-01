<template>
  <div class="checkbox__wrap">
    <div @click="toggleCheckbox" class="checkbox" :class="{checked : isChecked}">
      <span></span>
    </div>
    <span class="checkbox__text"><slot></slot></span>
  </div>
</template>
  
<script>
export default {
  data(){
    return {
      isChecked: false
    }
  },
  methods: {
    toggleCheckbox(){
      this.isChecked = !this.isChecked
      this.$emit('toggleCheckbox', this.isChecked)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/scss/variables.scss';

.checkbox{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: $modal__input-bg-color;
  margin-right: 12px;
  cursor: pointer;
  position: relative;

  &__wrap{
    margin: 1rem 0;
    display: flex;
    align-items: center;
  }

  &__text{
    font-size: 0.7rem;
    font-weight: 200;
  }

  & span{
    opacity: 0;
  }
}

  .checked span  {
    position: absolute;
    content: url('/img/checked.png');
    width: 18px;
    height: auto;
    left: 0;
    top: 50%;
    opacity: 1;
    transform: translateY(-50%);
    transition: opacity 0.1s ease-out-in;
  }
</style>