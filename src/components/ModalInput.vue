<template>
  <div class="">
    <div class="form-group" ref="formGroup">
      <div class="input-wrap">
        <label @click="inputFocus" class="form-label" for="input"><slot></slot></label>
        <input 
          @focus="onFocus" 
          @blur="onBlur" 
          name="input" 
          class="form-input" 
          type="text"
          ref="formInput"
          v-model.trim="inputedText" 
        />
      </div>
      <div ref="validated" class="validated"></div>
    </div>
    <p v-if="errorText" class="error-message">{{errorText}}</p>
  </div>
</template>

<script>
import { required, minLength, email, between } from 'vuelidate/lib/validators'

export default {
  data: () => {
    return {
      inputedText: '',
      errorText: ''
    }
  },
  props:{
    validateType: {
      type: String,
      default: 'string'
    }
  },
  validations: {
    inputedText: { required, minLength: minLength(6), email, between: between (11111111111, 99999999999) }
  },
  methods: {
    onFocus() {
      this.$refs.formGroup.classList.add('focused')
    },
    onBlur() {
      const formGroup = this.$refs.formGroup
      if (!this.validate()) {
        formGroup.classList.remove('validated-ok')
        formGroup.classList.add('validated-error')
        !this.$v.inputedText.required ? formGroup.classList.remove('focused') : null
        this.$emit('emptyInput')
      } else {
        formGroup.classList.remove('validated-error')
        formGroup.classList.add('validated-ok')
        this.$emit('changeInputValue', this.inputedText)
      }
    },
    inputFocus(){
      this.$refs.formInput.focus()
    },
    validate(){
      // Валидация email
      if (this.validateType == 'email') {
        if ( !this.$v.inputedText.required || !this.$v.inputedText.email){
          !this.$v.inputedText.required ? this.errorText = 'Заполните поле' : this.errorText = 'Некорректные данные'
          return false
          } else {
            return true;
          }
      }
      // Валидация строки (ФИО)
      if (this.validateType == 'string') {
        if ( !this.$v.inputedText.required || !this.$v.inputedText.minLength){
          !this.$v.inputedText.required ? this.errorText = 'Заполните поле' : this.errorText = 'Некорректные данные (мин. 6 символов)'
          return false
          } else {
            return true;
          }
      }
      // Валидация телефона (11-значное число от 11111111111 до 99999999999)
      if (this.validateType == 'phone') {
        if ( !this.$v.inputedText.required || !this.$v.inputedText.between){
          !this.$v.inputedText.required ? this.errorText = 'Заполните поле' : this.errorText = 'Введите номер телефона (11 цифр без пробелов и дефисов)'
          return false
          } else {
            return true;
          }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/scss/variables.scss';


.form-group {
  position: relative;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 1rem;
}

.error-message{
  transition: font-size 0.2s ease;
  color: $modal__error-color;
  padding: 7px 5px;
  font-size: 0;
}

.validated-ok {
  & .validated:before {
    content: url('/img/ok.png');
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
  }

}

.validated-error {
  & .validated:before {
    content: url('/img/error.png');
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
  }

  & .form-input{
    border: 1px solid $modal__error-color;
  }

  & + .error-message{
    font-size: 0.6rem;
  }
}

.form-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: $modal__secondary-text-color;
  z-index: 10;
  transition: transform 0.2s ease, font-size 0.2s ease;
  cursor: text;
}

.focused .form-label {
  transform: translateY(-180%);
  font-size: 0.65rem;
}

.form-input {
  position: relative;
  padding: 12px;
  width: 90%;
  height: 50px;
  outline: 0;
  border: 0;
  background-color: $modal__input-bg-color;
  border-radius: 5px;
  transition: all 0.2s ease;
  color: $modal__primary-text-color;
  @media(max-width: 430px){
    width: 85%;
  }

  &:focus {
    background-color: $modal__bg-focused-input;
  }

}


</style>