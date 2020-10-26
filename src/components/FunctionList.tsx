import React, { useState } from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  padding: 2rem;
  background-color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
`;

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
   ;
`;

const Input = styled.input``;

interface FunctionListProps {
  value: string[];
  onChangeValue: (arg: string[]) => void;
}

export default function FunctionList({
  value,
  onChangeValue,
}: FunctionListProps) {
  const [text, setText] = useState("");

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      value.push(text);
      onChangeValue(value);
      setText("");
    }
  };

  return (
    <Container>
      <List>
        {value.map((f, i) => (
          <ListItem key={i}>{f}</ListItem>
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
