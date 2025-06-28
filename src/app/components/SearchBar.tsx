"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./SearchBar.css";

const MaxSuggestions = 10;

export default function SearchBar() {
  const [names, setNames] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/pokemon-names")
      .then(res => res.json())
      .then(setNames);
  }, []);

  useEffect(() => {
    const match = pathname.match(/^\/mons\/([^/]+)/);
    if (match) {
      setQuery(match[1]);
    } else {
      setQuery("");
    }
    setFocused(false);
    inputRef.current?.blur();
  }, [pathname]);

  useEffect(() => {
    if (query) {
      setSuggestions(
        names.filter(name => name.startsWith(query)).slice(0, MaxSuggestions)
      );
    } else {
      setSuggestions([]);
    }
  }, [query, names]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setSuggestions(
      value
        ? names.filter(name => name.startsWith(value)).slice(0, MaxSuggestions)
        : []
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key == "Enter" && suggestions.length > 0) {
      const selected = suggestions[0];
      router.push(`/mons/${selected}`);
      setQuery(selected);
      setFocused(false);
    }
  }

  function handleFocus() {
    setFocused(true);
  }

  return (
    <nav className='search-container'>
      <input
        ref={inputRef}
        type='text'
        className='search-input'
        placeholder='Type a Pokémon!'
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onBlur={() => setFocused(false)}
        autoComplete='off'
      />
      {focused && suggestions.length > 0 && (
        <ul className='search-suggestions'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='search-suggestion'
              onMouseDown={e => e.preventDefault()}
            >
              <Link
                href={`/mons/${suggestion}`}
                onClick={() => setFocused(false)}
              >
                {suggestion}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
