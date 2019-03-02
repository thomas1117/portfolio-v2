import '../sass/main.scss';

import Test from '@/vue/components/Test';
import Vue from 'vue';
import './splash';

if (document.getElementById('app')) {
    const app = new Vue({
        el: '#app',
        components: {
            Test
        }
    });
}
