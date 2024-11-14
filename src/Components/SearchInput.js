import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Input as InputBox,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useColorModeValue,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { AiOutlineMail } from 'react-icons/ai';
  import { FaEye, FaEyeSlash } from 'react-icons/fa';
  
  export default function SearchInput({
    id = '',
    val = false,
    label = '',
    bColor = "gray.gray400",
    isRequired = false,
    type= "email",
    readOnly = false,
    helper = null,
    onChange = null,
    isDisabled = false,
    size = 'md',
    placeholder = `Enter ${label.toLowerCase()}`,
    pl = 0,
    py,
    rightIcon = null,
    w = "100%",
    borderColor = "greenn.greenn500",
    labelBg="#fff",
    leftIcon,
    iconColor =  "gray.gray300",
    ...rest
  }) {
    const [active, setActive] = useState(rest.value);
    // const [value, setValue] = useState(val);
  
    const [inputType, setInputType] = useState(type);
   
    return (
      <FormControl
        id={id}
        isReadOnly={readOnly}
        isDisabled={isDisabled}
        isRequired={isRequired}
        pos="relative"
      >
        <FormLabel
          pos="absolute"
          transform={`translateY(${active || val ? '-10.5px' : '10px'}) translateX(30px)`}
          bottom={'3'}
          zIndex="10"
          fontSize={active ? 'xs' : '12px'}
          fontWeight="400"
          color={"gray.gray300"}
          textTransform={"capitalize"}
          bg={ active ? labelBg :"transparent"}
          px="4px"
        >
          {label}
        </FormLabel>
  
        <InputGroup>
          <InputGroup>
          <InputLeftElement
          pointerEvents='none'
          children={<Box display={"flex"} color={active ? borderColor: iconColor} alignItems={"center"}   fontSize={"20px"}>{leftIcon}</Box>}
        />
            <InputBox
              // borderColor={Colors.red}
              onChange={onChange}
              {...rest}
              placeholder={active || !label ? placeholder : ''}
              type={inputType}
              focusBorderColor={'blue.blue400'}
              _focus={{ borderColor: borderColor }}
              size={size}
              py={py}
              color="#00000"
              _autofill={{bgColor: "#fff !important"}} 
              fontWeight={'400'}
              fontSize="16px"
              fontFamily={"body"}
              borderColor = {bColor}
              rounded="8px" 
              bg="transparent"
              w={w}
              onFocus={() => setActive(true)}
              onBlur={() => {
                if (!rest.value) {
                  setActive(false);
                }
              }}
              // height="56px"
            />
            {rightIcon && <InputRightElement children={rightIcon} />}
          </InputGroup>
          {type === 'password' && (
            <InputRightElement
              children={inputType  === "password" ? <FaEyeSlash color="green.500" /> : <FaEye color="green.500" />}
              cursor={'pointer'}
              onClick={() => {
                if (inputType === 'password') {
                  setInputType('text');
                } else {
                  setInputType('password');
                }
              }}
            />
          )}
        </InputGroup>
        {helper && (
          <FormHelperText pos={'absolute'} p={1} m="0" fontSize={'10px'}>
            {helper}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
  