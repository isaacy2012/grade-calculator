import React from "react";
import styled from "styled-components";
import {StyledInput} from "./StyledInput";

const Card = styled.section`
  padding: 10px;
  border: solid 1px ${({theme}) => theme.color.outline};
  border-radius: 0 0 10px 10px;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`


// noinspection CssReplaceWithShorthandSafely
const TabButton = styled.button.attrs((props: { active: boolean, index: number, length: number }) => ({
    active: props.active,
    index: props.index,
    length: props.length,
}))`
  border: solid 1px ${({theme}) => theme.color.outline};
  border-left: ${({index}) => index === 0 ? "" : "none"};
  background: ${({active, theme}) => active ? theme.color.cardActiveBackground : theme.color.cardBackground};
  flex: 1;
  border-top-left-radius: ${({index}) => index === 0 ? 10 : 0}px;
  border-top-right-radius: ${({index, length}) => index === length-1 ? 10: 0}px;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`


export default function Tabbed(
    props: { tab: string, children?: React.ReactNode[] }
) {

    return (
        <section>
            <HeaderContainer>
                {props.children && props.children.map((it, index) => {
                    return <TabButton active={false} index={index} length={props.children!.length}>{"HI"}</TabButton>
                })}
            </HeaderContainer>
            <Card>
                hi there
            </Card>
        </section>
    );
}
