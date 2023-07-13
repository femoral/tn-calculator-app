import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import { VDatePicker } from 'vuetify/labs/VDatePicker';
import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#4c85b4',
          secondary: '#95d1f1',
          ternary: '#c68c74',
          accent: '#dcdcaa',
          comment: '#699855',
          background: '#1e1e1e',
        },
      },
    },
  },
  date: {
    adapter: VuetifyDateAdapter,
  },
  components: {
    VDataTableServer,
    VSkeletonLoader,
    VDatePicker,
  },
});
