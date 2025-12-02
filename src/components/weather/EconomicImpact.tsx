import { EconomicImpact as EconomicImpactType } from '@/types/weather';
import { TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EconomicImpactProps {
  impacts: EconomicImpactType[];
}

export const EconomicImpactDisplay = ({ impacts }: EconomicImpactProps) => {
  return (
    <div className="glass-card p-6 slide-up" style={{ animationDelay: '0.6s' }}>
      <h3 className="section-title">
        <Building2 size={20} className="text-primary" />
        Dampak Sosial & Ekonomi
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {impacts.map((impact, index) => (
          <div 
            key={index}
            className={cn(
              'p-4 rounded-xl border flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]',
              impact.impact === 'positif' ? 'bg-green-500/10 border-green-500/30' :
              impact.impact === 'negatif' ? 'bg-red-500/10 border-red-500/30' :
              'bg-secondary/30 border-border/30'
            )}
          >
            <div className={cn(
              'p-3 rounded-xl text-2xl',
              impact.impact === 'positif' ? 'bg-green-500/20' :
              impact.impact === 'negatif' ? 'bg-red-500/20' :
              'bg-secondary/50'
            )}>
              {impact.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{impact.sector}</h4>
                {impact.impact === 'positif' ? (
                  <TrendingUp size={16} className="text-green-400" />
                ) : impact.impact === 'negatif' ? (
                  <TrendingDown size={16} className="text-red-400" />
                ) : (
                  <Minus size={16} className="text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{impact.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
