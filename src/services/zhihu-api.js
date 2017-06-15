import axios from 'axios';
let host = 'https://news-at.zhihu.com/api/4';

export function getLatest() {
  return axios.get(host+'/news/latest')
}