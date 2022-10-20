import { VStack, Text, Heading, Image, HStack } from "@chakra-ui/react";
import React from "react";
import { BORDER_STYLE } from "../themes/config";
import { INoteItem } from "../_types_";

interface IProps {
  isHighline?: boolean;
  note: INoteItem;
  isNoBorder?: boolean;
  onSelect?: () => void;
}

export default function NoteCard({
  note,
  isNoBorder,
  isHighline,
  onSelect,
}: IProps) {
  return (
    <VStack
      _hover={{bg: 'yellow.100'}}
      cursor="pointer"
      bg={isHighline ? "yellow.100" : "transparent"}
      w="full"
      alignItems="flex-start"
      borderTop={!isNoBorder ? BORDER_STYLE : undefined}
      py="15px"
      px="10px"
      onClick={onSelect}
    >
      <Heading size="md">{note.title}</Heading>
      <Text color="gray.800">
        {new Date(note.updated_at || note.created_at).toLocaleString("en-US")}
      </Text>
      <HStack>
        <Image src="/images/note.png" alt="note" w="15px" />
        <Text color="gray.500">Notes</Text>
      </HStack>
    </VStack>
  );
}
