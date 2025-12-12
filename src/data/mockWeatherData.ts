import { WeatherData, HourlyForecast, DailyForecast, WeatherCondition } from '@/types/weather';

const generateHourlyForecast = (): HourlyForecast[] => {
  const forecasts: HourlyForecast[] = [];
  const now = new Date();
  const conditions: WeatherCondition[] = ['badai-petir', 'badai-petir', 'hujan', 'hujan', 'berawan', 'berawan', 'cerah', 'cerah'];
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() + i);
    
    forecasts.push({
      time,
      temperature: Math.round(28 + Math.random() * 8 - (i > 12 ? 3 : 0)),
      condition: conditions[Math.floor(i / 3)] || 'berawan',
      windSpeed: Math.round(10 + Math.random() * 10),
      precipitation: i < 6 ? Math.round(60 + Math.random() * 30) : Math.round(Math.random() * 20),
      humidity: Math.round(65 + Math.random() * 25),
    });
  }
  
  return forecasts;
};

const generateDailyForecast = (): DailyForecast[] => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const conditions: WeatherCondition[] = ['badai-petir', 'hujan', 'berawan', 'cerah', 'cerah', 'berawan', 'hujan'];
  const forecasts: DailyForecast[] = [];
  const now = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    forecasts.push({
      date,
      dayName: i === 0 ? 'Hari Ini' : days[date.getDay()],
      tempMax: Math.round(30 + Math.random() * 5),
      tempMin: Math.round(23 + Math.random() * 3),
      condition: conditions[i],
      precipitation: conditions[i] === 'hujan' || conditions[i] === 'badai-petir' ? Math.round(50 + Math.random() * 40) : Math.round(Math.random() * 20),
      humidity: Math.round(65 + Math.random() * 25),
    });
  }
  
  return forecasts;
};

export const generateMockWeatherData = (location: string): WeatherData => ({
  location,
  dataSource: Math.random() > 0.5 ? 'sensor' : 'api',
  current: {
    temperature: 32,
    feelsLike: 35,
    humidity: 78,
    windSpeed: 13,
    windDirection: 'Barat Daya',
    pressure: 1013,
    visibility: 8,
    uvIndex: 6,
    condition: 'badai-petir',
    description: 'Badai petir dengan hujan sedang',
    lastUpdated: new Date(),
  },
  hourly: generateHourlyForecast(),
  daily: generateDailyForecast(),
  risks: [
    {
      type: 'Badai Petir',
      level: 'tinggi',
      description: 'Potensi badai petir dalam 2 jam ke depan',
      recommendation: 'Hindari aktivitas luar ruangan dan cari tempat berlindung yang aman',
    },
    {
      type: 'Suhu Ekstrem',
      level: 'sedang',
      description: 'Suhu terasa mencapai 35°C di siang hari',
      recommendation: 'Tetap terhidrasi dan hindari paparan sinar matahari langsung',
    },
    {
      type: 'Curah Hujan',
      level: 'sedang',
      description: 'Hujan sedang hingga lebat diperkirakan',
      recommendation: 'Siapkan payung atau jas hujan jika bepergian',
    },
  ],
  activities: [
    { activity: 'Olahraga Outdoor', icon: '🏃', suitable: false, reason: 'Risiko petir tinggi' },
    { activity: 'Piknik', icon: '🧺', suitable: false, reason: 'Hujan diperkirakan turun' },
    { activity: 'Berenang', icon: '🏊', suitable: false, reason: 'Berbahaya saat badai' },
    { activity: 'Belanja Mall', icon: '🛍️', suitable: true, reason: 'Aktivitas indoor aman' },
    { activity: 'Menonton Film', icon: '🎬', suitable: true, reason: 'Cocok untuk cuaca hujan' },
    { activity: 'Berkebun', icon: '🌱', suitable: false, reason: 'Tunggu setelah hujan reda' },
  ],
  economicImpacts: [
    { sector: 'Pertanian', icon: '🌾', impact: 'positif', description: 'Hujan baik untuk irigasi tanaman' },
    { sector: 'Transportasi', icon: '🚗', impact: 'negatif', description: 'Potensi kemacetan dan genangan' },
    { sector: 'Pariwisata', icon: '✈️', impact: 'negatif', description: 'Aktivitas wisata outdoor terganggu' },
    { sector: 'Energi', icon: '⚡', impact: 'netral', description: 'Konsumsi AC berkurang' },
  ],
});
