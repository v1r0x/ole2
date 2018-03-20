import OL3Parser from '../../node_modules/jsts/org/locationtech/jts/io/OL3Parser';
import OverlayOp from '../../node_modules/jsts/org/locationtech/jts/operation/overlay/OverlayOp';
import TopologyControl from './topology';
import intersectionSVG from '../../img/intersection.svg';

/**
 * Control for intersection geometries.
 * @extends {ole.Control}
 * @alias ole.Intersection
 */
class Intersection extends TopologyControl {
  /**
   * @inheritdoc
   * @param {Object} [options] Control options.
   * @param {number} [options.hitTolerance] Select tolerance in pixels
   *   (default is 10)
   */
  constructor(options) {
    super(Object.assign({
      title: 'Intersection',
      className: 'ole-control-intersection',
      image: intersectionSVG,
    }, options));
  }

  /**
   * Intersect given features.
   * @param {Array.<ol.Feature>} features Features to inersect.
   */
  applyTopologyOperation(features) {
    super.applyTopologyOperation(features);

    if (features.length < 2) {
      return;
    }

    const parser = new OL3Parser();

    for (let i = 1; i < features.length; i += 1) {
      const geom = parser.read(features[0].getGeometry());
      const otherGeom = parser.read(features[i].getGeometry());
      const intersectGeom = OverlayOp.intersection(geom, otherGeom);
      features[0].setGeometry(parser.write(intersectGeom));
      features[i].setGeometry(null);
    }
  }
}

export default Intersection;
