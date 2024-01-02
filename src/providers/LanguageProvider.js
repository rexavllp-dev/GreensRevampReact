'use client';
import { createContext, useContext, useState } from 'react';

const translations = {
    en: require('../../public/locales/en/en.json'),
    fr: require('../../public/locales/fr/fr.json'),
    ar: require('../../public/locales/ar/ar.json'),
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [direction, setDirection] = useState('ltr');

    const switchLanguage = (newLanguage) => {
         typeof window !== "undefined" && window.localStorage.setItem('language', newLanguage)
        setLanguage(newLanguage);
    };

    const switchDirection = (newDirection) => {
         typeof window !== "undefined" && window.localStorage.setItem('direction', newDirection)
        setDirection(newDirection);
    };

    const getTranslation = (label) => translations[language][label] || label;

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, getTranslation, direction, switchDirection }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
