import Drawer from '@/components/drawer/Drawer'
import React, { useEffect, useMemo, useState, } from 'react'
import cx from 'classnames'
import { useSelector, } from 'react-redux'
import { RootState, useAppDispatch, } from '@/redux'
import Icon from '@mdi/react'
import iconPackage from '@/scripts/iconPackage'
import { mdiContentSaveOutline, } from '@mdi/js'
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd'
import { labelAction, labelReducers, } from '@/redux/label'

type LabelSettingDrawerProps = {
  open: boolean
  setOpen: (op: boolean) => void
}

const translateX0 = (translateStr: string | undefined) => {
  if (!translateStr) { return translateStr }
  const leftBracket = translateStr.indexOf('(')
  const comma = translateStr.indexOf(',')
  return `${translateStr.slice(0, leftBracket + 1)}0px${translateStr.slice(comma)}`
}

export default function LabelSettingDrawer (props: LabelSettingDrawerProps) {
  const {
    open,
    setOpen,
  } = props
  const [ activeTabId, setActiveTabId, ] = useState(0)
  const customLabelList = useSelector(
    (state: RootState) => state
      .labelReducers
      .customLabelList
  )
  const [ internalLabelList, setInternalLabelList, ] = useState<any[]>([])

  useEffect(() => {
    if (open) {
      console.log(customLabelList)
      setInternalLabelList([ ...customLabelList, ])
    }
  }, [ open, ])

  // const internalLabelList = useMemo(
  //   () => customLabelList
  //     .filter((label: any) => label.labelType === activeTabId)
  //     .map((label: any) => ({ ...label, draggableId: String(label.labelId), }))
  //     .sort((a: any, b: any) => a.randIndex - b.rankIndex)
  //   , [ customLabelList, activeTabId, ]
  // )

  // const [showingCustomLabelList, setShowingCustomList] = useState()

  const customLabelCount = customLabelList.length
  const dispatch = useAppDispatch()

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [ removed, ] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result.map((label, index) => ({
      ...label,
      rankIndex: index + 1,
    }))
  }

  function onDragEnd (result: DropResult) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    dispatch(labelAction.setLabelList(reorder(
      customLabelList,
      result.source.index,
      result.destination.index
    )))
  }

  return (
    <Drawer open={open} direction='right'>
      <div className='w-full h-full flex flex-col'>
        <div className='h-24 bg-yellow-150'>
          <div className='h-12 flex items-center px-4 relative'>
            <button onClick={() => {
              setOpen(false)
            }}
            >
              &lt;返回
            </button>

            <h1 className='text-xl absolute left-1/2 -translate-x-1/2'>类别设置</h1>
          </div>

          <div className='h-12 flex justify-center items-center'>
            <div className='h-3/5 w-4/5 rounded-md border-black border flex text-xs overflow-hidden'>
              <button
                className={cx([
                  'w-1/2 flex justify-center items-center',
                  activeTabId === 0 ? 'bg-black text-yellow-150' : null,
                ])}
                onClick={() => {
                  setActiveTabId(0)
                }}
              >
                支出
              </button>
              <button
                className={cx([
                  'w-1/2 flex justify-center items-center',
                  activeTabId === 1 ? 'bg-black text-yellow-150' : null,
                ])}
                onClick={() => {
                  setActiveTabId(1)
                }}
              >
                收入
              </button>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='label-setting-drawer'>
            {
              (dropProvider) => (
                <div
                  className='flex-1 bg-gray-200 py-2 overflow-y-scroll'
                  ref={dropProvider.innerRef}
                  {...dropProvider.droppableProps}
                >
                  {
                    internalLabelList.map((customLabel: any, index: number) => {
                      const isLast = index === customLabelCount - 1
                      return (
                        <Draggable draggableId={customLabel.draggableId} index={index} key={customLabel.labelId}>
                          {
                            (dragProvider, snapshot) => {
                              // console.log(dragProvider.draggableProps)
                              const style = {
                                ...dragProvider.draggableProps.style,
                                transform: translateX0(dragProvider?.draggableProps?.style?.transform),
                                // boxShadow: index === 3 ? '0 5px 5px gray,0 -2.5rem 5px gray' : undefined,
                                // backgroundColor: index === 3 ? 'red' : undefined,
                              }
                              return (
                                <div
                                  className={cx([
                                    'h-10 bg-white shadow-2xl',
                                    // snapshot.isDragging ? 'sha' : null,
                                  ])}
                                  ref={dragProvider.innerRef}
                                  {...dragProvider.draggableProps}
                                  style={style}
                                >
                                  <div className={cx([
                                    'h-full ml-6 flex items-center border-gray-100 relative bg-white',
                                    isLast ? null : 'border-b',
                                  ])}
                                  >
                                    <button className={cx([
                                      'w-4 h-4 mr-2 bg-red-600 text-white rounded-full flex justify-center items-center text-xl relative',
                                      'before:content before:absolute before:h-0.5 before:w-1/2 before:bg-white',
                                    ])}
                                    />

                                    <div
                                      className='w-6 h-6 ml-2 rounded-full flex justify-center items-center bg-gray-200'
                                    >
                                      <Icon
                                        path={iconPackage[customLabel.labelIcon]}
                                        size={0.6}
                                      />
                                    </div>

                                    <div className='ml-4 text-xs text-gray-500'>{customLabel.labelName}</div>

                                    <div
                                      className={cx([
                                        'absolute right-6 w-4 h-3 border-y border-gray-400',
                                        'before:content before:absolute before:h-[1px] before:top-1/2 before:-translate-y-1/2 before:left-0 before:right-0 before:bg-gray-400',
                                      ])}
                                      {...dragProvider.dragHandleProps}
                                    />
                                  </div>
                                </div>
                              )
                            }
                          }
                        </Draggable>
                      )
                    })
                  }
                </div>
              )
            }
          </Droppable>
        </DragDropContext>

        <div className='fixed bottom-0 h-10 bg-white shadow-card inset-x-0 flex justify-center items-center'>
          <div className='flex items-center'>
            <Icon path={mdiContentSaveOutline} size={0.7} />
            <span className='text-xs ml-2'>保存</span>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
