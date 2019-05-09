import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AuthPlugin from "./plugins/auth";
import AxiosPlugin from "./plugins/axios";

import VueSimpleMarkdown from 'vue-simple-markdown'

Vue.use(AuthPlugin);
Vue.use(AxiosPlugin);
Vue.use(VueSimpleMarkdown);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// Make textareas auto-expandable
// https://gomakethings.com/automatically-expand-a-textarea-as-the-user-types-using-vanilla-javascript/

document.addEventListener('input', function (event) {
    if (event.target.tagName.toLowerCase() !== 'textarea') return;
    autoExpand(event.target);
}, false);

var autoExpand = function (field) {
    // Reset field height
    field.style.height = 'inherit';

    var computed = window.getComputedStyle(field);
    var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
        + parseInt(computed.getPropertyValue('padding-top'), 10)
        + field.scrollHeight
        + parseInt(computed.getPropertyValue('padding-bottom'), 10)
        + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = height + 'px';
};
