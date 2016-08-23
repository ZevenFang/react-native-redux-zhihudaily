/**
 * Created by fangf on 2016/8/22.
 * 应用主题管理工具
 */
storage.load({
  key: 'theme'
}).then(ret => { // 使用保存的主题
  global.theme = ret.name;
}).catch(err => { // 如果没有保存的主题，使用默认主题
  global.theme = 'light';
  storage.save({ // 储存默认主题
    key: 'theme',
    rawData: {
      name: 'light'
    }
  });
});