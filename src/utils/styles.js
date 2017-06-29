import themes from './themes';

let t = themes['light'];

export default {
  navBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBtn: {
    padding: 15
  },
  navIcon: {
    color: 'white',
    fontSize: 25
  },
  navText: {
    color: 'white',
    marginLeft: 5,
    alignSelf: 'center'
  },
  listItem: {
    marginLeft: 0,
    borderLeftColor: t.background,
    borderTopColor: t.background,
    borderRightColor: t.background,
    borderLeftWidth: 8,
    borderTopWidth: 6,
    borderRightWidth: 8,
    borderBottomWidth: 2
  },
  separator: {
    height: 50,
    backgroundColor:
    t.background,
    marginBottom: -6
  },
  separatorText: {
    color: 'grey',
    fontSize: 14
  }
}