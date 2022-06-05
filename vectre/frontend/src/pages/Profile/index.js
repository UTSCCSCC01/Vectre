import NavBar from "../../components/NavBar";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-icon.svg";
import {
  Container,
  Stack,
  Box,
  Flex,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";

const Profile = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Container
        maxW={"50%"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"inherit"}
        display={"flex"}
        flexDirection={"column"}
        backgroundColor={"white"}
        borderRadius={"5px"}
        padding={"10px"}
      >
        <Text
          textAlign={"center"}
          textColor={"#3B82F6"}
          fontWeight={700}
          fontSize="20px"
          ml="45px"
        >
          Edit Profile
        </Text>
        <Container
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"right"}
        >
          <Button
            width={"25%"}
            rounded={"6px"}
            size={"lg"}
            fontWeight={700}
            px={8}
            py={8}
            rightIcon={<EditIcon h={4} w={4} mr={2} color={"white"} />}
            fontSize={"sm"}
            textColor={"white"}
            bg={"#3B82F6"}
            boxShadow={"0px 30px 60px rgba(59, 130, 246, 0.25)"}
            _hover={{ bg: "#3B82F6dd" }}
            _focus={{ outline: 0 }}
          >
            Edit
          </Button>
        </Container>
        <Container
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"left"}
        >
          <Text
            textAlign={"left"}
            textColor={"#3B82F6"}
            fontWeight={700}
            fontSize="20px"
            ml="45px"
          >
            Name:{" "}
          </Text>
          <Text
            textAlign={"left"}
            textColor={"#3B82F6"}
            fontWeight={700}
            fontSize="20px"
            ml="45px"
          >
            Username:{" "}
          </Text>
          <Text
            textAlign={"left"}
            textColor={"#3B82F6"}
            fontWeight={700}
            fontSize="20px"
            ml="45px"
          >
            Bio:{" "}
          </Text>
        </Container>
        <Container
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"right"}
        >
          <Button
            width={"25%"}
            rounded={"6px"}
            size={"lg"}
            fontWeight={700}
            px={8}
            py={8}
            fontSize={"sm"}
            textColor={"white"}
            bg={"#3B82F6"}
            boxShadow={"0px 30px 60px rgba(59, 130, 246, 0.25)"}
            _hover={{ bg: "#3B82F6dd" }}
            _focus={{ outline: 0 }}
          >
            Save
          </Button>
        </Container>
      </Container>
    </div>
  );
};

export default Profile;
