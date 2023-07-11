import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components: {
    VDataTableServer,
    VSkeletonLoader,
  },
});
