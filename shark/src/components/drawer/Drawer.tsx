import { Transition, } from 'react-transition-group'
import React, { useMemo, useRef, } from 'react'
import { useTheme, } from 'react-jss'
import type { ThemeGlobal, } from '@/main'
import cx from 'classnames'

const defaultStyle = (duration: number, animation: string) => ({
  transition: `transform ${duration}ms ${animation}`,
})

const getInitTwClassName = (dir: DrawerSlideInDirection) => ({
  top: '-translate-y-full',
  bottom: 'translate-y-full',
  left: '-translate-x-full',
  right: 'translate-x-full',
}[dir])
const getTransitionStyles = (dir: DrawerSlideInDirection) => {
  let _dir = {
    entering: {}, entered: {}, exiting: {}, exited: {},
  }
  switch (dir) {
  case 'top':
    _dir = {
      entering: { transform: 'translateY(-100%)', },
      entered: { transform: 'translateY(0)', },
      exiting: { transform: 'translateY(0)', },
      exited: { transform: 'translateY(-100%)', },
    }
    break
  case 'bottom':
    _dir = {
      entering: { transform: 'translateY(100%)', },
      entered: { transform: 'translateY(0)', },
      exiting: { transform: 'translateY(0)', },
      exited: { transform: 'translateY(100%)', },
    }
    break
  case 'left':
    _dir = {
      entering: { transform: 'translateX(-100%)', },
      entered: { transform: 'translateX(0)', },
      exiting: { transform: 'translateX(0)', },
      exited: { transform: 'translateX(-100%)', },
    }
    break
  case 'right':
    _dir = {
      entering: { transform: 'translateX(100%)', },
      entered: { transform: 'translateX(0)', },
      exiting: { transform: 'translateX(0)', },
      exited: { transform: 'translateX(100%)', },
    }
    break
  default:
    break
  }
  return {
    ..._dir,
    unmounted: { },
  }
}

type DrawerSlideInDirection = 'top' | 'left' | 'right' | 'bottom'

type DrawerProps = {
  open: boolean,
  direction?: DrawerSlideInDirection,
  children: React.ReactNode
  onDrawerClosed?: () => any
  duration?: number,
}
export default function Drawer (props: DrawerProps) {
  const {
    open,
    direction = 'bottom',
    children,
    onDrawerClosed = (delay: number) => {},
    duration = 300,
  } = props

  const innerOnDrawerClosed = () => {
    onDrawerClosed(duration)
  }

  const nodeRef = useRef(null)
  const theme: ThemeGlobal = useTheme()

  const transitionStyles = useMemo(() => getTransitionStyles(direction), [ direction, ])
  const initTwClassName = useMemo(() => getInitTwClassName(direction), [ direction, ])

  return (
    <Transition nodeRef={nodeRef} in={open} timeout={duration} onExited={innerOnDrawerClosed}>
      {
        (ts) => (
          <div
            className={cx([
              'fixed inset-0 bg-white z-999 overflow-hidden',
              initTwClassName,
            ])}
            ref={nodeRef}
            style={{
              ...defaultStyle(duration, theme.smoothCubicBezier),
              ...transitionStyles[ts],
            }}
          >
            { children }
          </div>
        )
      }
    </Transition>
  )
}
