import styled from "styled-components";

export const IconButton = styled.button.attrs((props: { fontSize?: string }) => ({
    fontSize: props.fontSize,
}))`
  background: none;
  border: none;
  text-align: center;
  font-size: ${({fontSize}) => fontSize ? fontSize : "1.3em"};
  color: ${({theme}) => theme.color.button};

  &:hover {
    color: ${({theme}) => theme.color.buttonPressed};
  }
`

export const FixedIconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  padding-right: 0;
  width: 2.5rem;
  color: ${({theme}) => theme.color.button};

  &:hover {
    color: ${({theme}) => theme.color.buttonPressed};
  }
`


