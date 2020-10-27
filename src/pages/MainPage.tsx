import React from "react";
import styled from "styled-components/macro";

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

  width: 58%;
`;

const IllustImg = styled.img`
  width: 25rem;
  margin-right: 7rem;
`;

const ContentContainer = styled.article``;

const MainText = styled.h1`
  color: #212529;
  font-size: 4rem;

  margin: 0;
`;

const SubText = styled.p`
  color: #adb5bd;
  font-size: 1.4rem;

  margin: 2rem 0;
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
  background-color: #40C057;
  color: white;

  margin-right: 1rem;
`;

const NoButton = styled(ButtonStyle)`
  background-color: transparent;
  border: 3px solid #40C057;
  color: #40C057;

  box-sizing: border-box;
`;

export default function MainPage() {
  return (
    <Main>
      <Container>
        <IllustImg src="/illusts/math.svg" />
        <ContentContainer>
          <MainText>
            끄래프로
            <br />
            방구석 피타고라스
            <br />
            되어보기.
          </MainText>
          <SubText>
            어떤 식이든지 입력하면, 여러분의 손보다 빠른 속도로 끄래프가 화면에
            그려줍니다. 끄래프와 함께라면 펜을 붙잡고 책상 앞에서 끙끙댈 필요가 없습니다.
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
