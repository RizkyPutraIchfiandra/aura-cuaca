import { CurrentWeather as CurrentWeatherType, DataSource } from '@/types/weather';
import { WeatherIcon, getConditionLabel } from './WeatherIcon';
import { Droplets, Wind, Gauge, Cloud, ThermometerSun, Radio, Wifi, Radiation, CloudRain } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  location: string;
  dataSource: DataSource;
}

export const CurrentWeatherDisplay = ({ data, location, dataSource }: CurrentWeatherProps) => {
  return (
    <div className="glass-card p-8 slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Main Temperature Display */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <WeatherIcon condition={data.condition} size={100} className="animate-float" />
            <div className="absolute -bottom-2 -right-2 bg-secondary/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs flex items-center gap-1">
              {dataSource === 'sensor' ? <Radio size={12} className="text-green-400" /> : <Wifi size={12} className="text-primary" />}
              <span className="text-muted-foreground">{dataSource === 'sensor' ? 'Sensor' : 'API'}</span>
            </div>
          </div>
          <div>
            <div className="temperature-display">{data.temperature}°</div>
            <p className="text-xl text-muted-foreground mt-1">{getConditionLabel(data.condition)}</p>
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
        </div>
        
        {/* Location & Time */}
        <div className="text-right">
          <h2 className="text-2xl font-semibold">{location}</h2>
          <p className="text-muted-foreground">
            {format(data.lastUpdated, "EEEE, d MMMM yyyy", { locale: id })}
          </p>
          <p className="text-muted-foreground">
            Diperbarui: {format(data.lastUpdated, "HH:mm", { locale: id })}
          </p>
        </div>
      </div>
      
      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-8">
        <StatCard icon={<CloudRain size={20} />} label="Hujan" value={`${getRainProbability(data.condition, data.humidity)}%`} subtitle="Prediksi" />
        <StatCard icon={<ThermometerSun size={20} />} label="Terasa" value={`${data.feelsLike}°C`} />
        <StatCard icon={<Droplets size={20} />} label="Kelembaban" value={`${data.humidity}%`} />
        <StatCard icon={<Wind size={20} />} label="Angin" value={`${data.windSpeed} km/h`} subtitle={data.windDirection} />
        <StatCard icon={<Gauge size={20} />} label="Tekanan" value={`${data.pressure} hPa`} />
        <StatCard icon={<Cloud size={20} />} label="Awan" value={`${getCloudCoverage(data.condition)}%`} subtitle={getCloudLevel(data.condition)} />
        <StatCard icon={<Radiation size={20} />} label="Radiasi" value={data.uvIndex.toString()} subtitle={getRadiationLevel(data.uvIndex)} />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
}

const StatCard = ({ icon, label, value, subtitle }: StatCardProps) => (
  <div className="bg-secondary/30 rounded-xl p-4 border border-border/30">
    <div className="flex items-center gap-2 text-primary mb-2">
      {icon}
      <span className="stat-label">{label}</span>
    </div>
    <div className="stat-value">{value}</div>
    {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
  </div>
);

const getRadiationLevel = (index: number): string => {
  if (index <= 2) return 'Rendah';
  if (index <= 5) return 'Sedang';
  if (index <= 7) return 'Tinggi';
  if (index <= 10) return 'Sangat Tinggi';
  return 'Ekstrem';
};

const getCloudCoverage = (condition: string): number => {
  switch (condition) {
    case 'cerah': return 10;
    case 'berawan': return 60;
    case 'hujan': return 85;
    case 'badai-petir': return 95;
    case 'kabut': return 100;
    case 'salju': return 80;
    default: return 50;
  }
};

const getCloudLevel = (condition: string): string => {
  const coverage = getCloudCoverage(condition);
  if (coverage <= 25) return 'Cerah';
  if (coverage <= 50) return 'Sedikit';
  if (coverage <= 75) return 'Sedang';
  return 'Mendung';
};

const getRainProbability = (condition: string, humidity: number): number => {
  switch (condition) {
    case 'hujan': return 90;
    case 'badai-petir': return 95;
    case 'salju': return 80;
    case 'berawan': return Math.min(humidity - 20, 50);
    case 'kabut': return 30;
    case 'cerah': return Math.max(humidity - 60, 5);
    default: return 20;
  }
};
