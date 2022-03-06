import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const ButtonStyle = styled.button`
  color: ${(props) => ("#ffff")};
  border: none;
  display: inline-block;
  text-decoration: none;
  width: ${(props) => props.size};
  height: ${(props) => props.height};
  padding: 0.875em 1em;
  font-weight: 400;
  font-size: 1em;
  cursor: pointer;
  border-radius: 4px;
  line-height: 1;
  background: ${(props) =>
    "#d5b0a6" };
  text-align: center;
  transition-duration: 0.2s, 0.2s;
  transition-timing-function: ease-in, ease-out;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* margin-top: 30px; */
  &:hover {
    color: ${(props) => "#d5b0a6"};
    background: ${(props) => " #ffffff"};
  }
`;

export const Button = ({
  children,
  size,
  onClick,
  primary,
  as,
  href,
  height,
  disabled,
}) => (
  <ButtonStyle
    onClick={onClick}
    size={size}
    primary={primary}
    as={as}
    href={href}
    height={height}
    disabled={disabled}
  >
    {children}
  </ButtonStyle>
);

Button.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.string.isRequired,
};
