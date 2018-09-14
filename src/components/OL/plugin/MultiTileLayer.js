import TileImage from './../../../../node_modules/ol/source/TileImage.js';
import TileState from './../../../../node_modules/ol/TileState.js';
import {
  listen
}
from './../../../../node_modules/ol/events.js';
import EventType from './../../../../node_modules/ol/events/EventType';
import {
  createXYZ,
  extentFromProjection
}
from './../../../../node_modules/ol/tilegrid.js';
import {
  tilesUrl,
  keys
} from "./../../../base/tiles.js";
var MultiTileLayer = (function (TileImage, tilesUrl, keys) {
  function MultiTileLayer(opt_options) {
    var options = opt_options || {};
    var projection = options.projection !== undefined ?
      options.projection : 'EPSG:3857';

    function tileUrlFunction(tileCoord, pixelRatio, projection) {
      const zRegEx = /\{z\}/g;
      const xRegEx = /\{x\}/g;
      const yRegEx = /\{y\}/g;
      const dashYRegEx = /\{-y\}/g;
      var template = this.getKey()
      return (
        (function () {
          if (!tileCoord) {
            return undefined;
          } else {
            return template.replace(zRegEx, tileCoord[0].toString())
              .replace(xRegEx, tileCoord[1].toString())
              .replace(yRegEx, function () {
                const y = -tileCoord[2] - 1;
                return y.toString();
              })
              .replace(dashYRegEx, function () {
                const z = tileCoord[0];
                const range = tileGrid.getFullTileRange(z);
                assert(range, 55); // The {-y} placeholder requires a tile grid with extent
                const y = range.getHeight() + tileCoord[2];
                return y.toString();
              });
          }
        })
      );
    }


    TileImage.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      opaque: options.opaque,
      projection: projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: tileUrlFunction, //options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
      transition: options.transition
    });
    MultiTileLayer.prototype.getKey = function () {
      var index = Math.floor(Math.random() * tilesUrl.length)
      if (index > tilesUrl.length) {
        index = tilesUrl.length - 1
      }
      return tilesUrl[index][0].replace('{s}', keys.subdomain).replace('{tfkey}', keys.tfkey).replace('{mbkey}', keys.mbkey)
    }

    MultiTileLayer.prototype.createTile_ = function createTile_(z, x, y, pixelRatio, projection, key) {
      var tileCoord = [z, x, y];
      var urlTileCoord = this.getTileCoordForTileUrlFunction(
        tileCoord, projection);
      var tileUrl = this.tileUrlFunction(tileCoord, pixelRatio, projection)()
      var tile = new this.tileClass(
        tileCoord,
        tileUrl !== undefined ? TileState.IDLE : TileState.EMPTY,
        tileUrl !== undefined ? tileUrl : '',
        this.crossOrigin,
        this.tileLoadFunction,
        this.tileOptions);
      tile.key = key;
      // listen(tile, EventType.CHANGE,
      //   this.handleTileChange, this);
      return tile;
    };
    MultiTileLayer.prototype.getTile = function getTile(z, x, y, pixelRatio, projection) {
      var sourceProjection = /** @type {!module:ol/proj/Projection} */ (this.getProjection());
      if (!ENABLE_RASTER_REPROJECTION ||
        !sourceProjection || !projection || equivalent(sourceProjection, projection)) {
        return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
      } else {
        var cache = this.getTileCacheForProjection(projection);
        var tileCoord = [z, x, y];
        var tile;
        var tileCoordKey = getKey(tileCoord);
        if (cache.containsKey(tileCoordKey)) {
          tile = /** @type {!module:ol/Tile} */ (cache.get(tileCoordKey));
        }
        var key = this.getKey();
        if (tile && tile.key == key) {
          return tile;
        } else {
          var sourceTileGrid = this.getTileGridForProjection(sourceProjection);
          var targetTileGrid = this.getTileGridForProjection(projection);
          var wrappedTileCoord =
            this.getTileCoordForTileUrlFunction(tileCoord, projection);
          var newTile = new ReprojTile(
            sourceProjection, sourceTileGrid,
            projection, targetTileGrid,
            tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio),
            this.getGutter(),
            function (z, x, y, pixelRatio) {
              return this.getTileInternal(z, x, y, pixelRatio, sourceProjection);
            }.bind(this), this.reprojectionErrorThreshold_,
            this.renderReprojectionEdges_);
          newTile.key = key;

          if (tile) {
            newTile.interimTile = tile;
            newTile.refreshInterimChain();
            cache.replace(tileCoordKey, newTile);
          } else {
            cache.set(tileCoordKey, newTile);
          }
          return newTile;
        }
      }
    };


  }



  if (TileImage) MultiTileLayer.__proto__ = TileImage;
  MultiTileLayer.prototype = Object.create(TileImage && TileImage.prototype);
  MultiTileLayer.prototype.constructor = MultiTileLayer;

  return MultiTileLayer;
}(TileImage, tilesUrl, keys));


export default MultiTileLayer;