import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

const TypeBox: React.FC = () => {
  const { currentInput, setCurrentInput, handleKeyPress } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when currentInput changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentInput]);

  // Auto-focus when input loses focus
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentInput('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="absolute opacity-0 pointer-events-none"
      style={{ top: -9999, left: -9999 }}
    >
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-0 h-0"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus
      />
    </form>
  );
};

export default TypeBox;