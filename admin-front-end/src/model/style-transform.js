import {
  UDTextAlignH,
  UDTextAlignV,
  UDRowAlignH,
  UDRowAlignV,
  UDColAlignH,
  UDColAlignV
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


const translateRowAlignH = (val) => {
  if (val === UDRowAlignH.LEFT) {
    return 'flex-start'
  }
  if (val === UDTextAlignV.CENTER) {
    return 'center'
  }
  if (val === UDTextAlignV.RIGHT) {
    return 'flex-end'
  }
  if (val === UDTextAlignV.SPACE_BETWEEN) {
    return 'space-between'
  }
};

const translateRowAlignV = (val) => {
  if (val === UDRowAlignV.TOP) {
    return 'flex-start'
  }
  if (val === UDRowAlignV.MIDDLE) {
    return 'center'
  }
  if (val === UDRowAlignV.BOTTOM) {
    return 'flex-end'
  }
};

export {
  translateRowAlignV,
  translateRowAlignH,
  translateAlignH,
  translateAlignV,
}