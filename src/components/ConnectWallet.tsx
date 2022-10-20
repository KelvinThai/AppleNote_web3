import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { connectToWallet } from '../contracts/EthersConnect';
import { BORDER_STYLE } from '../themes/config'

function ConnectWallet() {
  const handleConnect = async () => { await connectToWallet();}
  return (
    <Box
      border={BORDER_STYLE}
      py="5px"
      px="10px"
      cursor="pointer"
      onClick={handleConnect}
    >
      <Text fontWeight="bold" color="gray.400">Connect your wallet</Text>
    </Box>
  )
}

export default ConnectWallet