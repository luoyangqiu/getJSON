const cheerio = require('cheerio');
const http = require('http');
const iconv = require('iconv-lite');
const fs = require('fs');

// var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';

const provinceList = ['河北省', '江苏省', '陕西省']

provinceJSON(provinceList[0])

function provinceJSON(province) {
	switch(province) {
		case '河北省':
		  getHebeiData();
		  break;
    case '陕西省':
      getShanXiData();
      break;
		case '江苏省':
		  getJiangSuData();
		  break;
		default:
		  console.log('defalut')
	}
}
function getHebeiData() {
  console.log('河北省')
    fs.createWriteStream('data/2.json')
  const fillJSON = ".\\data\\2.json"
  const hebeiJSON = {
    "name": "河北省",
      "city": []
    }
  const hebeiCode = []
  // const hebeiURL = 'http://www.hbzwfw.gov.cn/jact/front/mailwrite.do?sysid=6&errorurl=http://www.hbzwfw.gov.cn/hbjis/front/register/perregister.do#'
  const hebeiURL = 'http://www.hbzwfw.gov.cn/script/1/1709071000079031.js'
  getHTML(hebeiURL)

    function getHTML(url){
    http.get(url, function(res) {
        res.setEncoding('utf-8'); //防止中文乱码
          let html = '';
          res.on('data', function(data) {
              html += data;
          });
          res.on('end', function() {
              const htmlArray = html.split("\n")
              let newHTML = ''
              // const reg_html = /\"\)$/
              htmlArray.forEach(htm => {
                const newHtml = htm.replace(/\"\);$/mg, '').replace(/\\/mg,'')
                // console.log(newHtml)
                //   /(\"\);)$/g
                const endHtml = newHtml.replace(/^(document.writeln\(\")/g, '')
                              // console.log(endHtml)
                              newHTML = newHTML + endHtml + '\n'

              })
                  const $ = cheerio.load(newHTML, {decodeEntities: false});
                      $("#local_other a").each(function (idx, element) {
                          // console.log(idx)
              const $element = $(element);
              hebeiCode.push($element.text())
              // // console.log($element)
                console.log($element.text())
                // console.log($element.attr('value'))
              //   // console.log($element)
                const cityJson = {
                  "name" : $element.text(),
                  "area" : []
                }
                hebeiJSON.city.push(cityJson)


                // const valueNumber = $element.val()
                //  console.log(valueNumber)
            })   
         
                // let index = 0
                getAreaHTML($)
          });
      });
  }
  function getAreaHTML(query){
        // console.log(query)
    hebeiCode.forEach( (area, index) => {
      console.log(index)
      // const index = hebeiCode.indexOf(area)
      const selectorDom = ".c_list3";
       query(selectorDom).each((idx, ele) => {
        console.log(ele)
        // console.log('=====', shanxiJSON.city[index].area)
        const $ele = query(ele)
        console.log($ele.text())
        // shanxiJSON.city[index].area.push($ele.text())
       })
    })
  }
}

function getShanXiData() {
	console.log('陕西省')
	fs.createWriteStream('data/26.json')
	const fillJSON = ".\\data\\26.json"
	const shanxiJSON = {
		"name": "陕西省",
	    "city": []
		}
	const shanxiCode = []
	const shanxiURL = 'http://zwfw.shaanxi.gov.cn/icity/public/index'
		
	getHTML(shanxiURL)

	function getHTML(url){
		http.get(url, function(res) {
	      res.setEncoding('utf-8'); //防止中文乱码
	        let html = '';
	        res.on('data', function(data) {
	            html += data;
	        });
	        res.on('end', function() {
	            // console.log(html);
	                const $ = cheerio.load(html, {decodeEntities: false});
	                    $("#websitebar dd[tag='shengji'] a").each(function (idx, element) {

				      const $element = $(element);
				      // console.log($element)
	  			      // console.log($element.text())
	  			      // console.log($element.attr('value'))
	  			      shanxiCode.push($element.attr('value'))
	  			      // console.log($element)
	  			      const cityJson = {
	  			      	"name" : $element.text(),
	  			      	"area" : []
	  			      }
	  			      shanxiJSON.city.push(cityJson)
	  			      // const valueNumber = $element.val()
	  			      // 	console.log(valueNumber)
				    })   
	       
	              // let index = 0
	              getAreaHTML($)
	        });
	    });
	}
	function getAreaHTML(query) {
		// 获取区县数据
		console.log(query)
		shanxiCode.forEach( area => {
			console.log(area)
			const index = shanxiCode.indexOf(area)
			const selectorDom = "#websitebar dd[tag='" + area + "'] a";
			 query(selectorDom).each((idx, ele) => {
			 	console.log('=====', shanxiJSON.city[index].area)
			 	const $ele = query(ele)
			 	console.log($ele.text())
			 	shanxiJSON.city[index].area.push($ele.text())
			 })
		})
		fs.writeFileSync(fillJSON, JSON.stringify(shanxiJSON))
	}

}

function getJiangSuData() {
	console.log('江苏省')
	fs.createWriteStream('data/9.json')
	const fillJSON = ".\\data\\9.json"
	const jiansuJSON = {
		"name": "江苏省",
	    "city": []
	}
	// const jiangsuUrl = 'http://www.jszwfw.gov.cn/jsjis/front/register/showarea.do';
	const jiangsuUrl = 'http://www.jszwfw.gov.cn/jsjis/front/register/perregister.do';
	const jiangsuCode = []
	const jiangsuData = []
	// 开始爬数据
getHTML(jiangsuUrl);
	// 江苏省数据
function getHTML(url){
	http.get(url, function(res) {
      res.setEncoding('utf-8'); //防止中文乱码
        let html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            console.log(html);
                const $ = cheerio.load(html, {decodeEntities: false});
                    $('#city option').each(function (idx, element) {
			      // console.log(idx)

			      const $element = $(element);
  			      console.log($element.text())
  			      console.log($element.val())
  			      const cityJson = {
  			      	"name" : $element.text(),
  			      	"area" : []
  			      }
  			      // cityJson[]
  			      const valueNumber = $element.val()
  			      if (valueNumber != 999999 && valueNumber != 329998) {
  			      	// console.log(valueNumber)
  			      	 	jiangsuCode.push(valueNumber)
  			      		// jiangsuData.push($element.text())
  			      		jiansuJSON.city.push(cityJson)
  			      }
			
			      // })
			    })
       
              let index = 0
              getJSON(index)
        });
    });
}  
function getJSON(index){
    if (index + 1 <= jiangsuCode.length){
 const url = 'http://www.jszwfw.gov.cn/jsjis/front/register/showarea.do?code=' + jiangsuCode[index];
                  console.log(jiangsuCode[index])
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
            jsonString.params.jisAreaList.forEach(area => {
              jiansuJSON.city[index].area.push(area.name)
            })
              // jiansuJSON.push(tempJSON)
              getJSON(index+1)
        });
    });
  } else {
    // console.log('end')
    // console.log(jiansuJSON)
    fs.writeFileSync(fillJSON, JSON.stringify(jiansuJSON))
    // fs.writeFileSync(fillJSON, jiansuJSON)
    return false
  }
}
}
