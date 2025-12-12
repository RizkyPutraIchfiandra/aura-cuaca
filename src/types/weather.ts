export type WeatherCondition = 'cerah' | 'berawan' | 'hujan' | 'badai-petir' | 'kabut' | 'salju';

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  condition: WeatherCondition;
  description: string;
  lastUpdated: Date;
}

export interface HourlyForecast {
  time: Date;
  temperature: number;
  condition: WeatherCondition;
  windSpeed: number;
  precipitation: number;
  humidity: number;
}

export interface DailyForecast {
  date: Date;
  dayName: string;
  tempMax: number;
  tempMin: number;
  condition: WeatherCondition;
  precipitation: number;
  humidity: number;
}

export interface WeatherRisk {
  type: string;
  level: 'rendah' | 'sedang' | 'tinggi';
  description: string;
  recommendation: string;
}

export interface ActivityRecommendation {
  activity: string;
  icon: string;
  suitable: boolean;
  reason: string;
}

export interface EconomicImpact {
  sector: string;
  icon: string;
  impact: 'positif' | 'netral' | 'negatif';
  description: string;
}

export type DataSource = 'sensor' | 'api';

export interface WeatherData {
  location: string;
  dataSource: DataSource;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  risks: WeatherRisk[];
  activities: ActivityRecommendation[];
  economicImpacts: EconomicImpact[];
}
