import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import useSupabase from "../configs/useSupabase";
import { useWindowSize } from "../hooks/useWindowSize";
import Content from "./Content";
import Sidebar from "./Sidebar";

export interface IProps {
  children: ReactNode;
}
export default function MainLayout({ children }: IProps) {
  const { height } = useWindowSize();
  useSupabase();
  return (
    <Flex w="full" h={`${height}px`}>
      <Sidebar />
      <Content>{children}</Content>
    </Flex>
  );
}
