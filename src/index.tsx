import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
// import Test from './components/Test'
// import Test from '@components/Test'
import MaptalksTest from '@components/MapTalksBase'
ReactDOM.render(
  // <Test />,
  <MaptalksTest/>,
  document.getElementById('root') as HTMLElement
)


declare var module: any
if (module.hot) {
  module.hot.accept()
}