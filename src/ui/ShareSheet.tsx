import {Assignment} from "../model/Assignment";
import {encode} from "base-64";
import styled from "styled-components";
import {Fragment} from "react";

const CopyInput = styled.input`
`

export default function ShareSheet(props: { title: string, assignments: Assignment[] }) {
    let {title, assignments} = props;

    function shareUrl(deserializer: (assignment: Assignment) => any): string {
        console.log(JSON.stringify(assignments.map(deserializer)));
        let params = new URLSearchParams();
        params.append("saved", encode(JSON.stringify(assignments.slice(0, -1).map(deserializer))));
        return process.env.PUBLIC_URL + params.toString();
    }

    function shareFullUrl(): string {
        return shareUrl((it) => it.fullJSON());
    }

    function shareTemplateUrl(): string {
        return shareUrl((it) => it.templateJSON());
    }

    return (
        <Fragment>
            <CopyInput value={shareFullUrl()}/>
            <CopyInput value={shareTemplateUrl()}/>
        </Fragment>
    )
}
