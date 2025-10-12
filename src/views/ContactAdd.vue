<script>
import ContactForm from "@/components/ContactForm.vue";
import contactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: {},
    };
  },
  methods: {
    async addContact(data) {
      try {
        await contactService.create(data);
        alert("Liên hệ được thêm mới thành công");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>
    <ContactForm :contact="contact" @submit:contact="addContact" />
  </div>
</template>
