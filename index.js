var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');

// var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';
// const jiangsuUrl = 'http://www.jszwfw.gov.cn/jsjis/front/register/perregister.do';
const jiansuJSON = []
const codeStart = 320000
const codeEnd = 321200
const jiangsuUrl = 'http://www.jszwfw.gov.cn/jsjis/front/register/showarea.do?code=320100';
// console.log(http)
getJSON(codeStart, jiangsuUrl)
// for(i = codeStart; i <= codeEnd; i=i+100){
  // console.log(i)
  // const url = 'http://www.jszwfw.gov.cn/jsjis/front/register/showarea.do?code=' + i
  // console.log(url)
  // setTimeout(getJSON(i, url), 5000)
  // getJSON(i, url)
// }
function getJSON(iscode){
    if (iscode <= codeEnd){
 const url = 'http://www.jszwfw.gov.cn/jsjis/front/register/showarea.do?code=' + iscode;
                  console.log(iscode)
      console.log(url)
      const tempJSON = {}
      http.get(url, function(res) {
      res.setEncoding('utf-8'); //防止中文乱码
        var html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            // console.log(typeof html);
            const jsonString = JSON.parse(html)
            console.log(jsonString.params)
              tempJSON[iscode] = jsonString.params.jisAreaList
              jiansuJSON.push(tempJSON)
              getJSON(iscode+100)
        });
    });
  } else {
    // console.log('end')
    console.log(jiansuJSON)
    return false
  }
}

// http.get(jiangsuUrl, function(sres) {
//   // console.log(sres)
//   var chunks = [];
//   sres.on('data', function(chunk) {
//     // console.log(chunk)
//     chunks.push(chunk);
//   });
//   // chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
//   // 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
//   // 剩下就都是 jQuery 的内容了
//   sres.on('end', function() {
//     var titles = [];
//     //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
//     //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
//     // console.log(chunks)
//     var html = iconv.decode(Buffer.concat(chunks), 'utf8');
//     console.log(html)
//     var $ = cheerio.load(html, {decodeEntities: false});
//     $('.top_site .c_list3').each(function (idx, element) {
//       console.log(idx)
//       console.log(element)
//       var $element = $(element);
//       titles.push({
//         title: $element.text()
//       })
//     })    
//     console.log(titles);     
//   });
// });