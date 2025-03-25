// Get Location Using IP (No Permission Required)
export async function getLocationFromIP() {
  try {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    return {latitude: data.lat, longitude: data.lon};
  } catch (error) {
    console.error('Error fetching IP location:', error);
    return null;
  }
}

// Fetch Weather Data from Open-Meteo
export async function fetchWeather(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=uv_index&timezone=auto`,
    );

    // ✅ Log response text before parsing
    const text = await response.text();
    console.log('Raw API Response:', text);

    // ✅ Check if response is valid JSON
    const data = JSON.parse(text);

    console.log('Parsed Weather Data:', data);

    // ✅ Validate JSON structure
    if (!data.current_weather || !data.hourly) {
      console.warn('Invalid weather data:', data);
      return null;
    }

    const currentHour = new Date().getHours();
    const uvIndex = data.hourly.uv_index
      ? data.hourly.uv_index[currentHour]
      : 0;

    return {
      temperature: data.current_weather.temperature,
      condition: data.current_weather.weathercode,
      uvIndex: uvIndex,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}
