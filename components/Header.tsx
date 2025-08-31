
import React from 'react';

const GraduationCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L1 7.5V13.7C1 14.2 1.3 14.6 1.8 14.8L12 20L22.2 14.8C22.7 14.6 23 14.2 23 13.7V7.5L12 2ZM12 17.9L3 13.1V9.4L12 14.1L21 9.4V13.1L12 17.9ZM20 7.2L12 12L4 7.2L12 4.4L20 7.2Z" />
        <path d="M23 7.5L12 12.5L1 7.5L12 2L23 7.5Z" stroke="#0D47A1" strokeWidth="0.5" />
        <path d="M5 14.5V17.5L12 21L19 17.5V14.5L12 18L5 14.5Z" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-blue-900 text-white p-4 flex items-center shadow-md z-10">
            <GraduationCapIcon />
            <div className="ml-3">
                <h1 className="text-xl font-bold tracking-wider">Asesor de Tesis Virtual</h1>
                <p className="text-sm text-blue-200">Universidad Nacional de Educación - La Cantuta</p>
            </div>
        </header>
    );
};
