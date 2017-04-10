import './styles/app.scss'

import Folder from './components/Folder/index.js'
import $ from 'jquery'

let data = []

let folders = []

$('#js-add-folder').on('click', function(e) {
    e.stopPropagation()

    let text = prompt('请输入文件夹标题')
    let folder = null

    if(text) {
         folder = new Folder({
            container: '#menu',
            title: text
        })
    } else {
        alert('请输入内容')
    }
   
    folders.push( folder )
})

$('#js-export-data').on('click', function() {
    for(let i = 0; i < folders.length; i++) {
        if(folders[i]) {
            data.push( folders[i].getData() )
        }
    }
    console.log(data)
})
