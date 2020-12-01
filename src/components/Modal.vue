<template>
  <div>
    <transition name="bg-fade-animate">
      <div v-if="isModalVisible" class="modal__bg" @click="onClickOutModal">
        <div v-if="!sendingData" class="modal">
          <p class="modal__title">Заявка на карту</p>
          <p class="modal__close-btn" @click="cancel">&times;</p>
          <ModalInput
            validateType="string"
            @changeInputValue="changeFio"
            @emptyInput="onEmptyInput"
            >ФИО
          </ModalInput>
          <ModalInput
            validateType="email"
            @changeInputValue="changeEmail"
            @emptyInput="onEmptyInput"
            >Электронный адрес
          </ModalInput>
          <ModalInput
            validateType="phone" 
            @changeInputValue="changePhone" 
            @emptyInput="onEmptyInput"
            >Номер телефона
          </ModalInput>
          <ModalSelect
            @changeSelectedOption="changeNationality"
            :selectOptions="selectOptions"
          />
          <ModalCheckbox @toggleCheckbox="toggleAgreeCheckbox"
            >Я соглашаюсь на <b>обработку</b> моих персональных
            данных
          </ModalCheckbox>
          <button
            :disabled="isSubmitDisabled"
            @click.prevent="onSubmit"
            class="action-btn action-btn_mt-mb-2rem"
          >
            Заказать сейчас
          </button>
        </div>
        <div v-else class="modal">
          <div v-if="sendingOk" class="sending__wrap">
            <img src="img/sending_ok.png">
            <p class="sending__title">Ваша заявка принята</p>
            <p class="sending__text">В ближайшее время с&nbsp;вами свяжется наш&nbsp;менеджер</p>
            <a href='/' class="sending__link">Вернуться на сайт</a>
          </div>
          <div v-else class="sending__wrap">
            <img src="img/error.png">
            <p class="sending__title">Ошибка</p>
            <p class="sending__text">{{errorMessage}}</p>
            <a href='/' class="sending__link">Вернуться на сайт</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ModalInput from "@/components/ModalInput.vue";
import ModalSelect from "@/components/ModalSelect.vue";
import ModalCheckbox from "@/components/ModalCheckbox.vue";

export default {
  data: () => {
    return {
      form: {
        fio: "",
        email: "",
        phone: "",
        nationality: "Российская Федерация",
        agreeCheckbox: false,
      },
      selectOptions: [
        "Российская Федерация",
        "Беларусь",
        "Украина",
        "Казахстан",
      ],
      isSubmitDisabled: true,
      sendingData: false,
      sendingOk: false,
      errorMessage: ''
    };
  },
  props: {
    isModalVisible: {
      type: Boolean,
    },
  },
  methods: {
    confirm() {
      this.$emit("cancel");
      setTimeout(() => this.$emit("confirm"), 500);
    },
    cancel() {
      this.$emit("cancel");
    },
    onClickOutModal(event) {
      // if (!event.target.closest(".modal")) {
      //   this.$emit("cancel");
      // }
    },
    changeFio(newFio) {
      this.form.fio = newFio;
      this.checkForm();
    },
    changeEmail(newEmail) {
      this.form.email = newEmail;
      this.checkForm();
    },
    changePhone(newPhone) {
      this.form.phone = newPhone;
      this.checkForm();
    },
    changeNationality(option) {
      this.form.nationality = option;
      this.checkForm();
    },
    onSubmit() {
      this.sendingData = true;
      fetch('gateway.php', {
        method: 'POST',
        body: this.form
      })
      .then( response => response.ok ? this.sendingOk = true : this.errorMessage = `Ошибка ${response.status}: ${response.statusText}`)
      .catch(error => console.error(error));
    },
    onEmptyInput() {
      this.isSubmitDisabled = true;
    },
    toggleAgreeCheckbox(newValue) {
      this.form.agreeCheckbox = newValue;
      this.checkForm();
    },
    checkForm() {
      let count = 0;
      Object.values(this.form).forEach((value) => {
        if (!value) count++;
      });
      if (count) {
        this.isSubmitDisabled = true;
      } else {
        this.isSubmitDisabled = false;
      }
    },
  },
  components: {
    ModalInput,
    ModalSelect,
    ModalCheckbox,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/scss/variables.scss';

.modal {
  background-color: $modal__bg-color;
  color: $modal__primary-text-color;
  padding: 0 25px 25px;
  border-radius: 5px;
  margin: auto;
  width: 90%;
  max-width: 500px;
  position: relative;
  transition: all 0.5s ease;
  @media (max-width: 550px) {
    padding: 0;
  }

  &__bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $modal__bg-color;
    z-index: 999;
    display: flex;
    padding: 15px;
    box-sizing: border-box;
    overflow: auto;
  }

  &__title {
    color: $modal__primary-text-color;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    width: 90%;
    margin: 1rem 0 2rem;
  }

  &__close-btn {
    color: $modal__secondary-text-color;
    font-weight: 400;
    font-size: 1.8rem;
    position: absolute;
    top: 5px;
    right: 10%;
    cursor: pointer;
  }

  &__close-btn:hover {
    color: $modal__primary-text-color;
  }
}

.sending__wrap{
  color: $modal__primary-text-color;
  padding: 5px;
  margin: auto;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.sending__title{
  color: $primary-text-color;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin: 0.5rem;
}

.sending__text{
  font-size: 0.7rem;
}

.sending__link{
  margin: 0.5rem;
  display: block;
  color: $action-color;
}

/* Animation */

.bg-fade-animate-enter-active,
.bg-fade-animate-leave-active {
  transition: opacity 0.5s;
}

.bg-fade-animate-enter,
.bg-fade-animate-leave-to {
  opacity: 0;
}
</style>