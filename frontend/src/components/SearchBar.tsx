import React, { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (from: string, to: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = () => {
    onSearch(from, to);
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
    onSearch("", "");
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="From (e.g., New York)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="To (e.g., Los Angeles)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        Search
      </button>
      <button className={styles.clearBtn} onClick={handleClear} disabled={isLoading}>
        Clear
      </button>
    </div>
  );
};
