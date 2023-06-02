/* eslint-disable global-require */

const images = {
  clear: require('../assets/images/clear.png'),
  hail: require('../assets/images/hail.png'),
  'heavy-cloud': require('../assets/images/heavy-cloud.png'),
  'light-cloud': require('../assets/images/light-cloud.png'),
  'heavy-rain': require('../assets/images/heavy-rain.png'),
  'light-rain': require('../assets/images/light-rain.png'),
  showers: require('../assets/images/showers.png'),
  sleet: require('../assets/images/sleet.png'),
  snow: require('../assets/images/snow.png'),
  thunder: require('../assets/images/thunder.png'),
  null: require('../assets/images/icon.png'),
  Icon: require('../assets/images/icon.png'),
};

export default weather => images[weather];
