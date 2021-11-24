import * as vue from 'vue';
import App from './App.vue';
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';

import {applyPolyfills, defineCustomElements} from '@aws-amplify/ui-components/loader';
Amplify.configure(awsconfig)
applyPolyfills().then(() => {
  defineCustomElements(window);
});
vue.createApp(App).mount('#app');
