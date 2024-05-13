import React from 'react'
import { CTX, } from '@/components/messageProvider/MessageProvider'

export default function useMessage () {
  const { setMessageQueue, } = React.useContext(CTX)

  return ({ id = 0, message = '123', }) => {
    setMessageQueue((preMessageQueue: any) => [
      ...preMessageQueue,
      { id, message, },
    ])
  }
}
