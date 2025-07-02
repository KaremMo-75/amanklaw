'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  themeColors?: any;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, themeColors }) => {
  return (
    <Card className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
      <CardContent className="p-8 text-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: themeColors?.primary ? `${themeColors.primary}20` : '#dbeafe' }}
        >
          <Icon 
            className="w-8 h-8"
            style={{ color: themeColors?.primary || '#1e40af' }}
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;