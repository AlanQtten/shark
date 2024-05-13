import { createUseStyles, } from 'react-jss'
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react'
import Drawer from '@/components/drawer/Drawer'
import cx from 'classnames'
import Icon from '@mdi/react'
import {
  mdiBackspaceOutline, mdiCalendarMonthOutline, mdiPlus,
} from '@mdi/js'
import { useSelector, } from 'react-redux'
import { RootState, } from '@/redux'
import iconPackage from '@/scripts/iconPackage'
import { executeFnOrNot, } from '@/utils'
import Big from 'big.js'
import useMessage from '@/components/messageProvider/useMessage'
import LabelSettingDrawer from '@/components/navInHome/LabelSettingDrawer'

const useAddPaymentStyle = createUseStyles({
  halfCircle: {
    transform: 'translateY(60%)',
    clipPath: 'circle(50% at 50% 0)',
  },
})
export default function AddPayment () {
  const classnames = useAddPaymentStyle()
  const [ open, setOpen, ] = useState(false)

  const openAddPaymentDrawer = () => {
    setOpen(true)
  }

  return (
    <div className='h-full bg-red-900 relative'>
      <AddPaymentDrawer open={open} setOpen={setOpen} />

      <div className={cx([ 'w-20 h-20 border border-gray-200 bg-white rounded-full absolute -translate-x-1/2 -translate-y-1/2', ])}>
        <div className={cx([ 'w-20 h-20 relative bg-white', classnames.halfCircle, ])} />

        <div
          onClick={openAddPaymentDrawer}
          className='w-16 h-16 bg-yellow-150 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'
        >
          <Icon
            path={mdiPlus}
            size={2}
          />

          <span className='text-xs absolute top-full text-gray-500 absolute translate-y-1/2'>记账</span>
        </div>
      </div>
    </div>
  )
}

function AddPaymentDrawer ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const btn = useRef<HTMLButtonElement>(null)
  const [ activeTab, setActiveTab, ] = useState(0)
  const [ tickWidth, setTickWidth, ] = useState(0)

  const [ activeLabelId, setActiveLabelId, ] = useState(-1)
  const [ openPaymentPopup, setOpenPaymentPopup, ] = useState(false)
  const [ openLabelSetting, setOpenLabelSetting, ] = useState(false)

  useEffect(() => {
    setTickWidth(btn.current!.getBoundingClientRect().width)
  }, [])

  const handleActiveLabel = (label: any) => {
    if (label.labelId < 0) {
      setOpenLabelSetting(true)
    } else {
      setActiveLabelId(label.labelId)
      setOpenPaymentPopup(true)
    }
  }

  const onClose = (delay = 0) => {
    setActiveLabelId(-1)
    setTimeout(() => {
      setOpenPaymentPopup(false)
    }, delay)
  }

  const changeActiveTab = (activeTabId: number) => {
    setActiveTab(activeTabId)
    setOpenPaymentPopup(false)
    setActiveLabelId(-1)
  }

  return (
    <Drawer open={open} onDrawerClosed={onClose} direction='right'>
      <div className='absolute h-12 bg-yellow-150 top-0 left-0 right-0 flex justify-center'>
        <div className='flex justify-center items-center h-full relative'>
          <button
            ref={btn}
            onClick={() => {
              changeActiveTab(0)
            }}
          >
            支出
          </button>
          <button
            className='ml-4'
            onClick={() => {
              changeActiveTab(1)
            }}
          >
            收入
          </button>

          <div className='absolute bottom-1 h-0.5 w-full'>
            <div className='absolute top-0 bottom-0 w-2 bg-black transition-left' style={{ width: tickWidth, left: activeTab === 0 ? 0 : `calc(100% - ${tickWidth}px)`, }} />
          </div>
        </div>

        <button
          className='absolute right-4 top-1/2 -translate-y-1/2 text-sm'
          onClick={() => {
            setOpen(false)
          }}
        >
          取消
        </button>
      </div>

      <div
        className='absolute top-12 bottom-0 left-0 right-0 -right-full flex flex-col'
      >
        <div
          className='flex w-[200%] flex-1 overflow-y-scroll transition-transform'
          style={{
            transform: `translateX(${activeTab === 0 ? 0 : '-50%'})`,
          }}
        >
          <LabelPageWrapper labelType={0} handleActiveLabel={handleActiveLabel} activeLabelId={activeLabelId} />
          <LabelPageWrapper labelType={1} handleActiveLabel={handleActiveLabel} activeLabelId={activeLabelId} />
        </div>

        <AddPaymentPopup open={openPaymentPopup} />
      </div>

      <LabelSettingDrawer open={openLabelSetting} setOpen={setOpenLabelSetting} />
    </Drawer>
  )
}

type LabelPageWrapperProps = {
  labelType: number,
  activeLabelId: number,
  handleActiveLabel: (label: any) => any,
}

function LabelPageWrapper (props: LabelPageWrapperProps) {
  const {
    labelType = 0,
    activeLabelId = -1,
    handleActiveLabel = (label: any) => {},
  } = props

  const labelList = useSelector(
    (state: RootState) => [ ...state
      .labelReducers
      .customLabelList, ]
      .sort((a: any, b: any) => a.rankIndex - b.rankIndex)
  )

  const wrapper = useRef<HTMLDivElement>(null)

  const labelListWithType = useMemo(
    () => labelList
      .filter((_: any) => _.labelType === labelType)
      .concat([ {
        labelIcon: 'mdiCogOutline',
        labelName: '设置',
        labelId: labelType - 9999,
      }, ]),
    [ labelList, activeLabelId, ]
  )

  return (
    <div className={cx([ 'w-1/2 h-full overflow-y-scroll px-10 py-4 flex flex-wrap content-start', ])} ref={wrapper}>
      {
        labelListWithType.map((label: any, i: number) => {
          const isActive = label.labelId === activeLabelId
          return (
            <div
              className={cx([
                'flex flex-col justify-center items-center',
                // i < labelCount - 4 ? 'mb-4' : null,
                i >= 4 ? 'mt-4' : null,
              ])}
              key={label.labelId}
              style={{
                marginLeft: i % 4 === 0 ? 0 : 'calc((100% - 3rem * 4) / 3)',
              }}
              onClick={(e) => {
                handleActiveLabel(label)

                const _div = e.currentTarget
                const _wrapper = wrapper.current!

                setTimeout(() => {
                  _wrapper.scrollTo({
                    top: _div.offsetTop - 18, // 18 = spacing.4 = 1rem
                    behavior: 'smooth',
                  })
                }, 0)
              }}
            >
              <div className={cx([
                'w-12 h-12 rounded-full flex justify-center items-center',
                isActive ? 'bg-yellow-150' : 'bg-gray-200',
              ])}
              >
                <Icon
                  path={iconPackage[label.labelIcon]}
                  size={1}
                  className={isActive ? 'text-black' : 'text-gray-500'}
                />
              </div>

              <div className='text-xs mt-2'>{ label.labelName }</div>
            </div>
          )
        })
      }
    </div>
  )
}

enum CalculatorLayoutType {
  Number,
  Calendar,
  Calc,
  Point,
  Delete,
  Finish,
}
const calculatorLayout = [
  { label: '7', type: CalculatorLayoutType.Number, },
  { label: '8', type: CalculatorLayoutType.Number, },
  { label: '9', type: CalculatorLayoutType.Number, },
  { label: '今天', type: CalculatorLayoutType.Calendar, icon: mdiCalendarMonthOutline, },
  { label: '4', type: CalculatorLayoutType.Number, },
  { label: '5', type: CalculatorLayoutType.Number, },
  { label: '6', type: CalculatorLayoutType.Number, },
  { label: '+', type: CalculatorLayoutType.Calc, },
  { label: '1', type: CalculatorLayoutType.Number, },
  { label: '2', type: CalculatorLayoutType.Number, },
  { label: '3', type: CalculatorLayoutType.Number, },
  { label: '-', type: CalculatorLayoutType.Calc, },
  { label: '.', type: CalculatorLayoutType.Point, },
  { label: '0', type: CalculatorLayoutType.Number, },
  { label: '', type: CalculatorLayoutType.Delete, icon: mdiBackspaceOutline, },
  { label: (bool = true) => (bool ? '=' : '完成'), type: CalculatorLayoutType.Finish, highlight: true, },
]
const layoutCount = calculatorLayout.length
const plusTester = /\+/g
const minusTester = /-/g
const pointTester = /\./g

const inPlusTester = (m: string) => !!m.match(plusTester)
const inMinusTester = (m: string) => {
  const matcher = m.match(minusTester)

  if (!matcher) {
    return false
  } if (matcher.length === 1) {
    return m.lastIndexOf('-') !== 0
  }
  return true
}
const getNumberFixed = (numberStr: string) => {
  if (!numberStr.match(pointTester)) {
    return 0
  }

  return numberStr.split('.').pop()?.length
}

function AddPaymentPopup ({
  open = false,
}) {
  const [ money, setMoney, ] = useState('0.00')
  const message = useMessage()

  const inPlus = inPlusTester(money)
  const inMinus = inMinusTester(money)
  const inCalc = inPlus || inMinus

  const getTwoNumber = (m: string) => {
    const minusMatcher = m.match(minusTester)
    const plusMatcher = m.match(plusTester)

    if (minusMatcher && minusMatcher.length === 2) {
      const separatorIndex = m.lastIndexOf('-')

      return [
        m.slice(0, separatorIndex),
        m.slice(separatorIndex + 1),
      ]
    }

    if (plusMatcher) {
      return m.split('+')
    }

    if (minusMatcher) {
      return m.split('-')
    }

    throw Error('never here')
  }

  const calculatorHandler = (cl: any) => {
    const isInit = money === '0.00'

    switch (cl.type) {
    case CalculatorLayoutType.Number:
      if (isInit) {
        setMoney(cl.label)
        return
      }
      if (inCalc) {
        const [ , lastNumber, ] = getTwoNumber(money)

        if (lastNumber === '') {
          setMoney((m) => `${m}${cl.label}`)
          return
        }

        if (getNumberFixed(lastNumber) === 2) {
          return
        }

        setMoney((m) => `${m}${cl.label}`)
        return
      }

      if (getNumberFixed(money) === 2) {
        return
      }
      setMoney((m) => (m === '0' ? cl.label : `${m}${cl.label}`))

      break

    case CalculatorLayoutType.Point:
      if (inCalc) {
        const [ , lastNumber, ] = getTwoNumber(money)

        if (lastNumber === '') {
          setMoney((m) => `${m}0${cl.label}`)
        } else {
          lastNumber.match(pointTester) || setMoney((m) => `${m}${cl.label}`)
        }
      } else {
        money.match(pointTester) || setMoney((m) => `${m}${cl.label}`)
      }

      break

    case CalculatorLayoutType.Delete:
      if (money.length === 1) {
        setMoney('0')
      } else {
        setMoney((m) => m.slice(0, m.length - 1))
      }
      break

    case CalculatorLayoutType.Calc:
      if (inCalc) {
        ((cl.label === '+' && inMinus) || (cl.label === '-' && inPlus)) &&
        setMoney((m) => `${m.slice(0, m.length - 1)}${cl.label}`)
      } else {
        setMoney((m) => `${m}${cl.label}`)
      }

      break

    case CalculatorLayoutType.Finish:
      if (isInit) {
        message({ id: 2, message: '请输入金额', })
        return
      }
      if (inCalc) {
        setMoney((m) => {
          const [ firstNumber, lastNumber, ] = getTwoNumber(m)

          return new Big(firstNumber)[inPlus ? 'add' : 'minus'](lastNumber).toString()
        })
      }

      break

    case CalculatorLayoutType.Calendar:
      console.log(inPlus, inMinus)
      break
    default:
      break
    }
  }

  return (
    <div
      className='w-full bg-white shadow-3xl shadow-black shrink-0'
      style={{
        display: open ? 'block' : 'none',
      }}
    >
      <div className='flex justify-end pr-4 py-2 text-2xl'>
        { money }
      </div>

      <div className='h-10 w-full px-2 pb-4'>
        <div className='h-8 w-full relative'>
          <input type='text' className='outline-0 focus:outline-0 bg-gray-200 pl-14 text-xs h-8 w-full rounded-lg leading-8' placeholder='点击填写备注' />

          <span className='absolute left-4 text-xs h-full leading-8'>备注：</span>
        </div>
      </div>

      <div className='border-t border-gray-200 flex flex-wrap'>
        {
          calculatorLayout.map((cl, index) => {
            const _label = executeFnOrNot(cl.label, inCalc)
            return (
              <div
                key={_label}
                className={cx([
                  'w-1/4 h-14 flex justify-center items-center border-gray-200 active:bg-yellow-150',
                  (index + 1) % 4 === 0 ? null : 'border-r',
                  index < layoutCount - 4 ? 'border-b' : null,
                  cl.highlight ? 'bg-yellow-150' : null,
                ])}
                onClick={() => {
                  calculatorHandler(cl)
                }}
              >
                {
                  cl.icon && <Icon path={cl.icon} size={0.8} />
                }
                <span className={cl.icon ? 'ml-1' : undefined}>{ _label }</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
