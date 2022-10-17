import { StylesConfig } from "react-select";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export function getObjectStyle(): StylesConfig {
  return {
    container: (provided) => ({
      ...provided,
      width: "50vw",
      fontSize: "14px",
    }),
    control: (provided) => ({
      ...provided,
      height: "44px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#d6d6e3",
      ":focus-within": {
        borderColor: "#d6d6e3",
        boxShadow: `0 0 0 1px transparent`,
      },
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      color: isSelected ? "#0a00b4" : "#000014",
      background: "transparent",
      fontSize: "16px",
      ":hover": {
        background: "#0a00b415",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
      fontFamily: "Nunito",
    }),
  };
}

export const SelectContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: auto;
  `}
`;
