/**
 * Created by fangf on 2016/8/22.
 * 应用主题管理工具类
 */

export default class Theme{

  themes = {
    light:{
      primary:'#FFF',
      secondary:'#000',
      listBg:'#FFF',
      listBorder: '#e3e3e3',
      listColor: '#000',
      titleBar:'#00A2ED',
      statusBar:'#1976D2',
      sliderBar:'#FFF',
      account:'#00A2ED',
      accountColor:'#fff',
      sliderBarColor:'#000',
      homeBtn:'#F3F3F3',
      homeBtnText:'#00A2ED',
      background:'#F3F3F3',
      bio:'grey',
      line:'#DDD'
    },
    dark:{
      primary:'#FFF',
      secondary:'#888',
      listBg:'#404040',
      listBorder: '#333',
      listColor: '#fff',
      titleBar:'#222222',
      statusBar:'#333',
      sliderBar:'#343434',
      account:'#252525',
      accountColor:'#999',
      sliderBarColor:'#999',
      homeBtn:'#2C2C2C',
      homeBtnText:'#00A2ED',
      background:'#343434',
      bio:'#999',
      line:'#555'
    },
    pink:{
      primary:'#FFF',
      secondary:'#000',
      listBg:'#FFF',
      listBorder: '#e3e3e3',
      listColor: '#000',
      titleBar:'plum',
      statusBar:'pink',
      sliderBar:'#FFF',
      account:'plum',
      accountColor:'#fff',
      sliderBarColor:'#000',
      homeBtn:'#F3F3F3',
      homeBtnText:'plum',
      homeBtnIcon:require('../img/menu_home_pink.png'), // Set this prop if you want to change the home button icon.
      background:'#F3F3F3',
      bio:'grey',
      line:'#DDD'
    }
  };

  static LIGHT = 'light';
  static DARK = 'dark';
  static PINK = 'pink';

  colors = {};

  constructor(theme){
    this.colors = this.themes[theme];
  }

}