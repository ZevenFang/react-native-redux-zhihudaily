import {Platform} from 'react-native';
import axios from 'axios';
let host = 'https://news-at.zhihu.com/api/4';
let host2 = 'http://news-at.zhihu.com/api/4';

export function getLatest() {
  return axios.get(`${host}/news/latest`)
}

export function getNews(id) {
  return axios.get(`${host}/news/${id}`)
}

export function getNewsBefore(date) {
  return axios.get(`${host}/news/before/${date}`)
}

export function getNewsExtra(id) {
  return axios.get(`${host}/story-extra/${id}`);
}

export function getLongComments(id) {
  return axios.get(`${host}/story/${id}/long-comments`)
}

export function getShortComments(id) {
  return axios.get(`${host}/story/${id}/short-comments`)
}

export function getThemes() {
  return axios.get(`${host}/themes`)
}

export function getTheme(id) {
  return axios.get(`${host}/theme/${id}`)
}

export function getRecommenders(id) {
  return axios.get(`${host}/story/${id}/recommenders`)
}

export function getSectionBefore(id, timestamp) {
  return axios.get(`${host}/section/${id}/before/${timestamp}`)
}

export function getEditorSite(id) {
  return `${host2}/editor/${id}/profile-page/${Platform.OS}`
}