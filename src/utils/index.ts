import { UseToastOptions } from "@chakra-ui/react";

export const showSortAddress = (address: string): string => {
  return `${address?.substring(0, 4)}...${address?.substring(
      address.length - 4,
      address.length
  )}`
}

// @ts-ignore
export const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getToast = (description: string | object, status: UseToastOptions["status"] = 'error', title = 'Error'): UseToastOptions => {
  if (typeof description === 'string')
    return { title, status, position: 'bottom-right', description, duration: 3000 }
  let msg = 'something wrong!';
 // @ts-ignore no problem in operation, although type error appears.
  if (typeof description === 'object' && description['message']) {
  // @ts-ignore no problem in operation, although type error appears.
    msg = description['message'];
  }
  return { title, status, position: 'top-right', description: msg, duration: 3000 } 
}