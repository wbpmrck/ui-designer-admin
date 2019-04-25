import {
  UDTextAlignH,
  UDTextAlignV
} from '../lib/ui-designer/index.js';


const translateAlignH = (val) => {
  if (val === UDTextAlignH.LEFT) {
    return 'flex-start'
  }
  if (val === UDTextAlignH.CENTER) {
    return 'center'
  }
  if (val === UDTextAlignH.RIGHT) {
    return 'flex-end'
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