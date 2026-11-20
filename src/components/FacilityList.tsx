import {
  Car,
  Flame,
  Mountain,
  Utensils,
  Wifi,
  Wind,
} from 'lucide-react';
import { FacilityConfig, FacilityIconName } from '../config/site';
import { Reveal } from './Reveal';

interface FacilityListProps {
  items: FacilityConfig[];
}

function FacilityIcon({ name }: { name: FacilityIconName }) {
  const props = {
    size: 18,
    strokeWidth: 1.6,
    className: 'text-[#14341F] shrink-0',
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'car':
      return <Car {...props} />;
    case 'wifi':
      return <Wifi {...props} />;
    case 'flame':
      return <Flame {...props} />;
    case 'mountain':
      return <Mountain {...props} />;
    case 'utensils':
      return <Utensils {...props} />;
    case 'wind':
      return <Wind {...props} />;
  }
}

export function FacilityList({ items }: FacilityListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((facility, idx) => (
        <li key={facility.id}>
          <Reveal delayMs={idx * 60} className="h-full">
            <div className="retreat-card-interactive h-full p-7 flex flex-col gap-4">
              <div className="pastel-sage inline-flex h-11 w-11 items-center justify-center rounded-full">
                <FacilityIcon name={facility.icon} />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-[-0.015em] text-[#122318] mb-1.5">
                  {facility.name}
                </h3>
                <p className="text-sm text-[#4A5D50] leading-[1.6]">
                  {facility.detail}
                </p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
