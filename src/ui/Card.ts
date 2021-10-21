import styled from "styled-components";

export const Card = styled.section.attrs((props: { marginTop?: string, marginBottom?: string }) => ({
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
}))`
  margin-top: ${({marginTop}) => marginTop ? marginTop : undefined};
  margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : undefined};
  padding: 1.5rem;
  border: solid 1px ${({theme}) => theme.color.outline};
  border-radius: 10px;
`

export const NoPaddingCard = styled(Card)`
  padding: 0;
`

export const BottomCard = styled(Card)`
  border-radius: 0 0 10px 10px;
`

