import React, { useState } from "react";

import styled from "styled-components";
import { Dropdown, FormControl } from "react-bootstrap";

import { MdKeyboardArrowDown } from "react-icons/md";

import { logout } from "../../store/auth/actions";
import { useSelector, useDispatch } from "react-redux";

const TogglStyled = styled.div`
  display: flex;
  flex-direction: row;

  img {
    width: 36px;
    height: 36px;
    max-width: 36px;
    max-height: 36px;
    border: 1px solid black;
    border-radius: 50%;
    overflow: hidden;

    background-color: #f5f6f7;
    border: 3px solid white;
  }

  .svg-container {
    margin-right: 8px;
  }

  svg {
    width: 20px;
    height: auto;
    transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;
const DropDownItemStyled = styled.div``;

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TogglStyled
      ref={ref}
      onClick={(e) => {
        setIsOpen(!isOpen);
        onClick(e);
      }}
      open={isOpen}
    >
      <img src="./default_avatar.png" alt="" />
      <div className="svg-container">
        <MdKeyboardArrowDown />
      </div>
    </TogglStyled>
  );
});

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

function LoggedInDropDown() {
  const dispatch = useDispatch();

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle as={CustomToggle}> Hi! </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => dispatch(logout())}>
          Logout
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LoggedInDropDown;
