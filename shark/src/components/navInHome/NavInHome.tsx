import { useMatch, useNavigate, } from 'react-router-dom'
import { useMemo, useState, } from 'react'
import Icon from '@mdi/react'
import cx from 'classnames'
import AddPayment from '@/components/navInHome/AddPayment'

export default function NavInHome ({
  routes,
}: {
  routes: Array<any>
}) {
  const navigate = useNavigate()
  const match = useMatch(location.pathname)

  const innerRoutes = useMemo(() => {
    const l = routes.length
    return routes.reduce((p, v, index) => {
      if (index === l / 2) {
        p.push({ path: 'draw', }, v)
      } else {
        p.push(v)
      }

      return p
    }, [])
  }, [ routes, ])

  return (
    <div className='h-20 bg-white w-full fixed bottom-0 flex justify-around items-center border-t border-gray-200 select-none'>
      {
        innerRoutes.map((route: any) => {
          const isMiddle = !route.path.startsWith('/')
          const textCsName = match?.pathname === route.path ? 'text-yellow-150' : 'text-gray-500'

          return (
            <div
              key={route.path}
              onClick={() => {
                !isMiddle && navigate(route.path)
              }}
              className='flex flex-col items-center h-full justify-center cursor-pointer'
            >
              {isMiddle
                ? <AddPayment />
                : (
                  <>
                    <Icon
                      size={1}
                      path={route.icon}
                      className={textCsName}
                    />
                    <span className={cx([ 'text-xs', textCsName, ])}>{ route.label }</span>
                  </>
                )}
            </div>
          )
        })
      }
    </div>
  )
}

