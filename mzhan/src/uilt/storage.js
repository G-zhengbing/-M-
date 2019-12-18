const SESSION = window.sessionStorage
const CLASS_LIST = "CLASS_ITEM"
const FILE = "FILE_URL"
const TOKEN = 'TOKEN'
const DRAW = "DRAW"

export default {
  get() {
    return JSON.parse(SESSION.getItem(CLASS_LIST) || '{}')
  },
  save(todo) {
    SESSION.setItem(CLASS_LIST, JSON.stringify(todo))
  },
  fileGet() {
    return JSON.parse(SESSION.getItem(FILE) || '{}')
  },
  fileSave(todo) {
    SESSION.setItem(FILE, JSON.stringify(todo))
  },
  getToken(){
	return JSON.parse(SESSION.getItem(TOKEN) || '{}')
  },
  saveToken(todo){
	SESSION.setItem(TOKEN, JSON.stringify(todo))
  },
  getDraw(){
	return JSON.parse(SESSION.getItem(DRAW) || '{}')
  },
  saveDraw(todo){
	SESSION.setItem(DRAW, JSON.stringify(todo))
  },
  clear(){
    SESSION.clear()
  }
}
