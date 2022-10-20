import {
  Flex,
  Textarea,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useCallback, useRef } from "react";
import { InputCustom } from "../components";
import useSupabase from "../configs/useSupabase";
import { useWindowSize } from "../hooks/useWindowSize";
import { useAppSelector } from "../reduxs/hooks";

const Home: NextPage = () => {
  const { onUpdate } = useSupabase();
  const {height: SCREEN_HEIGHT} = useWindowSize();
  const { note } = useAppSelector((state) => state.auth);
  const [title, setTitle] = React.useState<string>("");
  const [data, setData] = React.useState<string>("");
  const [timer, setTimer] = React.useState<NodeJS.Timer | null>();

  const titleRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdate = useCallback(async () => {
    if (note) {
      const content = JSON.stringify(data || []);
      await onUpdate(title, content, note.id);
    }
  }, [data, note, onUpdate, title]);


  const handleChangeValue = useCallback(( e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
      index?: number,
      isTitle?: boolean
    ) => {
      const { value } = e.target;
      if (isTitle) {
        setTitle(value);
      } else  {
        setData(value);
      }

      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      const time = setTimeout(() => {
        handleUpdate();       
      }, 200);
      setTimer(time);
    },
    [handleUpdate, timer]
  );

  React.useEffect(() => {
    if (note) {
      const { title, content } = note;
      if (title === "New Note") {
        setTitle("");
        titleRef.current?.focus();
      } else {
        setTitle(title);
      }
      try {        
        setData(content);
      } catch (ex) {
        console.log(ex);
      }
    } else {
      setTitle("");
      setData("");
    }
  }, [note]);

  return (
    <Flex w="full" flexDir="column">
      <InputCustom
        ref={titleRef}
        isTitle
        value={title}
        onChange={(e) => handleChangeValue(e, undefined, true)}
        onSubmit={() => {
          inputRef.current?.focus();
        }}
      />  
        <Textarea 
          fontSize="18px"
          ref={inputRef}
          border="none" 
          focusBorderColor="none"
          w="full"
          h={SCREEN_HEIGHT * 0.85}
          value={data}
          onChange={(e) => handleChangeValue(e)}
          
        />
    </Flex>
  );
};

export default Home;
