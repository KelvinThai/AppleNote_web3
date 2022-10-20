import { Flex, Text, Input, Heading, Box, Image } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { NoteCard } from "../components";
import { useWindowSize } from "../hooks/useWindowSize";
import { selectedNote } from "../reduxs/auths/auth.reducers";
import { useAppDispatch, useAppSelector } from "../reduxs/hooks";
import { BORDER_STYLE, NAV_TOP_HEIGHT } from "../themes/config";
import { INoteItem } from "../_types_";

function Sidebar() {
  const dispatch = useAppDispatch();
  const { note: sNote } = useAppSelector((state) => state.auth);
  const { height } = useWindowSize();
  const { notes } = useAppSelector((state) => state.auth);
  const [localNotes, setLocalNotes] = React.useState<INoteItem[]>([]);
  const [timer, setTimer] = React.useState<NodeJS.Timer | null>();
  const [searchText, setSearchText] = React.useState<string>("");

  React.useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLocaleLowerCase();
      setSearchText(value);
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      const time = setTimeout(() => {
        const news = notes.filter(
          (p) => p.title.toLowerCase().indexOf(value) > -1
        );
        setLocalNotes(news);
      }, 300);
      setTimer(time);
    },
    [notes, timer]
  );

  return (
    <Flex flex={1} flexDir="column" h="100%" sx={{ borderRight: BORDER_STYLE }}>
      <Flex
        w="full"
        h={`${NAV_TOP_HEIGHT}px`}
        alignItems="center"
        px="20px"
        borderBlockEnd={BORDER_STYLE}
      >
        <Box w="full">
          <Input
            value={searchText}
            placeholder="Input title"
            paddingLeft="50px"
            onChange={onSearch}
          />
          <Box>
            <Image src="/images/search.png" alt="search"
              w="25px"
              position="absolute"
              top="27px"
              left="30px"
            />
          </Box>
        </Box>
      </Flex>
      <Flex
        w="full"
        flexDirection="column"
        h="100px"
        pl="10px"
        overflowY="scroll"
        height={`${height - NAV_TOP_HEIGHT}px`}
      >
        {localNotes.map((note, index) => (
          <NoteCard
            onSelect={() => dispatch(selectedNote(note))}
            note={note}
            key={index}
            isHighline={note && note.id === sNote?.id}
            isNoBorder={index === 0}
          />
        ))}
        {notes.length < 1 && (
          <Heading
            color="gray.400"
            size="lg"
            alignSelf="center"
            marginTop="20px"
          >
            No Notes
          </Heading>
        )}
      </Flex>
    </Flex>
  );
}

export default Sidebar;
