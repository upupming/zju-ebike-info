const axios = require("axios").default
const cheerio = require('cheerio').default
const dotenv = require('dotenv').config()

const getCookie = async () => {
    const authRes = await axios.get(`http://cd.houqinbao.com/index.php?m=home&c=index&a=index&openid=${process.env.openid}&selfopenid=${process.env.selfopenid}`)
    return authRes.headers['set-cookie']
}

const getEBikeChargerInfo = async (cookie) => {
    const areaRes = await axios.get('http://cd.houqinbao.com/index.php?m=Home&c=Index&a=getArea', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 11; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045710 Mobile Safari/537.36 MMWEBID/1674 MicroMessenger/7.0.22.1820(0x27001636) Process/toolsmp WeChat/arm32 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
            'X-Requested-With': 'XMLHttpRequest',
            cookie
        }
    })
    return areaRes.data.data.html
}

exports.getChargerInfo = new Promise(async (resolve, reject) => {
    getCookie().then(getEBikeChargerInfo).then(html => {
        const $ = cheerio.load(html)
        const allLi = $('li')
        const ans = []
        for (let i = 0; i < allLi.length; i++) {
            const li = cheerio.load(allLi[i])
            // 充电站名称
            const name = li('p > b').text()
            // x/y, x 表示空闲数 y 表示总数
            const totalAndFree = li('p > font').text()
            const allA = li('.quick-deploy .charge-sum a')
            // 长度为 y, 值 -1 表示被占用，否则表示其编号
            const statusList = []
            for (let i = 0; i < allA.length; i++) {
                const a = cheerio.load(allA[i])('*')
                statusList.push(a.hasClass('on') ? -1 : a.text())
            }
            ans.push({
                name,
                totalAndFree,
                statusList
            })
        }
        resolve(ans)
    })
})

exports.getDateTime = () => {
    const dt = new Date()
    const y = dt.getFullYear()
    const m = dt.getMonth() + 1
    const d = dt.getDate()
    const h = dt.getHours()
    const mm = dt.getMinutes()
    const s = dt.getSeconds()

    const pad = function (x) {
        return `00${x}`.slice(-2)
    }

    const date = `${y}-${pad(m)}-${pad(d)}`

    return `${date} ${pad(h)}:${pad(mm)}:${pad(s)}`
}
