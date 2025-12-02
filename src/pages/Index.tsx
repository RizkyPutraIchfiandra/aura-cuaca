import { useState, useEffect } from 'react';
import { WeatherData, DataSource } from '@/types/weather';
import { generateMockWeatherData } from '@/data/mockWeatherData';
import { LocationSearch } from '@/components/weather/LocationSearch';
import { CurrentWeatherDisplay } from '@/components/weather/CurrentWeather';
import { HourlyForecastDisplay } from '@/components/weather/HourlyForecast';
import { DailyForecastDisplay } from '@/components/weather/DailyForecast';
import { RiskAnalysis } from '@/components/weather/RiskAnalysis';
import { ActivityRecommendations } from '@/components/weather/ActivityRecommendations';
import { EconomicImpactDisplay } from '@/components/weather/EconomicImpact';
import { CloudLightning, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [dataSource, setDataSource] = useState<DataSource>('api');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { toast } = useToast();

  const fetchWeatherData = (loc: string, source: DataSource, showToast = true) => {
    setLoading(true);
    // Simulate API call with shorter delay for better UX
    setTimeout(() => {
      const data = generateMockWeatherData(loc);
      data.dataSource = source;
      setWeatherData(data);
      setLocation(loc);
      setDataSource(source);
      setLastUpdate(new Date());
      setLoading(false);
      
      if (showToast) {
        toast({
          title: "Data Cuaca Diperbarui",
          description: `Menampilkan cuaca untuk ${loc} (${source === 'sensor' ? 'Sensor Lapangan' : 'Model API'})`,
        });
      }
    }, 300);
  };

  useEffect(() => {
    fetchWeatherData(location, dataSource, false);
    
    // Auto-refresh every minute
    const interval = setInterval(() => {
      fetchWeatherData(location, dataSource, true);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (loc: string, source: DataSource) => {
    fetchWeatherData(loc, source);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <CloudLightning size={28} className="text-primary pulse-glow" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CuacaKini</h1>
                <p className="text-xs text-muted-foreground">Pemantauan Cuaca Realtime</p>
              </div>
            </div>
            
            <button 
              onClick={() => fetchWeatherData(location, dataSource)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-sm"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Perbarui</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <LocationSearch 
          onSearch={handleSearch} 
          currentLocation={location}
          currentDataSource={dataSource}
        />
        
        {loading ? (
          <LoadingSkeleton />
        ) : weatherData ? (
          <>
            <CurrentWeatherDisplay 
              data={weatherData.current} 
              location={weatherData.location}
              dataSource={weatherData.dataSource}
            />
            
            <HourlyForecastDisplay forecasts={weatherData.hourly} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyForecastDisplay forecasts={weatherData.daily} />
              <RiskAnalysis risks={weatherData.risks} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityRecommendations activities={weatherData.activities} />
              <EconomicImpactDisplay impacts={weatherData.economicImpacts} />
            </div>
          </>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>Pembaruan terakhir: {lastUpdate.toLocaleTimeString('id-ID')}</p>
        <p className="mt-1">Data cuaca diperbarui otomatis setiap menit</p>
      </footer>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="glass-card p-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-secondary/50 animate-pulse" />
        <div className="space-y-3">
          <div className="w-32 h-16 bg-secondary/50 rounded animate-pulse" />
          <div className="w-40 h-4 bg-secondary/50 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-secondary/50 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
    <div className="glass-card p-6">
      <div className="flex gap-3 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="min-w-[100px] h-32 bg-secondary/50 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6 h-80 animate-pulse bg-secondary/30" />
      <div className="glass-card p-6 h-80 animate-pulse bg-secondary/30" />
    </div>
  </div>
);

export default Index;
