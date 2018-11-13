import * as React from 'react'
import './index.less'
import {Map , TileLayer, VectorLayer, Marker, Coordinate} from 'maptalks'
import 'maptalks/dist/maptalks.css'
import config from './config'

import { Button, message } from 'antd'
import * as pointerMarker from './img/pointerMarker.png'

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
  markers = config.markers
  constructor(props: any) {
    super(props)
    const mapOption = config.mapOptions
    this.state = {
      mapOptions: {
        center: mapOption.center,
        zoom: mapOption.zoom,
        baseLayer: new TileLayer('base', mapOption.baseLayer),
        scaleControl: mapOption.scaleControl,
        zoomControl: mapOption.zoomControl,
        overviewControl: mapOption.overviewControl
      }
    }
  }
  componentDidMount() {
    this.constructMap(this.mapContainer).then(map => {
      this.map = map

      this.createVectorLayer('test').then((layer: any) => {
        const myLayer = layer
        this.addMarkersToLayer(this.markers, myLayer)

        this.map.on('viewchange', () => {
          console.log(this.map.getView())
        })
      }, (err) => {
        console.error(err)
      })
    }, (err) => {
      console.error(err)
    })
  }
  warning = (content: string) => {
    message.warning(content)
  }

  // ============ 基础工具 ===================
  /**
   * 放大
   */
  zoomIn = () => {
    this.map.zoomIn()
  }
  zoomOut = () => {
    this.map.zoomOut()
  }
  full = () => {
    this.map.setZoom(this.state.mapOptions.zoom)
    this.map.setCenter(this.state.mapOptions.center)
  }
  previousView = () => {
    if (this.map.hasPreviousView()) {
      this.map.zoomToPreviousView()
    } else {
      this.warning('当前不存在上一视图')
    }

  }
  nextView = () => {
    if (this.map.hasNextView()) {
      this.map.zoomToNextView()
    } else {
      this.warning('当前不存在下一视图')
    }

  }
  // ============ 基础工具 ===================

  // ============ 符号化 ===================
  /**
   * 创建一个指定id的向量图层
   */
  createVectorLayer = (layerId: string) => {
    const layer = this.map.getLayer(layerId)
    return new Promise((resolve, reject) => {
      if (layer) {
        reject('duplicate layer id')
      } else {
        resolve(new VectorLayer(layerId).addTo(this.map))
        console.log('向量图层创建成功')
      }
    })
  }
  /**
   * 添加一个marker到指定图层
   */
  addMarkerToLayer = (data: any, layer: any) => {
    let markerFile
    switch (data.status) {
      case '1':
        markerFile = pointerMarker
        break
      case '2':
        markerFile = pointerMarker
        break
      case '3':
        markerFile = pointerMarker
        break
      default:
        markerFile = pointerMarker
    }
    const marker = new Marker([data.lgtd, data.lttd],
      {
        'id': data.stcd,
        'properties': data,
        'symbol': {
          'markerFile': markerFile,
          'markerWidth': 49,
          'markerHeight': 49,
          'markerDx': 0,
          'markerDy': 0,
          'markerOpacity': 1
        }
      }
    )

    marker.addTo(layer)
    marker.setInfoWindow({
      'title': `${data.name}`,
      'content': ``,
      'autoOpenOn': 'click',
      'autoCloseOn': 'click'
    })
    marker.on('click', (e: any) => {
      console.log(e.target.properties)
    })
  }
  /**
   * 添加一系列marker到指定图层
   */
  addMarkersToLayer = (values: any, layer: any) => {
    for (const value of values) {
      this.addMarkerToLayer(value, layer)
    }
  }
  // ============ 符号化 ===================

  /**
   * 
   */
  centerTOPoint = (longitude: number, latitude: number) => {
    const coord = new Coordinate(longitude, latitude)
    if (this.map.getZoom() >= 15) {
      this.map.panTo(coord, {
        animation: true,
        duration: 1000 // 默认值为600
      })
    } else {
      this.map.setCenter(coord)
      this.map.setZoom(15)
    }
  }


  /**
   * 生成数据列表
   */
  renderMarkerList = (data: any) => {
    return data.map((item: any, index: any) => {
      let status
      switch (item.status) {
        case '1':
          status = '正常'
          break
        case '2':
          status = '警告'
          break
        case '1':
          status = '--'
          break
        default:
          status = '状态参数错误'
          break
      }
      return (
        <div className='markerList' key={index} onClick={this.centerTOPoint.bind(this, item.lgtd, item.lttd)}>
          <span>{item.name}</span>
        </div>
      )
    })
  }

  getProjection = () => {
    const projection = this.map.getProjection()
    console.log(projection.code)
  }
  layerToggle = (layerId : string) => {
    const layer = this.map.getLayer(layerId)
    console.log(layer.isVisible)
    if (layer.isVisible()) {
      layer.hide()
    } else {
      layer.show()
    }
  }

  render() {
    const style = this.props.className ? this.props.className : 'maptalksCom'
    const markerList = this.renderMarkerList(this.markers)
    return (
      <div className='maptalksTestContainer'>
        <div ref={node => this.mapContainer = node} className={style} />
        <div className='operation'>
          <div className='baseTool'>
            <h2>基础工具</h2>
            <Button onClick={this.zoomIn}> 放大</Button>
            <Button onClick={this.zoomOut}> 缩小</Button>
            <Button onClick={this.full}> 全图</Button>
            <Button onClick={this.previousView}> 上一视图</Button>
            <Button onClick={this.nextView}> 下一视图</Button>
            <Button onClick = {this.getProjection}>projection</Button>
          </div>
          <div className='baseTool markerOperate'>
            <h2>图层显隐控制</h2>
            <Button onClick = {this.layerToggle.bind(this, 'test')}>toggle</Button>
            <h3>数据列表</h3>
            <div className='markerListContent'>
              {markerList}
            </div>

          </div>
        </div>
      </div>

    )
  }


  constructMap(mapContainer: HTMLDivElement | null) {
    return new Promise((resolve, reject) => {
      if (mapContainer) {
        resolve(new Map(mapContainer, this.state.mapOptions))
      } else {
        reject('Invalid map container div')
      }
    })
  }
}