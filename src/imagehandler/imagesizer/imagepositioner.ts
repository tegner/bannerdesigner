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

export interface IImagePositioner {
  cHeight: number;
  cWidth: number;
  iHeight: number;
  iWidth: number;
}

export function imagePositioner(options, pos) {
  console.log('imagePositioner', options);
  switch (pos) {
    case PLACEMENTNAMES.bottom:
      return bottom(options);
    case PLACEMENTNAMES.bottomleft:
      return bottomLeft(options);
    case PLACEMENTNAMES.bottomright:
      return bottomRight(options);
    case PLACEMENTNAMES.center:
      return center(options);
    case PLACEMENTNAMES.left:
      return left(options);
    case PLACEMENTNAMES.right:
      return right(options);
    case PLACEMENTNAMES.top:
      return top(options);
    case PLACEMENTNAMES.topleft:
      return topLeft();
    case PLACEMENTNAMES.topright:
      return topRight(options);
  }
}
