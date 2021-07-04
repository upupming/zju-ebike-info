import './index.less'

const campus2keywords = {
    '紫金港': ['紫金港', '安中大楼', '物业员工宿舍', '生科院'],
    '玉泉': ['玉泉', '信电', '精工机械', '液压', '铸工楼', '电气学院原电工厂', '石虎山宿舍', '教二', '建发'],
    '之江': ['之江'],
    '西溪': ['西溪'],
    '华家池': ['华家池']
}
const chosenCampus = new Set(Object.keys(campus2keywords))

const createTrForData = (info) => {
    const tr = document.createElement('tr')
    const nameEle = document.createElement('td')
    nameEle.className = 'name'
    nameEle.innerHTML = info.name
    tr.appendChild(nameEle)
    const tfEle = document.createElement('td')
    tfEle.className = 'total-and-free'
    tfEle.innerHTML = info.totalAndFree
    tr.appendChild(tfEle)
    info.statusList.map(cur => {
        const curEle = document.createElement('td')
        curEle.className = cur === -1 ? 'status occupied' : 'status free'
        curEle.innerHTML = cur === -1 ? 'N/A' : cur
        tr.appendChild(curEle)
    })
    tr.className = 'data-row'
    return tr
}

const filterData = (data) => {
    for (let key of chosenCampus) {
        for (let val of campus2keywords[key]) {
            if (data.name.includes(val)) return true
        }
    }
    return false
}

const refreshTable = () => {
    const tableContainer = document.getElementById('charger-table-container')
    tableContainer.innerHTML = ''

    const table = document.createElement('table')
    table.className = 'charger-table'
    const filteredData = chargerInfo.filter(filterData).sort((a, b) => a.name.localeCompare(b.name, 'zh-cn'))

    document.getElementById('total-num').innerHTML = filteredData.length

    filteredData.map(data => createTrForData(data)).forEach(data => table.appendChild(data))
    tableContainer.appendChild(table)

    document.getElementById('last-fetch-time').innerHTML = lastFetchTime

    document.getElementById('refresh-btn').onclick = (evt) => {
        window.location = location.protocol + '//' + location.host + location.pathname + `?time=${Number(new Date())}`;
    }

}
refreshTable()


window.checkBoxClicked = function (cbox) {
    if (cbox.checked) {
        chosenCampus.add(cbox.value)
    } else {
        chosenCampus.delete(cbox.value)
    }
    refreshTable()
}
