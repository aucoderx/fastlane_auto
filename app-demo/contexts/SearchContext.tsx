import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
      {children}
    </SearchContext.Provider>
  );
}; 