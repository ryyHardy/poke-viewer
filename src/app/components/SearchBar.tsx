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
  const [activeIndex, setActiveIndex] = useState<number>(-1); // Track active suggestion
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
    setActiveIndex(-1); // Reset active index when suggestions change
  }, [query, names]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setSuggestions(
      value
        ? names.filter(name => name.startsWith(value)).slice(0, MaxSuggestions)
        : []
    );
    setActiveIndex(-1);
    setFocused(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!focused || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        prev => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        const selected = suggestions[activeIndex];
        router.push(`/mons/${selected}`);
        setQuery(selected);
        setFocused(false);
      } else if (suggestions.length > 0) {
        const selected = suggestions[0];
        router.push(`/mons/${selected}`);
        setQuery(selected);
        setFocused(false);
      }
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  }

  function handleFocus() {
    setFocused(true);
  }

  return (
    <nav
      className='search-container'
      aria-label='Pokémon search'
    >
      <label
        htmlFor='search-input'
        className='visually-hidden'
      >
        Pokémon Input!
      </label>
      <input
        ref={inputRef}
        id='search-input'
        name='search-input'
        type='text'
        className='search-input'
        placeholder='Type a Pokémon!'
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onBlur={() => setFocused(false)}
        autoComplete='off'
        role='combobox'
        aria-autocomplete='list'
        aria-expanded={focused && suggestions.length > 0}
        aria-controls='search-suggestions-list'
        aria-activedescendant={
          activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
        }
      />
      {focused && suggestions.length > 0 && (
        <ul
          className='search-suggestions'
          id='search-suggestions-list'
          role='listbox'
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              id={`suggestion-${index}`}
              className={`search-suggestion${
                index === activeIndex ? " active" : ""
              }`}
              aria-selected={index === activeIndex}
              role='option'
              onMouseDown={e => e.preventDefault()}
              style={{
                background: index === activeIndex ? "#e0e0e0" : undefined,
              }}
            >
              <Link
                href={`/mons/${suggestion}`}
                onClick={() => setFocused(false)}
                tabIndex={-1}
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
