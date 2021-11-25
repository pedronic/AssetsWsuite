import Vue from 'vue';
import VeeValidate from 'vee-validate';
import msg from '../pt_BR';

Vue.use(VeeValidate, {

    locale: 'pt_BR',
    dictionary: {
      pt_BR: {
        messages: msg
      }
    }
  });