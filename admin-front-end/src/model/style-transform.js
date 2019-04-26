import {
  UDTextAlignH,
  UDTextAlignV
} from '../lib/ui-designer/index.js';


const translateAlignH = (val, mode) => {
  if (mode === 'flex') {

    if (val === UDTextAlignH.LEFT) {
      return 'flex-start'
    }
    if (val === UDTextAlignH.CENTER) {
      return 'center'
    }
    if (val === UDTextAlignH.RIGHT) {
      return 'flex-end'
    }
  }
  if (mode === 'normal') {

    if (val === UDTextAlignH.LEFT) {
      return 'left'
    }
    if (val === UDTextAlignH.CENTER) {
      return 'center'
    }
    if (val === UDTextAlignH.RIGHT) {
      return 'right'
    }
  }
};

const translateAlignV = (val) => {
  if (val === UDTextAlignV.TOP) {
    return 'flex-start'
  }
  if (val === UDTextAlignV.MIDDLE) {
    return 'center'
  }
  if (val === UDTextAlignV.BOTTOM) {
    return 'flex-end'
  }
};

export {
  translateAlignH,
  translateAlignV,
}