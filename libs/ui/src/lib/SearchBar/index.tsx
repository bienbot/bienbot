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
    font-family: ${({ theme }) => theme.font};
    font-size: 16px;
    line-height: 24px;
    background-color: ${({ theme }) => theme.colors.primary[200]};
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
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.medium};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.primary[700]};
    ::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colors.primary[300]};
    }
    :focus {
        outline: none;
        ::-webkit-input-placeholder {
            color: ${({ theme }) => theme.colors.primary[500]};
        }
    }
`;

const ShortcutIcon = styled.button`
    display: grid;
    place-items: center;
    color: ${({ theme }) => theme.colors.primary[700]};
    margin-right: 11px;
    padding: 3px;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[300]};
    cursor: pointer;
`;

export default SearchBar;
