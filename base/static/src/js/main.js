import '../sass/main.scss';

import '@/utils/scroll';

import Test from '@/vue/components/Test';
import Vue from 'vue';

const app = new Vue({
    el: '#app',
    components: {
        Test
    }
});
