export async function getWeatherInfo(city) {
  const query = `https://api.weatherbit.io/v2.0/current?city=${city}&key=4e76a777c63e41cd84f057689a4f7abf`;
  const res = await fetch(query);
  const data = await res.json();

  const title = data.data[0].city_name;
  const weather_state_name = data.data[0].weather.description;
  const the_temp = data.data[0].temp;

  let weather = '';
  if (weather_state_name.includes('Clear')) {
    weather = 'clear';
  } else if (weather_state_name.includes('Hail')) {
    weather = 'hail';
  } else if (
    weather_state_name.includes('Broken clouds') ||
    weather_state_name.includes('Overcast clouds')
  ) {
    weather = 'heavy-cloud';
  } else if (
    weather_state_name.includes('Few clouds') ||
    weather_state_name.includes('Scattered clouds')
  ) {
    weather = 'light-cloud';
  } else if (weather_state_name.includes('Thunderstorm')) {
    weather = 'thunder';
  } else if (
    weather_state_name.includes('Light Rain') ||
    weather_state_name.includes('Moderate Rain')
  ) {
    weather = 'light-rain';
  } else if (weather_state_name.includes('shower')) {
    weather = 'showers';
  } else if (weather_state_name.includes('Rain')) {
    weather = 'heavy-rain';
  } else if (weather_state_name.includes('Sleet')) {
    weather = 'sleet';
  } else if (weather_state_name.includes('snow')) {
    weather = 'snow';
  } else {
    console.log(weather_state_name);
    weather = 'Icon';
  }
  return {
    location: title,
    weather: weather,
    temperature: the_temp,
  };
}
