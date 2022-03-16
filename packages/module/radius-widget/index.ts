import root from './src/component/index.vue';
import RadiusService from './src/service/radius.service';


export default {
    root,
    provide: [RadiusService],
};
