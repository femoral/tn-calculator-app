import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components: {
    VDataTable,
  },
});
