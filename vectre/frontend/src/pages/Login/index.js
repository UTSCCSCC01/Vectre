import NavBar from '../../components/NavBar'
import PreLogin from '../../components/PreLogin'
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import { Box, Text } from '@chakra-ui/react'
import { createUser, getUser } from "../../redux/actions/users";
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const users = useSelector(state => state && state.users && state.users.users);
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      // console.log(accounts);
      let user = {
        wallet_address: accounts[0]
      }
      dispatch(getUser(user))
    }
  }

  if (login.response.success === false) {
    // if success is false, show set up page
    console.log('is false')
  }
  else if (login.response.success === true) {
    // if success is true, setup cookies for auth, move to feed page
    console.log('is true')
  }
  else {
    // if success is undefined, 
    console.log('is undefined')
  }

  return (
    <Box>
      <Box
        bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
        minHeight={'100vh'}>
        <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
          <LandingRect />
        </Box>
        <Box>
          <NavBar connectAccount={connectAccount} />
          <PreLogin connectAccount={connectAccount} />
        </Box>
        <Text>{login.response.message}</Text>
      </Box>
    </Box>
  );
}

export default Login;
