import React, { useState } from "react";
import styled from "styled-components/macro";

import MathFunction from "../utils/MathFunction";

const Container = styled.div`
  padding: 1.2rem 2rem;
  background-color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 10px;
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  font-family: monospace;
  font-size: 1.2rem;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  padding: 0.7rem 1rem;

  margin-bottom: 0.5rem;

  display: flex;
  align-items: center;
`;

const Input = styled.input`
  font-family: monospace;
  font-size: 1.2rem;
`;

const ColorSquare = styled.div`
  margin-left: auto;

  width: 24px;
  height: 24px;

  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
`;

interface FunctionListProps {
  value: MathFunction[];
  onChangeValue: (arg: MathFunction[]) => void;
}

export default function FunctionList({
  value,
  onChangeValue,
}: FunctionListProps) {
  const [text, setText] = useState("");

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const randomColor = "hsl(" + 360 * Math.random() + ", 94%, 67%)";
      onChangeValue(value.concat(new MathFunction(text, randomColor)));
      setText("");
    }
  };

  return (
    <Container>
      <List>
        {value.map((f, i) => (
          <ListItem key={i}>
            {f.rawBody}
            <ColorSquare style={{ backgroundColor: f.color }}/>
          </ListItem>
        ))}
      </List>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
}
