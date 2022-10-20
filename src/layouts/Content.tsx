import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { ReactNode, useCallback } from "react";
import { ConnectWallet } from "../components";
import useSupabase from "../configs/useSupabase";
import { useWindowSize } from "../hooks/useWindowSize";
import { logoutAction } from "../reduxs/auths/auth.actions";
import { useAppDispatch, useAppSelector } from "../reduxs/hooks";
import { BORDER_STYLE, NAV_TOP_HEIGHT } from "../themes/config";
import { getToast, showSortAddress } from "../utils";

export interface IProps {
  children: ReactNode;
}
export default function Content({ children }: IProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { height: WINDOW_HEIGHT } = useWindowSize();
  const { info, note } = useAppSelector((state) => state.auth);
  const { onInsert, onDelete } = useSupabase();

  const handLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <Flex flex={{ base: 2, lg: 4 }} flexDir="column">
      <Flex
        w="full"
        height={`${NAV_TOP_HEIGHT}px`}
        alignItems="center"
        borderBlockEnd={BORDER_STYLE}
      >
        <HStack w="full" px="20px">
          <Image
            onClick={() => {
              if (!info) {
                toast(getToast("Please connect  your wallet"));
              } else {
                onInsert();
              }
            }}
            cursor="pointer"
            src="/images/edit.png"
            alt="add note"
            w="30px"
          />
          <Image
            onClick={() => {
              if (!info) {
                toast(getToast("Please connect  your wallet"));
              } else {
                note && onDelete(note.id);
              }
            }}
            cursor="pointer"
            src="/images/delete.png"
            alt="delete note"
            w="20px"
            h="30px"
            ml="20px !important"
          />
          <Spacer />
          <HStack alignItems="center">
            {info && (
              <>
                <Image src="/images/avatar.png" alt="wallet address" w="30px" />
                <Text fontWeight="bold" color="gray.400">
                  {showSortAddress(info.address)}
                </Text>

                <Box
                  borderLeft={BORDER_STYLE}
                  cursor="pointer"
                  marginLeft="10px"
                  paddingLeft="20px"
                  onClick={handLogout}
                >
                  <Text color="gray.500">Log out</Text>
                </Box>
              </>
            )}
            {!info && <ConnectWallet />}
          </HStack>
        </HStack>
      </Flex>

      <Flex
        w="full"
        minH={`${WINDOW_HEIGHT - NAV_TOP_HEIGHT}px`}
        overflowY="scroll"
        px="20px"
        py="20px"
      >
        {children}
      </Flex>
    </Flex>
  );
}
