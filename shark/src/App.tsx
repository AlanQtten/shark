import { Route, Routes, } from 'react-router-dom'
import { useEffect, useState, } from 'react'
import {
  mdiNoteTextOutline,
  mdiFinance,
  mdiEarth,
  mdiAccountCircle,
} from '@mdi/js'

import NavInHome from '@/components/navInHome/NavInHome'
import Graph from '@/views/graph'
import Find from '@/views/find'
import My from '@/views/my'
import Payment from '@/views/payment'
import { useAppDispatch, } from '@/redux'
import { useGetAllLabelQuery, labelAction, } from '@/redux/label'

export default function App () {
  const dispatch = useAppDispatch()
  const { data, } = useGetAllLabelQuery(null)

  useEffect(() => {
    if (!data) {
      return
    }
    dispatch(labelAction.setLabelList(data.data.list))
  }, [ data, ])

  const [ routes, ] = useState([
    {
      path: '/', element: <Payment />, icon: mdiNoteTextOutline, label: '明细',
    },
    {
      path: '/graph', element: <Graph />, icon: mdiFinance, label: '图表',
    },
    {
      path: '/find', element: <Find />, icon: mdiEarth, label: '发现',
    },
    {
      path: '/my', element: <My />, icon: mdiAccountCircle, label: '我的',
    },
  ])

  return (
    <div className='w-full h-full'>
      <div style={{ height: 'calc(100% - 5rem)', }}>
        <Routes>
          {
            routes.map((route) => <Route key={route.path} path={route.path} element={route.element} />)
          }
        </Routes>
      </div>

      <NavInHome routes={routes} />
    </div>
  )
}

function Home () {
  return <div>Home</div>
}

function Info () {
  return <div>Info</div>
}
