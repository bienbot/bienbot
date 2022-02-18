import styled from "styled-components";

export interface SearchBarProps {
    value: string;
    callback: () => void;
    onChange: (v: string) => void;
}

export function SearchBar(props: SearchBarProps) {
    return (
        <StyledLabel>
            <StyledSearchBar
                placeholder="Search"
                onChange={(e) => props?.onChange?.(e.target.value)}
                value={props.value}
            ></StyledSearchBar>
            <ShortcutIcon onClick={props.callback}>⌘+K</ShortcutIcon>
        </StyledLabel>
    );
}

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    position: relative;
    z-index: 100;
    font-family: Outfit;
    font-size: 16px;
    line-height: 24px;
    background-color: #ebebff;
    border-radius: 8px;
    max-width: 750px;
    width: 100%;
    margin: auto;
`;

const StyledSearchBar = styled.input`
    box-sizing: border-box;
    display: block;
    height: 36px;
    padding-left: 11px;
    width: 100%;
    border: none;
    background: none;
    font-family: Outfit, Arial;
    font-size: 16px;
    border-radius: 8px;
    color: #09095d;
    ::-webkit-input-placeholder {
        color: #a4a4da;
    }
    :focus {
        outline: none;
        ::-webkit-input-placeholder {
            color: #67678e;
        }
    }
`;

const ShortcutIcon = styled.button`
    display: grid;
    place-items: center;
    color: #09095d;
    margin-right: 11px;
    padding: 3px;
    border: none;
    background-color: #f6f6fe;
    color: #a4a4da;
    cursor: pointer;
`;

export default SearchBar;
