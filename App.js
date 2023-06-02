import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

import {getWeatherInfo} from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');

  useEffect(() => {
    handleUpdateLocation('San Francisco');
  }, []);

  const handleUpdateLocation = async city => {
    if (!city) return;

    setLoading(true);
    setError(false);

    try {
      const {location, weather, temperature} = await getWeatherInfo(city);

      setLocation(location);
      setWeather(weather);
      setTemperature(temperature);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <View style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={
          weather ? getImageForWeather(weather) : getImageForWeather('Icon')
        }
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="red" size="large" />

          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}

              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}

              <SearchInput
                placeholder="Search any city"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,255,0.6)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
