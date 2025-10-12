<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    contact: { type: Object, required: true },
  },
  emits: ["submit:contact", "delete:contact"],
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị")
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(50, "Tên có tối đa 50 ký tự"),
      email: yup
        .string()
        .email("E-mail không hợp lệ")
        .max(50, "Tên có tối đa 50 ký tự"),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      contactLocal: this.contact,
      contactFormSchema,
    };
  },
  methods: {
    submitContact() {
      console.log("contact form: submit", this.contactLocal);
      this.$emit("submit:contact", this.contactLocal);
    },

    deleteContact() {
      this.$emit("delete:contact", this.contactLocal._id);
    },

    cancel() {
      const reply = window.confirm(
        "You have unsaved changes! Do you want to leave?"
      );
      if (!reply) {
        return false;
      } else this.$router.push({ name: "contactbook" });
    },
  },
};
</script>

<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="contactLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="contactLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        name="favorite"
        class="form-check-input"
        v-model="contactLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        class="ml-2 btn btn-danger"
        v-if="contactLocal._id"
        @click="deleteContact"
      >
        Xóa
      </button>
      <button class="ml-2 btn btn-light" @click="cancel">Thoát</button>
    </div>
  </Form>
</template>

<style scoped>
@import "@/assets/css/form.css";
</style>
