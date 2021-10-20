import styled from "styled-components";

export const Container = styled.section.attrs((props: { top?: string, bottom?: string }) => ({
    top: props.top ? props.top : "0",
    bottom: props.bottom ? props.bottom : "0",
}))`
  margin-top: ${({top}) => top};
  margin-bottom: ${({bottom}) => bottom};
  margin-left: auto;
  margin-right: auto;
  width: min(550px, 90vw);
`

