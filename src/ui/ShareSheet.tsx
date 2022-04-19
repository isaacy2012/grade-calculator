import {Assignment, SerializableAssignment} from "../model/Assignment";
import styled from "styled-components";
import {useMemo, useState} from "react";
import {CardContainer} from "./Card";
import {HiOutlineClipboardCopy} from "react-icons/hi";
import {FixedIconButton} from "./IconButton";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {GradeResolver} from "../model/grade/Grade";
import {writeCompressedJSON} from "../util/Deserializer";
import {H3} from "./helpers/Helpers";

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
    gradeResolver: GradeResolver | undefined,
    assignments: Assignment[],
    deserializer: (assignment: SerializableAssignment) => any
): string {
    let params = new URLSearchParams();
    params.append("saved", writeCompressedJSON(
            title,
            gradeResolver !== undefined ? gradeResolver.id : null,
            assignments
                .filter(it => it instanceof SerializableAssignment)
                .map((it) => deserializer(it as SerializableAssignment))
        )
    );
    return "https://" + window.location.host + process.env.PUBLIC_URL + "/?" + params.toString();
}


export default function ShareSheet(props: { title: string, gradeResolver: GradeResolver | undefined, assignments: Assignment[] }) {
    let {title, gradeResolver, assignments} = props;
    const shareFullUrl = useMemo(() =>
            shareUrl(title, gradeResolver, assignments, (it) => it.fullJSON()),
        [title, gradeResolver, assignments]
    )
    const shareTemplateUrl = useMemo(() =>
            shareUrl(title, gradeResolver, assignments, (it) => it.templateJSON()),
        [title, gradeResolver, assignments]
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
