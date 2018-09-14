export const mapconfig = {
  projection: "EPSG:4326",
  center: [104.060928, 30.662415],
  zoom: 3,
  baseLayer_ol: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
  baseLayer_lf: 'http://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
}
export const c3config = {

}

export const apiJson = {
  aqi: `https://api.waqi.info/mapq/bounds/?bounds={b}&inc=placeholders&k=_2Y2EzVx9YAVscMzsPSxRWXmldZEY+ExFTFXgRLg==&_=1493729062849`,
}