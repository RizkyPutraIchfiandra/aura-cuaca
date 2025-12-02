import { ActivityRecommendation } from '@/types/weather';
import { Lightbulb, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityRecommendationsProps {
  activities: ActivityRecommendation[];
}

export const ActivityRecommendations = ({ activities }: ActivityRecommendationsProps) => {
  return (
    <div className="glass-card p-6 slide-up" style={{ animationDelay: '0.5s' }}>
      <h3 className="section-title">
        <Lightbulb size={20} className="text-accent" />
        Rekomendasi Aktivitas
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {activities.map((activity, index) => (
          <div 
            key={index}
            className={cn(
              'p-4 rounded-xl border transition-all duration-300 hover:scale-105',
              activity.suitable 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{activity.icon}</span>
              {activity.suitable ? (
                <Check size={18} className="text-green-400" />
              ) : (
                <X size={18} className="text-red-400" />
              )}
            </div>
            <h4 className="font-medium text-sm mb-1">{activity.activity}</h4>
            <p className="text-xs text-muted-foreground">{activity.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
