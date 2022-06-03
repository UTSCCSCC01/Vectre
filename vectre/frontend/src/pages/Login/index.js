import PreLoginNavBar from '../../components/PreLoginNavBar'
import PreLogin from '../../components/PreLogin'
import UserSetupForm from '../../components/UserSetupForm'
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import {
  Box,
  useDisclosure
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { createUser, getUser } from "../../redux/actions/users";
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  const [wallet, setWallet] = useState("");

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      let user = {
        wallet_address: accounts[0]
      }
      dispatch(getUser(user))
      setWallet(user.wallet_address)
    }
  }

  useEffect(() => {
    if (login.response.success === false) {
      // if success is false, show set up page
      onOpen()
    }
    else if (login.response.success === true) {
      // if success is true, setup cookies for auth, move to feed page
      console.log("moving to feed. user_data: ", login.response.user_data)
      // window.location = '/feed'
    }
  }, [login, onOpen, wallet])

  return (
    <Box>
      <Box
        bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
        minHeight={'100vh'}>
        <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
          <LandingRect />
        </Box>
        <Box>
          <PreLoginNavBar connectAccount={connectAccount} />
          <PreLogin connectAccount={connectAccount} />
        </Box>
        <UserSetupForm isOpen={isOpen} onClose={onClose} onOpen={onOpen} walletAddress={wallet} dispatch={dispatch} createUser={createUser} />
      </Box>
    </Box>
  );
}

export default Login;
