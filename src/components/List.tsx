import React, { useState } from "react";

interface ListProps {
  value: string[];
  onChangeValue: (arg: string[]) => void;
}

export default function List({ value, onChangeValue }: ListProps) {
  const [text, setText] = useState("");

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      value.push(text);
      onChangeValue(value);
      setText("");
    }
  };

  return (
    <div className="list">
      <ul>
        {value.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
