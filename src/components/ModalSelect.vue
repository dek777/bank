<template>
  <div class="" ref="form">
    <div class="select__wrap" @click="toggleSelect">
      <p class="select__title">Гражданство</p>
      <p class="select__text">{{ !selectedOption ? selectOptions[0] : selectedOption}}</p>
      <img src="img/arrow.png" class="select__arrow">
    </div>
    <div class="select__options-wrap">
      <div v-if="isSelectOpen" class="select__options">
        <p v-for="(option, i) in optionsWithoutSelected" :key="i" @click="changeSelectedOption(option)" class="select__option">{{option}}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data: () => {
    return {
      optionsWithoutSelected: [],
      isSelectOpen: false,
      selectedOption: ''
    }
  },
  props: {
    selectOptions: {
      type: Array
    }
  },
  mounted() {
    this.optionsWithoutSelected = [...this.selectOptions.slice(1, this.selectOptions.length+1)]
  },
  watch: {
    selectedOption: function(){
      this.optionsWithoutSelected = [...this.selectOptions.filter( (option) => option != this.selectedOption)]
    }
  },
  methods: {
    toggleSelect(){
      this.isSelectOpen = !this.isSelectOpen
      this.$refs.form.classList.toggle('active')
    },
    changeSelectedOption(option){
      this.selectedOption = option
      this.toggleSelect()
      this.$emit('changeSelectedOption', option)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/scss/variables.scss';

.select__title {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-180%);
  font-size: 0.65rem;
  color: $modal__secondary-text-color;
  z-index: 10;
  transition: transform 0.2s ease, font-size 0.2s ease;
  cursor: text;
}

.select__text{
  padding: 5px 0;
}

.select__wrap {
  position: relative;
  padding: 12px;
  width: 90%;
  height: 50px;
  outline: 0;
  border: 0;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 1rem;
  background-color: $modal__input-bg-color;
  border-radius: 5px;
  transition: all 0.2s ease;
  color: $modal__primary-text-color;
  cursor: pointer;
  @media(max-width: 430px){
    width: 85%;
  }

  .active & {
    background-color: $modal__bg-focused-input;
  }
}

.select__arrow{
  transform: translateY(-40%);
  position: absolute;
  top: 50%;
  right: 10px;
  transition: all 0.2s ease;
  width: 15px;
}

.select__wrap_active .select__arrow{
  transform: translateY(-40%) rotate(180deg);
}

.select__options-wrap{
  width: 90%;
  position: relative;
  @media(max-width: 430px){
    width: 85%;
  }
}

.select__options{
  position: absolute;
  bottom: -90px;
  left: 0;
  width: 100%;
  z-index: 7;
  padding: 12px;
  outline: 0;
  border: 0;
  transform: translateY(-100%);
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.7rem;
  background-color: $modal__bg-focused-input;
  border-radius: 5px;
  transition: all 0.2s ease;
  color: $modal__primary-text-color;

  .active &{
    transform: translateY(0);
  }

  & p {
    cursor: pointer;
    margin-bottom: 5px;
  }
}


</style>