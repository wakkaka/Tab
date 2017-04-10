/**
 * 文件夹
 */
import $ from 'jquery'
import './index.scss'
import folderTpl from './index.html'
import Mustache from 'mustache'

class Folder {
    constructor(opt) {
        this.$container = $(opt.container)
        this.subItems = []
        this.title = opt.title || ''
        this.status = 'off' // on or off，文件夹打开或者关闭状态

        this.initFolder()
        this.bindEvents()
    }

    initFolder() {
        let html = folderTpl({
            title: this.title,
        })

        this.$element = $(html)

        this.$container.append( this.$element )
    }
    hasSubItems() {
        // 如果有 subItem 说明应该前面 ico 应该是打开状态
        return this.subItems.length
    }
    bindEvents() {
        // es6 箭头函数
        this.$element.on('click', (e) => {
            // 阻止冒泡，很关键
             e.stopPropagation()

            let title = prompt('请输入文件夹标题')

            if(title) {
                this.addSubItem( title )
            }
        })
    }
    addSubItem(title) {
        let subItem = new Folder({
            container: this.$element.find('.js-folder-bd').get(0),
            title: title
        })

        this.subItems.push( subItem )
    }
    // 取得所有数据
    getData() {
        let data = {
            title: this.title,
            subItems: []
        }

       for(let i = 0; i < this.subItems.length; i++) {
           if(this.subItems[i]) {
                data.subItems.push( this.subItems[i].getData() )
           }
       }

       return data
    }
}

export default Folder