import { PLACEMENTNAMES } from '../imageplacement';
import { bottom } from './bottom';
import { bottomLeft } from './bottomleft';
import { bottomRight } from './bottomright';
import { center } from './center';
import { left } from './left';
import { right } from './right';
import { top } from './top';
import { topLeft } from './topleft';
import { topRight } from './topright';

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
