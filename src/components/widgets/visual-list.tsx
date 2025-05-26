import { z } from 'zod';
import { visualListSchema } from './widgets-schema'; // Assuming this path is correct

// Define the props type from the Zod schema
type VisualListPropsData = z.infer<typeof visualListSchema>['data'];

interface VisualListProps {
  data: VisualListPropsData;
}

const IconDisplay: React.FC<{ icon: string; iconStyle: 'circle' | 'square' | 'none' }> = ({ icon, iconStyle }) => {
  let styleClasses = 'inline-block p-1 mr-2'; // Common style for icon
  if (iconStyle === 'circle') {
    styleClasses += ' rounded-full bg-gray-200';
  } else if (iconStyle === 'square') {
    styleClasses += ' rounded bg-gray-200';
  }
  // 'none' style doesn't add extra classes beyond common
  // In a real app, you might use actual SVG icons or an icon library here.
  // For now, just displaying the string.
  return <span className={styleClasses}>{icon}</span>;
};

const LevelDisplay: React.FC<{ level: number }> = ({ level }) => {
  // Simple text display for level, could be stars or a bar
  return <span className="text-xs text-gray-600 ml-2">({level}/5)</span>;
};

export function VisualList({ data }: VisualListProps) {
  const { propsData, styleData } = data;

  const layoutClasses = propsData.layout === 'grid'
    ? 'grid grid-cols-2 gap-x-4 gap-y-2' // Example: 2 columns for grid
    : 'flex flex-col gap-2'; // Example: single column for list

  return (
    <div style={{ marginTop: `${styleData.marginTop}px`, marginBottom: `${styleData.marginBottom}px` }} className="w-full">
      {propsData.title && <h3 className="text-lg font-semibold mb-2">{propsData.title}</h3>}
      <div className={layoutClasses}>
        {propsData.items.map((item, index) => (
          <div key={index} className="flex items-center p-2 border border-gray-100 rounded">
            <IconDisplay icon={item.icon} iconStyle={propsData.iconStyle} />
            <span className="text-sm">{item.label}</span>
            {item.level !== undefined && <LevelDisplay level={item.level} />}
          </div>
        ))}
      </div>
    </div>
  );
}
