import { HourlyForecast as HourlyForecastType } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Clock, Droplets, CloudRain, Thermometer } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface HourlyForecastProps {
  forecasts: HourlyForecastType[];
}

export const HourlyForecastDisplay = ({ forecasts }: HourlyForecastProps) => {
  const now = new Date();
  
  return (
    <div className="glass-card p-6 slide-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="section-title">
        <Clock size={20} className="text-primary" />
        Prakiraan Per Jam (24 Jam)
      </h3>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-4">
          {forecasts.map((forecast, index) => {
            const isNow = index === 0;
            return (
              <div 
                key={index}
                className={`hourly-card ${isNow ? 'bg-primary/20 border-primary/50' : ''}`}
              >
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {isNow ? 'Sekarang' : format(forecast.time, 'HH:mm', { locale: id })}
                </p>
                <WeatherIcon condition={forecast.condition} size={28} className="mx-auto mb-2" />
                <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                  <Thermometer size={14} className="text-orange-500" />
                  <span>{forecast.temperature}°</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Droplets size={12} className="text-blue-400" />
                  <span>{forecast.humidity}%</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-primary">
                  <CloudRain size={12} />
                  <span>{forecast.precipitation}%</span>
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
