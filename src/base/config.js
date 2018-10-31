export const mapconfig = {
  projection: "EPSG:4326",
  center: [104.060928, 30.662415],
  zoom: 10,
  baseLayer_ol: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
  baseLayer_lf: 'http://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
}
export const c3config = {
  baseLayer: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
  annoLayer: 'http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
  center: [104.060928, 30.662415, 10000],
}



export const baseLayers = {
  baidu: {
    type: "baidu",
    name: '百度地图',
  },
  baiduimage: {
    type: "baiduimage",
    name: '百度影像',
  },
  tianditu: {
    type: "tianditu",
    name: '天地图',
    projection: "EPSG:3857"
  },
  tiandituimage: {
    type: "tiandituimage",
    name: '天地图影像图',
    projection: "EPSG:3857"
  },
  gaode: {
    type: "gaode",
    name: '高德地图',
    projection: "EPSG:3857"
  },
  gaodeimage: {
    type: "gaodeimage",
    name: '高德影像图',
    projection: "EPSG:3857"
  },
  google: {
    type: "google",
    name: '谷歌地图',
    projection: "EPSG:3857"
  },
  googleimage: {
    type: "googleiamge",
    name: '谷歌影像图',
    projection: "EPSG:3857"
  }

}


export const apiJson = {
  aqi: `https://api.waqi.info/mapq/bounds/?bounds={b}&inc=placeholders&k=_2Y2EzVx9YAVscMzsPSxRWXmldZEY+ExFTFXgRLg==&_=1493729062849`,
}