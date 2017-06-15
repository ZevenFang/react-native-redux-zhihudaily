class Qiniu {

  static crop(img, crop){
    if (!crop.x) crop.x=0;
    if (!crop.y) crop.y=0;
    return img+`?imageMogr2/crop/!${crop.width}x${crop.height}${crop.x<0?crop.x:'a'+crop.x}${crop.y<0?crop.y:'a'+crop.y}`;
  }

  static center(img, w, h){
      return h?img+`?imageMogr2/1/w/${w}/h/${h}`:img+`?imageMogr2/1/w/${w}/`;
  }

}

export default Uploader;
