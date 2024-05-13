import React, { useMemo, useState, } from 'react'

export const CTX = React.createContext<any>({
  messageQueue: [],
})

export default function MessageProvider (props: any) {
  const {
    children,
  } = props

  const [ messageQueue, setMessageQueue, ] = useState([ { id: 1, message: '123', }, ])

  const provideValue = useMemo(() => ({ messageQueue, setMessageQueue, }), [ messageQueue, ])

  return (
    <CTX.Provider value={provideValue}>
      {children}
      <div className='fixed inset-0 z-9999 pointer-events-none opacity-0'>
        {
          messageQueue.map((_) => <span key={_.id}>{_.message}</span>)
        }
      </div>
    </CTX.Provider>
  )
}
