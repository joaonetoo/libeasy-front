const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  login: state => state.user.login,
  roles: state => state.user.roles,
  id: state => state.user.id,
  books: state => state.books.books,
  loading: state=> state.books.loading,
  resultSearch: state=> state.books.resultSearch
}


export default getters
