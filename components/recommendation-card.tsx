import React from 'react';
import { RecommendationResult } from '@/lib/recommendation-types';
import { getSectorIcon } from '@/lib/sector-icons';
import { IndianRupee, Clock3, MapPin, Target as TargetIcon } from 'lucide-react';
import CompanyLogo from '@/components/company-logo';

interface RecommendationCardProps {
  recommendation: RecommendationResult;
  onApply: (internshipId: string) => void;
  onLearnMore: (internshipId: string) => void;
  lang?: string;
  variant?: 'simple' | 'full';
  layout?: 'grid' | 'list';
}

// Lazy-loaded location badge with spinner ring around the icon
function LocationBadge({
  district,
  state,
  lang,
  delayMs = 300
}: {
  district?: string;
  state?: string;
  lang: string;
  delayMs?: number;
}) {
  const [loaded, setLoaded] = React.useState(false);
  const hostRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    // Only mark loaded after the element enters viewport (basic lazy effect)
    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        const t = setTimeout(() => setLoaded(true), delayMs);
        obs.disconnect();
        return () => clearTimeout(t);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs]);

  const locText = `${district || (lang === 'hi' ? 'स्थान' : 'Location')}, ${state || (lang === 'hi' ? 'भारत' : 'India')}`;

  return (
    <span ref={hostRef} className="inline-flex items-center gap-1 min-w-0">
      <span className="relative w-4 h-4 shrink-0">
        {!loaded && (
          <span className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" aria-hidden />
        )}
        <MapPin className="w-4 h-4 text-blue-600 absolute inset-0" />
      </span>
      <span className="truncate">{locText}</span>
    </span>
  );
}

export function RecommendationCard({ 
  recommendation, 
  onApply, 
  onLearnMore,
  lang = 'en',
  variant = 'full',
  layout = 'grid'
}: RecommendationCardProps) {
  const { internship, matchPercentage, rank, reasons, breakdown } = recommendation as any;
  const isHindi = lang === 'hi';
  const isSimple = variant === 'simple';
  const isList = layout === 'list';
  const L = {
    stipend: isHindi ? 'वजीफा' : 'Stipend',
    duration: isHindi ? 'अवधि' : 'Duration',
    apply: isHindi ? 'आवेदन करें' : 'Apply Now',
    learn: isHindi ? 'और जानें' : 'Learn More',
    match: isHindi ? 'मिलान' : 'Match',
    remote: isHindi ? 'दूरस्थ' : 'Remote',
    onsite: isHindi ? 'कार्यालय' : 'On-site',
    hybrid: isHindi ? 'हाइब्रिड' : 'Hybrid',
    sector: isHindi ? 'क्षेत्र' : 'Sector',
    location: isHindi ? 'स्थान' : 'Location',
    badges: {
      education: isHindi ? 'शिक्षा मेल' : 'Education match',
      skills: isHindi ? 'कौशल मेल' : 'Skills match',
      location: isHindi ? 'स्थान उपयुक्त' : 'Location fit',
      interest: isHindi ? 'रुचि मेल' : 'Interest match',
      stipend: isHindi ? 'अच्छा वजीफा' : 'Good stipend'
    },
    breakdown: {
      education: isHindi ? 'शिक्षा' : 'Education',
      skills: isHindi ? 'कौशल' : 'Skills',
      location: isHindi ? 'स्थान' : 'Location',
      interests: isHindi ? 'रुचि' : 'Interests',
      preferences: isHindi ? 'पसंद' : 'Preferences'
    },
    ruleBased: isHindi ? 'नियम-आधारित स्कोर' : 'Rule-based score',
    whyTitle: isHindi ? 'यह आपके लिए क्यों उपयुक्त है' : 'Why this matches you',
    howTitle: isHindi ? 'स्कोर कैसे निकाला गया' : 'How this was scored',
    whyPrefix: isHindi ? 'कारण:' : 'Reasons:',
  };
  
  // Get match percentage color
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const workMode = (internship?.location?.mode || internship?.workMode || 'On-site') as string;
  const workModeLabel = (/remote/i.test(workMode)
    ? L.remote
    : /hybrid/i.test(workMode)
      ? L.hybrid
      : L.onsite);

  return (
    <div className={isList ? "bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden" : "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"}>
      {/* Header */}
      <div className={(isSimple || isList) ? "p-4 border-b border-gray-100" : "p-6 border-b border-gray-100"}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className={isList ? "text-2xl bg-blue-50 p-2.5 rounded-md shrink-0" : "text-3xl bg-blue-50 p-3 rounded-lg shrink-0"}>
              {getSectorIcon(internship.sector || 'general')}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={(isSimple || isList) ? "text-lg font-semibold text-gray-900 mb-1 leading-snug line-clamp-2" : "text-xl font-semibold text-gray-900 mb-2 leading-snug line-clamp-2"}>
                {internship.title || 'Internship Opportunity'}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-1 min-w-0">
                <div className="shrink-0">
                  <CompanyLogo companyName={internship.company || ''} logoSize="sm" showFallbackText={false} />
                </div>
                <span className="font-medium truncate max-w-full">{internship.company || (isHindi ? 'कंपनी' : 'Company')}</span>
              </div>
              {!isSimple && !isList && (
                <div className="flex items-center gap-2 text-gray-600">
                  <LocationBadge
                    district={internship.location?.district}
                    state={internship.location?.state}
                    lang={lang}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div
              className={`${getMatchColor(matchPercentage)} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1`}
              title={L.ruleBased}
            >
              <TargetIcon className="w-4 h-4" />
              {matchPercentage}%
            </div>
            <span className="text-xs text-gray-500 leading-none">#{rank} {L.match}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={(isSimple || isList) ? "p-4" : "p-6"}>
        {(isSimple || isList) ? (
          <>
            {/* Why line (concise) */}
            {Array.isArray(reasons) && reasons.length > 0 && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                <span className="font-medium text-gray-700">{L.whyTitle}:</span>{' '}
                {reasons
                  .map((r: any) => L.badges[r.type as keyof typeof L.badges] || (isHindi ? 'उचित' : 'Relevant'))
                  .filter(Boolean)
                  .slice(0, 3)
                  .join(', ')}
              </p>
            )}
            {/* Meta small line: stipend + location */}
            <div className="text-sm text-gray-700 flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <IndianRupee className="w-4 h-4 text-green-600" /> ₹{(internship.stipend || 5000).toLocaleString()}
              </span>
              <span className="text-gray-300">•</span>
              <LocationBadge
                district={internship.location?.district}
                state={internship.location?.state}
                lang={lang}
              />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center gap-2">
                <IndianRupee className="text-green-600 w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600 font-medium">{L.stipend}</p>
                  <p className="text-lg font-bold text-green-700">
                    ₹{(internship.stipend || 5000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2">
                <Clock3 className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600 font-medium">{L.duration}</p>
                  <p className="text-lg font-bold text-blue-700">
                    {internship.duration || '12 months'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sector and Mode */}
        {!isSimple && !isList && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              {internship.sector || (isHindi ? 'सामान्य' : 'General')}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />{workModeLabel}
            </span>
          </div>
        )}

        {/* Why this matches you */}
        {!isSimple && !isList && Array.isArray(reasons) && reasons.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-800 mb-2 font-medium">{L.whyTitle}</p>
            <div className="flex flex-wrap gap-2">
              {reasons.slice(0, 4).map((r: any, idx: number) => (
                <span key={idx} className="bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-xs">
                  {L.badges[r.type as keyof typeof L.badges] || (isHindi ? 'उचित' : 'Relevant')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Compact score breakdown badges (no inline styles) */}
        {!isSimple && !isList && breakdown && (
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{L.howTitle}</p>
            <div className="flex flex-wrap gap-2">
            {([
              { key: 'education', color: 'bg-blue-500' },
              { key: 'skills', color: 'bg-green-500' },
              { key: 'location', color: 'bg-yellow-500' },
              { key: 'interests', color: 'bg-purple-500' },
              { key: 'preferences', color: 'bg-pink-500' }
            ] as const).map(seg => {
              const val = Math.max(0, Math.min(100, Math.round(breakdown[seg.key] || 0)));
              if (!val) return null;
              return (
                <span key={seg.key} className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-xs" title={`${L.breakdown[seg.key as keyof typeof L.breakdown]}: ${val}%`}>
                  <span className={`${seg.color} w-2 h-2 rounded-full`} aria-hidden />
                  <span>{L.breakdown[seg.key as keyof typeof L.breakdown]} {val}%</span>
                </span>
              );
            })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={isList ? "flex gap-2 justify-end items-center" : "flex gap-3"}>
          <button 
            onClick={() => onApply(internship.id || 'unknown')}
            className={(isSimple || isList) ? "bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors" : "flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"}
            aria-label={L.apply}
          >
            {L.apply}
          </button>
          {(!isSimple || isList) && (
            <button 
              onClick={() => onLearnMore(internship.id || 'unknown')}
              className="px-5 py-3 border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
              aria-label={L.learn}
            >
              {L.learn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
