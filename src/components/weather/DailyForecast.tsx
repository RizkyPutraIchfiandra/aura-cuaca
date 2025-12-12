import { DailyForecast as DailyForecastType } from '@/types/weather';
import { WeatherIcon, getConditionLabel } from './WeatherIcon';
import { Calendar, Droplets } from 'lucide-react';
interface DailyForecastProps {
  forecasts: DailyForecastType[];
}
export const DailyForecastDisplay = ({
  forecasts
}: DailyForecastProps) => {
  return <div className="glass-card p-6 slide-up" style={{
    animationDelay: '0.3s'
  }}>
      <h3 className="section-title">
        <Calendar size={20} className="text-primary" />
        Prakiraan 7 Hari
      </h3>
      
      <div className="space-y-1">
        {forecasts.map((forecast, index) => <div key={index} className="daily-row px-2 rounded-lg">
            <div className="flex items-center gap-4 flex-1">
              <span className="w-20 font-medium">{forecast.dayName}</span>
              <WeatherIcon condition={forecast.condition} size={28} />
              <span className="text-sm text-muted-foreground hidden sm:block">
                {getConditionLabel(forecast.condition)}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-primary">
                <Droplets size={14} />
                <span>{forecast.precipitation}%</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">{forecast.tempMin}°</span>
                <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                  
                </div>
                <span className="font-semibold">{forecast.tempMax}°</span>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};