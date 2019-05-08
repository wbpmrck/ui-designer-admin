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
  if (val === UDRowAlignH.CENTER) {
    return 'center'
  }
  if (val === UDRowAlignH.RIGHT) {
    return 'flex-end'
  }
  if (val === UDRowAlignH.SPACE_BETWEEN) {
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


const translateColAlignH = (val) => {
  if (val === UDColAlignH.LEFT) {
    return 'flex-start'
  }
  if (val === UDColAlignH.CENTER) {
    return 'center'
  }
  if (val === UDColAlignH.RIGHT) {
    return 'flex-end'
  }
};

const translateColAlignV = (val) => {
  if (val === UDColAlignV.TOP) {
    return 'flex-start'
  }
  if (val === UDColAlignV.MIDDLE) {
    return 'center'
  }
  if (val === UDColAlignV.BOTTOM) {
    return 'flex-end'
  }
  if (val === UDColAlignV.SPACE_BETWEEN) {
    return 'space-between'
  }
};

export {
  translateRowAlignV,
  translateRowAlignH,
  translateColAlignV,
  translateColAlignH,
  translateAlignH,
  translateAlignV,
}