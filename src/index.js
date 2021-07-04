import './index.less'

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

const table = document.createElement('table')
table.className = 'charger-table'
chargerInfo.map(data => createTrForData(data)).forEach(data => table.appendChild(data))
document.getElementById('charger-table-container').appendChild(table)

document.getElementById('last-fetch-time').innerHTML = lastFetchTime

document.getElementById('refresh-btn').onclick = (evt) => {
    window.location = location.protocol + '//' + location.host + location.pathname + `?time=${Number(new Date())}`;
}
