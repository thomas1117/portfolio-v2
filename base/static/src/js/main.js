import '../sass/main.scss';

import Test from '@/vue/components/Test';
import Vue from 'vue';

console.log('yolo');

const app = new Vue({
    el: '#app',
    components: {
        Test
    }
});
