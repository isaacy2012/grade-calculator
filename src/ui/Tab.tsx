import React, {Fragment, useContext} from "react";
import { TabContext } from "./Tabbed";

export default function Tab(props: {tabName: string, children: React.ReactNode}) {
    const activeTabName = useContext(TabContext)

    return (
        <Fragment>
            {props.tabName === activeTabName ?
                props.children : null
            }
        </Fragment>
    );
}
