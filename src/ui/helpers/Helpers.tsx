import styled from "styled-components";
import React from "react";

export const Display = styled.span.attrs((props: { marginRight?: string }) => ({
    marginRight: props.marginRight,
}))`
  margin-right: ${({marginRight}) => marginRight ? marginRight : undefined};
  color: ${({theme}) => theme.color.text};
  font-weight: 500;
  font-size: 3rem;
`
export const Hi = styled.span.attrs((props: { enabled: boolean }) => ({
    enabled: props.enabled,
}))`
  color: ${({enabled, theme}) => enabled ? theme.color.highlight : theme.color.utilityText};
`

export const UtilityText = styled.span`
  color: ${({theme}) => theme.color.utilityText};
`

export const Or = styled.b`
  white-space: pre;
`

export const H3 = styled.h3.attrs((props: { marginTop?: string }) => ({
    marginTop: props.marginTop,
}))`
  margin-top: ${({marginTop}) => marginTop ? marginTop : "1.5em"};
  margin-bottom: 0.5em;
`

export const H3First = styled(H3)`
    margin-top: 0;
`

export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]
