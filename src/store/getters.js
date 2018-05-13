const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  login: state => state.user.login,
  roles: state => state.user.roles
}
export default getters
