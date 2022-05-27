import UsersTest from "../../components/users/UsersTest";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box height={'100vh'}>
      <div>
        <h1>Page for Setup</h1>
        <UsersTest />
      </div>
    </Box>
  );
}

export default HomePage;
