import {Assignment, SerializableAssignment} from "../model/Assignment";
import {encode} from "base-64";
import styled from "styled-components";
import {useMemo, useState} from "react";
import {H3} from "./output/H3";
import {CardContainer} from "./Card";
import {HiOutlineClipboardCopy} from "react-icons/hi";
import {FixedIconButton} from "./IconButton";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const CopyInput = styled.input`
  flex: 1;
  border: solid 1px ${({theme}) => theme.color.outline};
  padding: 10px;
  border-radius: 5px;

  &:focus {
    border: solid 1px ${({theme}) => theme.color.text};
    outline: none;
  }
`

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const CopiedText = styled.p`
  font-weight: bold;
  margin-top: 0.75em;
  margin-bottom: 0.5em;
  color: ${({theme}) => theme.color.highlight};
`

function shareUrl(
    title: string,
    assignments: Assignment[],
    deserializer: (assignment: SerializableAssignment) => any
): string {
    let params = new URLSearchParams();
    params.append("saved", encode(
        JSON.stringify(
            {
                title: title, assignments: assignments
                    .filter(it => it instanceof SerializableAssignment)
                    .map((it) => deserializer(it as SerializableAssignment))
            })
    ));
    return process.env.PUBLIC_URL + "/?" + params.toString();
}


export default function ShareSheet(props: { title: string, assignments: Assignment[] }) {
    let {title, assignments} = props;
    const shareFullUrl = useMemo(() =>
            shareUrl(title, assignments, (it) => it.fullJSON()),
        [title, assignments]
    )
    const shareTemplateUrl = useMemo(() =>
            shareUrl(title, assignments, (it) => it.templateJSON()),
        [title, assignments]
    )
    const [copied, setCopied] = useState<string | null>(null);

    return (
        <CardContainer>
            <H3 marginTop={"0.25em"}>Share Template with Scores</H3>
            {copied === "FULL" &&
            <CopiedText>Copied!</CopiedText>}
            <FlexDiv>
                <CopyInput readOnly value={shareFullUrl}/>
                <CopyToClipboard
                    text={shareFullUrl}
                    onCopy={() => setCopied("FULL")}
                >
                    <FixedIconButton><HiOutlineClipboardCopy/></FixedIconButton>
                </CopyToClipboard>
            </FlexDiv>
            <H3>Share Template</H3>
            {copied === "TEMPLATE" &&
            <CopiedText>Copied!</CopiedText>}
            <FlexDiv>
                <CopyInput readOnly value={shareTemplateUrl}/>
                <CopyToClipboard
                    text={shareTemplateUrl}
                    onCopy={() => setCopied("TEMPLATE")}
                >
                    <FixedIconButton><HiOutlineClipboardCopy/></FixedIconButton>
                </CopyToClipboard>
            </FlexDiv>
        </CardContainer>
    )
}
