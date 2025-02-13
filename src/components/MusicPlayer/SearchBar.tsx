
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs..."
          className="w-full px-4 py-3 pl-12 bg-music-card border border-music-border rounded-xl focus:outline-none focus:border-primary transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-music-textSecondary" />
      </div>
    </form>
  );
};
