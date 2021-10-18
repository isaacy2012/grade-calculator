import styled, {useTheme} from "styled-components";
import React, {ReactNode} from "react";
import HeaderRow from "./HeaderRow";

export default function Table(
    props: { headers: string[], children?: React.ReactNode }
) {
    const theme: any = useTheme();

    return (
        <div>
            <HeaderRow headers={props.headers}/>
        </div>
    );
}
