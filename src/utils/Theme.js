/**
 * Created by fangf on 2016/8/22.
 * 应用主题管理工具类
 */

export default class Theme{

  themes = {
    light:{
      primary:'#FFF',
      secondary:'#000',
      titleBar:'#00A2ED',
      statusBar:'#1976D2',
      sliderBar:'#FFF',
      homeBtn:['#00A2ED','#F3F3F3'],
      background:'#F3F3F3'
    },
    dark:{
      primary:'#FFF',
      secondary:'#888',
      titleBar:'#222222',
      statusBar:'#333',
      sliderBar:'#343434',
      homeBtn:['#00A2ED','#2C2C2C'],
      background:'#343434'
    }
  };

  static LIGHT = 'light';
  static DARK = 'dark';

  colors = {};

  constructor(theme){
    this.colors = this.themes[theme];
  }

}