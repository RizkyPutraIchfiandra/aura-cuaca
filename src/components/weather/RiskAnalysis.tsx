import { WeatherRisk } from '@/types/weather';
import { AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskAnalysisProps {
  risks: WeatherRisk[];
}

export const RiskAnalysis = ({ risks }: RiskAnalysisProps) => {
  return (
    <div className="glass-card p-6 slide-up" style={{ animationDelay: '0.4s' }}>
      <h3 className="section-title">
        <AlertTriangle size={20} className="text-accent" />
        Analisis Risiko Cuaca
      </h3>
      
      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div 
            key={index}
            className={cn(
              'p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]',
              risk.level === 'tinggi' ? 'bg-red-500/10 border-red-500/30' :
              risk.level === 'sedang' ? 'bg-yellow-500/10 border-yellow-500/30' :
              'bg-green-500/10 border-green-500/30'
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                'p-2 rounded-lg',
                risk.level === 'tinggi' ? 'bg-red-500/20' :
                risk.level === 'sedang' ? 'bg-yellow-500/20' :
                'bg-green-500/20'
              )}>
                {risk.level === 'tinggi' ? (
                  <ShieldAlert size={24} className="text-red-400" />
                ) : risk.level === 'sedang' ? (
                  <AlertTriangle size={24} className="text-yellow-400" />
                ) : (
                  <ShieldCheck size={24} className="text-green-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold">{risk.type}</h4>
                  <span className={cn(
                    'risk-badge',
                    risk.level === 'tinggi' ? 'risk-high' :
                    risk.level === 'sedang' ? 'risk-medium' :
                    'risk-low'
                  )}>
                    {risk.level.charAt(0).toUpperCase() + risk.level.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                <p className="text-sm text-primary">💡 {risk.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
