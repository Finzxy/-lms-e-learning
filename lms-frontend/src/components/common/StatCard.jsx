import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard Component
 * Display statistics with icon, value, and trend
 * 
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {ReactNode} icon - Icon component
 * @param {string} iconBgColor - Background color for icon (Tailwind class)
 * @param {string} iconColor - Icon color (Tailwind class)
 * @param {number} trend - Trend percentage (positive or negative)
 * @param {string} trendLabel - Label for trend (e.g., "vs last month")
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  iconBgColor = 'bg-primary-100',
  iconColor = 'text-primary-600',
  trend,
  trendLabel,
}) => {
  const isPositiveTrend = trend > 0;
  const isNegativeTrend = trend < 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        {/* Left section */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>

          {/* Trend indicator */}
          {trend !== undefined && (
            <div className="flex items-center gap-1">
              {isPositiveTrend && (
                <>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{trend}%
                  </span>
                </>
              )}
              {isNegativeTrend && (
                <>
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    {trend}%
                  </span>
                </>
              )}
              {trendLabel && (
                <span className="text-sm text-gray-500 ml-1">{trendLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <div className={`${iconBgColor} rounded-lg p-3`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
