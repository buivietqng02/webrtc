const {BrowserWindow, app, Menu}=require('electron')
const debug= require('electron-debug')

debug()
const path= require('path')
let mainWindow= null
const createWindow= ()=> {
  mainWindow= new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {

    }
  })
  const pathBase= app.getAppPath()
  console.log(pathBase)
//mainWindow.loadFile(path.join(pathBase,'/public/index.html'))
mainWindow.loadURL('http://localhost:8080')
mainWindow.on('ready-to-show', ()=> mainWindow.show())
mainWindow.on('close', ()=> mainWindow= null)
}
const setmenu= ()=> {
  const template= [
    {
      label: "edit",
      click: ()=> createWindow()
    }
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
app.on('ready', ()=> {
  setmenu()
  createWindow()
})
//app.on('window-all-closed', ()=> app.quit())
