import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('date-format',(value,dateStr='YYYY-MM-DD HH:mm:ss')=>{
  return format(value, dateStr);
});
