import React from "react";

import Image from "next/image";
import styled from "styled-components";

import Box from "../shared/Box";

const UserAvatarContainer = styled.div`
  background-color: white;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AvatarImage = styled.div`
  border-radius: 50% !important;
  width: 100% !important;
  height: auto;
  vertical-align: middle;
  background-color: white;

  overflow: hidden;

  flex-basis: 100%;
`;

const UserName = styled.div`
  span {
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    color: #586069;

    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
  }
`;

function UserAvatar() {
  return (
    <Box>
      <ImgContainer>
        <AvatarImage
          as={Image}
          src="/default_avatar.png"
          width={200}
          height={200}
          alt="User avatar"
        />
      </ImgContainer>
      <UserName>
        <span className="pl-2">John Dough</span>
      </UserName>
    </Box>
  );
}

export default UserAvatar;
