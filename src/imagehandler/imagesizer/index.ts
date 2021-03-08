import { PLACEMENTNAMES } from '../imageplacement';
import { topLeft } from './topleft';

export { bottomRight } from './bottomright';
export { ManualScaler } from './manualscaler';
export { topLeft } from './topleft';

export function imageScaler(image, canvas, imagetype, pos) {
  switch (pos) {
    case PLACEMENTNAMES.bottom:
      return bottom(image, canvas, imagetype);
    case PLACEMENTNAMES.bottomleft:
      return bottomLeft(image, canvas, imagetype);
    case PLACEMENTNAMES.bottomright:
      return bottomRight(image, canvas, imagetype);
    case PLACEMENTNAMES.center:
      return center(image, canvas, imagetype);
    case PLACEMENTNAMES.left:
      return left(image, canvas, imagetype);
    case PLACEMENTNAMES.right:
      return right(image, canvas, imagetype);
    case PLACEMENTNAMES.top:
      return top(image, canvas, imagetype);
    case PLACEMENTNAMES.topleft:
      return topLeft(image, canvas, imagetype);
    case PLACEMENTNAMES.topright:
      return topRight(image, canvas, imagetype);
  }
}
