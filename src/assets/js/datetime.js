import moment from 'moment';

const defaultFormat = {
  today: 'YYYY/MM/DD',
  month: 'YYYY/MM',
  year: 'YYYY',
};
let today = moment().format(defaultFormat.today);
let month = moment().format(defaultFormat.month);
let year = moment().format(defaultFormat.year);
export default new class Datetime {
  today () {
    return today;
  }
  month () {
    return month;
  }
  year () {
    return year
  }
  now () {
    return moment().format('YYYY/MM/DD hh:mm:ss');
  }
  hour () {
    return moment().format('hh:mm');
  }
  time () {
    return moment().format('hh:mm:ss');
  }
  formatData () {
    return moment().format('YYYY-MM-DD');
  }
  timestamp () {
    return new Date().getTime();
  }
}();
