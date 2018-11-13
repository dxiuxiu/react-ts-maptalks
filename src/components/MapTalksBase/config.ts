const config = {
    mapOptions: {
        // center: [-0.113049, 51.498568],
        center: [106.84, 28.75],
        zoom: 14,
        baseLayer: {
            urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            subdomains: ['a', 'b', 'c', 'd'],
            // attribution: '&copy; <a href='http://osm.org'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/'>CARTO</a>'
            attribution: '&copy; <a >AndOrLab</a></a> contributors, &copy; <a>learing</a>'
        },
        scaleControl: { // 比例尺
            'maxWidth': 100,
            'metric': true,
            'containerClass': 'scaleControl'
        },
        zoomControl: true, // 自带的缩放工具
        overviewControl: { // 鹰眼
            maximize: false // 初始化最大化关闭
        }
    },
    markers : [
        {
          'id': '00000099',
          'type': 'PP',
          'name': '坪坝',
          'lgtd': 108.512,
          'lttd': 31.983,
          'status': '1'
        },
        {
          'id': '30050100',
          'type': 'ZQ',
          'name': '东溪',
          'lgtd': 106.672,
          'lttd': 28.786,
          'status': '3'
        },
        {
          'id': '60508325',
          'type': 'ZZ',
          'name': '赶水·正平',
          'lgtd': 106.755,
          'lttd': 28.72,
          'status': '2'
        },
        {
          'id': '60508340',
          'type': 'ZZ',
          'name': '藻渡',
          'lgtd': 106.84,
          'lttd': 28.75,
          'status': '2'
        },
        {
          'id': '60508550',
          'type': 'ZZ',
          'name': '三江·新建小区',
          'lgtd': 106.697,
          'lttd': 28.936,
          'status': '3'
        },
        {
          'id': '60508840',
          'type': 'ZZ',
          'name': '支坪·金钩湾',
          'lgtd': 106.387,
          'lttd': 29.243,
          'status': '2'
        },
        {
          'id': '60509190',
          'type': 'ZZ',
          'name': '璧城·东关巷',
          'lgtd': 106.233,
          'lttd': 29.583,
          'status': '3'
        },
        {
          'id': '60509255',
          'type': 'ZQ',
          'name': '吴滩·桥亭',
          'lgtd': 106.067,
          'lttd': 29.317,
          'status': '2'
        },
        {
          'id': '6050970S',
          'type': 'ZQ',
          'name': '五岔',
          'lgtd': 106.468,
          'lttd': 29.111,
          'status': '3'
        },
        {
          'id': '6050970X',
          'type': 'ZQ',
          'name': '五岔(气泡)',
          'lgtd': 106.468,
          'lttd': 29.111,
          'status': '2'
        },
        {
          'id': '80204522',
          'type': 'PP',
          'name': '几江·双石村',
          'lgtd': 106.26,
          'lttd': 29.228,
          'status': '2'
        },
        {
          'id': '80404540',
          'type': 'PP',
          'name': '几江·双宝',
          'lgtd': 106.28,
          'lttd': 29.242,
          'status': '2'
        },
        {
          'id': '80602184',
          'type': 'PP',
          'name': '支坪·白溪',
          'lgtd': 106.35,
          'lttd': 29.225,
          'status': '2'
        },
        {
          'id': '80602202',
          'type': 'PP',
          'name': '几江·仙池1组',
          'lgtd': 106.312,
          'lttd': 29.241,
          'status': '3'
        },
        {
          'id': '80704472',
          'type': 'PP',
          'name': '支坪·仁沱',
          'lgtd': 106.401,
          'lttd': 29.265,
          'status': '2'
        },
        {
          'id': '80704502',
          'type': 'PP',
          'name': '双福·高房',
          'lgtd': 106.254,
          'lttd': 29.386,
          'status': '2'
        },
        {
          'id': '80704504',
          'type': 'PP',
          'name': '几江·仙池4组',
          'lgtd': 106.301,
          'lttd': 29.218,
          'status': '2'
        },
        {
          'id': '80704516',
          'type': 'PP',
          'name': '先锋·香草7组',
          'lgtd': 106.321,
          'lttd': 29.222,
          'status': '2'
        },
        {
          'id': '80704596',
          'type': 'PP',
          'name': '先锋·香草10组',
          'lgtd': 106.339,
          'lttd': 29.209,
          'status': '2'
        },
        {
          'id': '99990002',
          'type': 'ZZ',
          'name': '三角·七仙',
          'lgtd': 106.729,
          'lttd': 29.05,
          'status': '3'
        }
      ]
}
export default config