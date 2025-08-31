
import React from 'react';
import { SIDEBAR_TOPICS } from '../constants';

interface SidebarProps {
    onTopicSelect: (topic: string) => void;
}

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({ onTopicSelect }) => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto hidden md:block">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Temas Rápidos</h2>
            <div className="space-y-6">
                {SIDEBAR_TOPICS.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{section.title}</h3>
                        <ul className="space-y-1">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <button
                                        onClick={() => onTopicSelect(item)}
                                        className="w-full text-left flex items-center text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md p-2 transition-colors duration-150"
                                    >
                                        <BookIcon />
                                        <span className="text-sm">{item}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
};
