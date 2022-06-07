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
  Image,
  Box,
} from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";
import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-icon.svg";

import DefaultUserProfileBackground from "../../assets/images/default-user-profile-background.svg";
import DefaultUserProfilePhoto from "../../assets/images/default-user-profile-photo.svg";

const Profile = () => {
  return (
    <Modal isOpen={true} isCentered color={"primary.400"} size={"2xl"}>
      <ModalOverlay
        bg={"rgba(255, 255, 255, 0.01)"}
        backdropFilter="blur(20px)"
      />

      <ModalContent>
        <ModalHeader px={{ base: "24px", md: "64px" }}>
          <ModalCloseButton
            color={"primary.400"}
            top={4}
            left={4}
            transform={"scale(1.8)"}
            _focus={{ outline: 0 }}
            _hover={{ background: "white" }}
            _active={{ background: "white" }}
          />
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            color={"primary.400"}
          >
            <Text fontWeight={700} fontSize="28px" mr="15px">
              Edit Profile
            </Text>
            <FaUser size={"2rem"} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Box
            id={"edit-user-profile-box"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Image
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={DefaultUserProfileBackground}
            />
            <Image
              alignSelf={"center"}
              w={"20%"}
              h={"20%"}
              borderRadius={"full"}
              src={DefaultUserProfilePhoto}
            />
            <Button
              form={"setup-form"}
              alignSelf={"end"}
              ml={"32px"}
              background={"primary.400"}
              color={"white"}
              px={"46px"}
              py={"11px"}
              borderRadius={"6px"}
              rightIcon={<EditIcon />}
            >
              Edit
            </Button>
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
              // placeholder="what is your name good ser?"
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
              fontSize={"18px"}
              bg={"rgba(198, 219, 255, 0.32)"}
              border={"none"}
              resize={"none"}
              size={"md"}
              minHeight={"140px"}
              _placeholder={{ fontWeight: "700", color: "sub.400" }}
            />
            <br />
            <Button
              type={"submit"}
              form={"setup-form"}
              alignSelf={"end"}
              ml={"32px"}
              background={"primary.400"}
              color={"white"}
              px={"46px"}
              py={"11px"}
              borderRadius={"6px"}
            >
              Save
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
