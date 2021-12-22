const https = require('https')

const args = process.argv.slice(2)

const options = {
  hostname: 'codequiz.azurewebsites.net',
  port: 443,
  path: '/',
  method: 'GET',
  headers: { Cookie: 'hasCookie=true' },
}

https.get(options, (res) => {
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  res.on('end', () => {
    try {
      const fundList = data
        .replace(/ /g, '')
        .replace(/<\/td>/g, '')
        .replace(/<\/tr>/g, '')
        .replace(/<tr>/g, '')
        .split('<td>')

      const indexFund = fundList.indexOf(args[0])

      if (indexFund === -1) {
        console.log('Fund code not found')
      } else {
        console.log(fundList[indexFund + 1])
      }
    } catch (e) {
      console.error(e.message)
    }
  })
})
