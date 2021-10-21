import styled from "styled-components";

export const H3 = styled.h3.attrs((props: { marginTop?: string }) => ({
    marginTop: props.marginTop,
}))`
  margin-top: ${({marginTop}) => marginTop ? marginTop : "1.5em"};
  margin-bottom: 0.5em;
`

export const H3First = styled(H3)`
    margin-top: 0;
`
