import styled from "styled-components";
import {InputChangeEvent, StyledInput} from "../StyledInput";
import React from "react";

const DisplayInput = styled(StyledInput).attrs((props: { width: string }) => ({
    width: props.width,
}))`
  width: calc(${({width}) => width}px + 5px);
  font-weight: 500;
  font-size: 3rem;
  text-decoration: underline;
`

const Span = styled.span`
  font-weight: 500;
  font-size: 3rem;
`

export default function VariableWidthInput(props: { value: string, placeholder?: string, onChange: (event: InputChangeEvent) => void }) {
    const {value, placeholder} = props;
    const [visible, setVisible] = React.useState(false);
    const [width, setWidth] = React.useState<string>("auto");
    const measurer = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        setVisible(true)
    }, [value])

    React.useLayoutEffect(() => {
        if (visible && measurer.current) {
            const rect = measurer.current.getBoundingClientRect();
            setWidth(rect.width.toString());
            setVisible(false);
        }
    }, [visible])

    return (
        <>
      <Span ref={measurer}>
        {visible && (placeholder ? value.length > placeholder.length ? value : placeholder : value)}
      </Span>
            <DisplayInput
                type="text"
                placeholder={props.placeholder}
                value={value}
                width={width+1}
                onChange={props.onChange}
            />
        </>
    )
}
