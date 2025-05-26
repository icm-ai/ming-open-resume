import React from 'react';
import { z } from 'zod';
import { visualListSchema, visualListItemSchema } from '../widgets-schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { Trash2, PlusCircle } from 'lucide-react';

// Infer types from Zod schemas
type VisualListWidgetData = z.infer<typeof visualListSchema>['data'];
type VisualListItem = z.infer<typeof visualListItemSchema>;

interface VisualListFormProps {
  data: VisualListWidgetData;
  onChange: (newData: VisualListWidgetData) => void;
}

export function VisualListForm({ data, onChange }: VisualListFormProps) {
  const { t } = useTranslation();
  const { propsData } = data;

  const handlePropsDataChange = (newPropsData: Partial<VisualListWidgetData['propsData']>) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        ...newPropsData,
      },
    });
  };

  const handleItemChange = (index: number, updatedItem: Partial<VisualListItem>) => {
    const newItems = [...propsData.items];
    newItems[index] = { ...newItems[index], ...updatedItem };
    handlePropsDataChange({ items: newItems });
  };

  const handleAddItem = () => {
    const newItem: VisualListItem = { icon: 'Smile', label: 'New Item', level: 0 };
    handlePropsDataChange({ items: [...propsData.items, newItem] });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = propsData.items.filter((_, i) => i !== index);
    handlePropsDataChange({ items: newItems });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="visual-list-title" className="form-label">{t('form.title')}</label>
        <Input
          id="visual-list-title"
          value={propsData.title}
          onChange={(e) => handlePropsDataChange({ title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="visual-list-layout" className="form-label">{t('form.layout')}</label>
        <Select
          value={propsData.layout}
          onValueChange={(value: 'grid' | 'list') => handlePropsDataChange({ layout: value })}
        >
          <SelectTrigger id="visual-list-layout">
            <SelectValue placeholder={t('form.selectLayout')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">{t('form.grid')}</SelectItem>
            <SelectItem value="list">{t('form.list')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="visual-list-icon-style" className="form-label">{t('form.iconStyle')}</label>
        <Select
          value={propsData.iconStyle}
          onValueChange={(value: 'circle' | 'square' | 'none') => handlePropsDataChange({ iconStyle: value })}
        >
          <SelectTrigger id="visual-list-icon-style">
            <SelectValue placeholder={t('form.selectIconStyle')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="circle">{t('form.circle')}</SelectItem>
            <SelectItem value="square">{t('form.square')}</SelectItem>
            <SelectItem value="none">{t('form.none')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <h4 className="form-label border-b pb-1">{t('form.items')}</h4>
        {propsData.items.map((item, index) => (
          <div key={index} className="p-3 border rounded-md space-y-2 bg-gray-50/50">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{t('form.item')} #{index + 1}</span>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)} className="text-destructive hover:text-destructive">
                <Trash2 size={18} />
              </Button>
            </div>
            <div>
              <label htmlFor={`item-icon-${index}`} className="text-xs font-medium text-gray-700">{t('form.icon')}</label>
              <Input
                id={`item-icon-${index}`}
                value={item.icon}
                onChange={(e) => handleItemChange(index, { icon: e.target.value })}
                placeholder={t('form.iconPlaceholder') || "e.g., Code, Coffee"}
              />
            </div>
            <div>
              <label htmlFor={`item-label-${index}`} className="text-xs font-medium text-gray-700">{t('form.label')}</label>
              <Input
                id={`item-label-${index}`}
                value={item.label}
                onChange={(e) => handleItemChange(index, { label: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`item-level-${index}`} className="text-xs font-medium text-gray-700">{t('form.level')} (0-5)</label>
              <Input
                id={`item-level-${index}`}
                type="number"
                min={0}
                max={5}
                value={item.level ?? 0}
                onChange={(e) => handleItemChange(index, { level: parseInt(e.target.value, 10) || 0 })}
              />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={handleAddItem} className="w-full mt-2">
          <PlusCircle size={18} className="mr-2" /> {t('form.addItem')}
        </Button>
      </div>
    </div>
  );
}
