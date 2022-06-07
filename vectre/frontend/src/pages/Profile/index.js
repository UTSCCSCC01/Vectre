import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Flex,
  Text,
  Textarea,
  Box,
} from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";
import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Box
      id={"edit-user-profile-box"}
      display={"flex"}
      flexDirection={"column"}
      width={"30%"}
      alignContent={"center"}
    >
      <FormLabel
        htmlFor="name"
        color={"primary.400"}
        fontWeight={700}
        fontSize={"20px"}
        mb={"3px"}
      >
        Name:
      </FormLabel>
      <Input
        id="username"
        placeholder="what is your name good ser?"
        fontSize={"18px"}
        bg={"rgba(198, 219, 255, 0.32)"}
        border={"none"}
        _placeholder={{ fontWeight: "700", color: "sub.400" }}
      />
      <FormLabel
        htmlFor="name"
        color={"primary.400"}
        fontWeight={700}
        fontSize={"20px"}
        mb={"3px"}
      >
        Username:
      </FormLabel>
      <Input
        id="username"
        placeholder="what is your name good ser?"
        fontSize={"18px"}
        bg={"rgba(198, 219, 255, 0.32)"}
        border={"none"}
        _placeholder={{ fontWeight: "700", color: "sub.400" }}
      />
      <FormLabel
        htmlFor="Bio"
        color={"primary.400"}
        fontWeight={700}
        fontSize={"20px"}
        mb={"3px"}
      >
        Bio:
      </FormLabel>
      <Textarea
        id="bio"
        placeholder="i love me a good bio.&#13;&#10;love any projects?&#13;&#10;part of any communities?"
        fontSize={"18px"}
        bg={"rgba(198, 219, 255, 0.32)"}
        border={"none"}
        resize={"none"}
        size={"md"}
        minHeight={"140px"}
        _placeholder={{ fontWeight: "700", color: "sub.400" }}
      />
    </Box>
  );
};

export default Profile;
