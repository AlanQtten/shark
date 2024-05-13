import { createUseStyles, useTheme, } from 'react-jss'
import cx from 'classnames'
import type { ThemeGlobal, } from '@/main'

const usePaymentStyles = createUseStyles<any, any, ThemeGlobal>((theme) => {
  const { yellow150, } = theme
  return {
    canvas: {
      backgroundImage: `linear-gradient(to bottom, ${yellow150} 0%, ${yellow150} 25%, transparent 27%, transparent 100%)`,
    },
  }
})

const id = 0
export default function Payment () {
  const theme = useTheme()
  const classnames = usePaymentStyles(theme)

  return (
    <div className={cx([ 'h-full overflow-y-auto', classnames.canvas, ])}>
      {
        // Array(100).fill(0).map((_, index) => (
        //   <div key={id++}>
        //     payment
        //     { index }
        //   </div>
        // ))
      }
    </div>
  )
}
