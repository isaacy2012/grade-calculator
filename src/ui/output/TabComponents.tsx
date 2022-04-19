import styled from "styled-components";

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

