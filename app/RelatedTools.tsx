import React from 'react';
import { getRelatedTools } from './tool-relationships';

interface RelatedToolsProps {
  currentTool: string;
  className?: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ currentTool, className = '' }) => {
  const relatedTools = getRelatedTools(currentTool);
  
  if (relatedTools.length === 0) return null;
  
  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedTools.map((tool) => (
          <a
            key={tool.url}
            href={tool.url}
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <h4 className="font-medium text-gray-900 mb-1">{tool.name}</h4>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </a>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a 
          href="https://larrys-world.github.io/tools-directory/" 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Tools →
        </a>
      </div>
    </div>
  );
};

// Footer component with related tools
export const ToolFooter: React.FC<{ currentTool: string }> = ({ currentTool }) => {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-8">
      <RelatedTools currentTool={currentTool} className="mb-8" />
      <div className="text-center text-sm text-gray-600">
        <p>© 2024 Larry's World. Free online tools for everyone.</p>
        <div className="mt-2 space-x-4">
          <a href="https://larrys-world.github.io/tools-directory/" className="hover:text-gray-900">All Tools</a>
          <span>•</span>
          <a href="https://larrys-world.github.io/privacy/" className="hover:text-gray-900">Privacy</a>
          <span>•</span>
          <a href="https://larrys-world.github.io/contact/" className="hover:text-gray-900">Contact</a>
        </div>
      </div>
    </footer>
  );
};