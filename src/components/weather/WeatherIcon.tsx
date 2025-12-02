import { WeatherCondition } from '@/types/weather';
import { Sun, Cloud, CloudRain, CloudLightning, CloudFog, Snowflake } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
  size?: number;
}

export const WeatherIcon = ({ condition, className, size = 24 }: WeatherIconProps) => {
  const iconProps = { size, className: cn('weather-icon-glow', className) };
  
  switch (condition) {
    case 'cerah':
      return <Sun {...iconProps} className={cn(iconProps.className, 'text-weather-sunny')} />;
    case 'berawan':
      return <Cloud {...iconProps} className={cn(iconProps.className, 'text-weather-cloudy')} />;
    case 'hujan':
      return <CloudRain {...iconProps} className={cn(iconProps.className, 'text-weather-rainy')} />;
    case 'badai-petir':
      return <CloudLightning {...iconProps} className={cn(iconProps.className, 'text-weather-stormy')} />;
    case 'kabut':
      return <CloudFog {...iconProps} className={cn(iconProps.className, 'text-weather-cloudy')} />;
    case 'salju':
      return <Snowflake {...iconProps} className={cn(iconProps.className, 'text-primary')} />;
    default:
      return <Sun {...iconProps} />;
  }
};

export const getConditionLabel = (condition: WeatherCondition): string => {
  const labels: Record<WeatherCondition, string> = {
    'cerah': 'Cerah',
    'berawan': 'Berawan',
    'hujan': 'Hujan',
    'badai-petir': 'Badai Petir',
    'kabut': 'Berkabut',
    'salju': 'Salju',
  };
  return labels[condition];
};
