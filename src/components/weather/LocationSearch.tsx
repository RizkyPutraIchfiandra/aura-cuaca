import { useState } from 'react';
import { Search, MapPin, Radio, Wifi } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataSource } from '@/types/weather';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  onSearch: (location: string, dataSource: DataSource) => void;
  currentLocation: string;
  currentDataSource: DataSource;
}

export const LocationSearch = ({ onSearch, currentLocation, currentDataSource }: LocationSearchProps) => {
  const [searchValue, setSearchValue] = useState(currentLocation);
  const [selectedSource, setSelectedSource] = useState<DataSource>(currentDataSource);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim(), selectedSource);
    }
  };

  return (
    <div className="glass-card p-6 slide-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Masukkan nama kota atau lokasi..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" className="h-12 px-6 bg-primary hover:bg-primary/90">
            <Search size={20} className="mr-2" />
            Cari
          </Button>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setSelectedSource('sensor')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all duration-300',
              selectedSource === 'sensor'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50'
            )}
          >
            <Radio size={18} />
            <span className="text-sm font-medium">Sensor Lapangan</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedSource('api')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all duration-300',
              selectedSource === 'api'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50'
            )}
          >
            <Wifi size={18} />
            <span className="text-sm font-medium">Model API</span>
          </button>
        </div>
      </form>
    </div>
  );
};
