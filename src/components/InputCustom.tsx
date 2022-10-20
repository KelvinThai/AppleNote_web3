/* eslint-disable react/display-name */
import { Flex, Input, InputProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends InputProps {
  isTitle?: boolean;
  onSubmit?: () => void;
}

const InputCustom = React.forwardRef<HTMLInputElement, IProps>(({isTitle, onSubmit, ... props}: IProps, ref) => { 
  return (
    <Flex w="full">
    <Input
      ref={ref}
      fontWeight={isTitle ? 'bold' : 'normal'}
      fontSize={isTitle ? '35px' : '20px'}
      border="none"
      focusBorderColor="none"
      onKeyDown={(e) => {
        if (e.key === "Enter" && onSubmit) {
          onSubmit()
        }
      }}
      {...props}
    />
    </Flex>
  )
})

export default InputCustom;