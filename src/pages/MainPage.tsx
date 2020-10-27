import React from "react";
import styled from "styled-components/macro";
import TextLoop from "react-text-loop";

const Main = styled.main`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 65rem;

  @media screen and (max-width: 1110px) {
    flex-direction: column;
    width: 40rem;
    align-items: flex-start;

    margin: 3rem;
  }
`;

const IllustImg = styled.img`
  width: 23rem;
  margin-right: 7rem;

  @media screen and (max-width: 1110px) {
    margin-right: 0;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 470px) {
    width: 17rem;
  }
`;

const ContentContainer = styled.article``;

const MainText = styled.h1`
  color: #212529;
  font-size: 4rem;
  word-break: keep-all;

  margin: 0;

  @media screen and (max-width: 1110px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 470px) {
    font-size: 2.5rem;
  }
`;

const SubText = styled.p`
  color: #adb5bd;
  font-size: 1.4rem;

  margin: 2rem 0;

  @media screen and (max-width: 470px) {
    font-size: 1.1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonStyle = styled.button`
  border-radius: 1.2rem;
  border: none;
  font-size: 1.1rem;

  padding: 0 2rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  outline: none;

  height: 2.4rem;
`;

const StartButton = styled(ButtonStyle)`
  background-color: #40c057;
  color: white;

  margin-right: 1rem;
`;

const NoButton = styled(ButtonStyle)`
  background-color: transparent;
  border: 3px solid #40c057;
  color: #40c057;

  box-sizing: border-box;
`;

const ConditionalBr = styled.br`
  display: none;

  @media screen and (max-width: 470px) {
    display: block;
  }
`;

export default function MainPage() {
  const mathematicians = [
    "피타고라스",
    "오일러",
    "가우스",
    "라이프니츠",
    "힐베르트",
    "뉴턴",
    "폰 노이만",
    "아인슈타인",
    "데카르트",
    "푸앵카레",
    "아르키메데스",
    "앤드루 와일즈",
    "리만",
    "테런스 타오",
  ];

  return (
    <Main>
      <Container>
        <IllustImg src="/illusts/math.svg" />
        <ContentContainer>
          <MainText>
            끄래프로
            <br />
            방구석 <ConditionalBr />
            <TextLoop interval={1500} children={mathematicians} />
            <br />
            되어보기.
          </MainText>
          <SubText>
            어떤 식이든지 입력하면, 여러분의 손보다 빠른 속도로 끄래프가 화면에
            그려줍니다. 끄래프와 함께라면 펜을 붙잡고 책상 앞에서 끙끙댈 필요가
            없습니다.
          </SubText>
          <ButtonContainer>
            <StartButton>시작하기</StartButton>
            <NoButton>싫어욧</NoButton>
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </Main>
  );
}
