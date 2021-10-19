import styled from "styled-components";

export const Container = styled.section`
  // width
  margin: 0 auto;
  //box-sizing: border-box;
  width: min(550px, 90vw);
`

export const MarginContainer = styled(Container).attrs((props: { top?: string, bottom?: string }) => ({
    top: props.top ? props.top : "0",
    bottom: props.bottom ? props.bottom : "0",
}))`
  margin-top: ${({top}) => top};
  margin-bottom: ${({bottom}) => bottom};
`

