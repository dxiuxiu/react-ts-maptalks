// maptalks按需加载的演示示例
import * as React from 'react'
import './index.less'
import * as maptalks from 'maptalks'
import config from './config'

interface IState {
  mapOptions?: object // maptalks的初始化配置信息
}
interface IProps {
  // maptalks配置信息
  mapOptions?: object, // maptalks的初始化配置信息
  className?: string, // 地图样式
}

export default class MapTalksTest extends React.Component<any, any> {
  map: any
  mapContainer: HTMLDivElement | null
  constructor(props: any) {
    super(props)
    const mapOption = config.mapOptions
    this.state = {
      mapOptions: {
        center: mapOption.center,
        zoom: mapOption.zoom,
        baseLayer: new maptalks.TileLayer('base', mapOption.baseLayer),
      }
    }
  }
  componentDidMount() {
    this.constructMap(this.mapContainer).then(map => {
      this.map = map
    }, (err) => {
      console.error(err)
    })
  }

  render() {
    const style = this.props.className ? this.props.className : 'maptalksCom'
    return (
      <div ref={node => this.mapContainer = node} className={style} />
    )
  }


  constructMap(mapContainer: HTMLDivElement | null) {
    return new Promise((resolve, reject) => {
      console.log(mapContainer)
      if (mapContainer) {
        resolve(new maptalks.Map(mapContainer, this.state.mapOptions))
      } else {
        reject('Invalid map container div')
      }
    })
  }
}