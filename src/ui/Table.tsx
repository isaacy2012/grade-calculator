import React from "react";
import HeaderRow from "./HeaderRow";

export default function Table(
    props: { headers: string[], children?: React.ReactNode }
) {

    return (
        <div>
            <HeaderRow headers={props.headers}/>
            {props.children}
        </div>
    );
}
