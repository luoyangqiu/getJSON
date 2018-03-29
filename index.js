const cheerio = require('cheerio');
const http = require('http');
const iconv = require('iconv-lite');
const fs = require('fs');
// const qs = require('querystring');

// var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';

const provinceList = ['河北省', '江苏省', '浙江省', '湖北省', '四川省', '陕西省']

provinceJSON(provinceList[2])

function provinceJSON(province) {
	switch(province) {
		case '河北省':
		  getHebeiData();
		  break;
		case '江苏省':
		  getJiangSuData();
		  break;
		case '浙江省':
		  getZheJiangData();
		  break;
		case '湖北省':
		  getHubeiData();
		  break;
		case '四川省':
		  getSiChuanData();
		  break;
		case '陕西省':
      		getShanXiData();
      		break;
		default:
		  console.log('defalut')
	}
}
function getZheJiangData() {
	  const zhejiangURL = 'http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/script/new_banner/SwitchWeb.js'
	  // const zhejiangURL = 'http://www.zjzwfw.gov.cn/'
	  console.log('浙江省')
	  	fs.createWriteStream('data/10.json')
	const fillJSON = ".\\data\\10.json"
	const provinceJSON = {
		"name": "浙江省",
	    "city": []
		}
	const cityCode = []
	  getHTML(zhejiangURL)

	function getHTML(url){
		http.get(url, function(res) {
	      res.setEncoding('utf-8'); //防止中文乱码
	        let html = '';
	        res.on('data', function(data) {
	            html += data;
	        });
	        res.on('end', function() {
	            console.log(html);
	                     fs.writeFile('data/zhejiang.js', html)
	                     const zhejiangDataList = require('./data/zhejiang.js')
	                     console.log(zhejiangDataList)
	                // const $ = cheerio.load(html, {decodeEntities: false});
	                    // $("#cityShi li").each(function (idx, element) {

				      // const $element = $(element);
				      // console.log($element)
	  			      // console.log($element.text())
	  			      // console.log($element.attr('id'))
	  			      // cityCode.push($element.attr('id'))
	  			      // console.log($element)
	  			      // const cityJson = {
	  			      // 	"name" : $element.text(),
	  			      // 	"area" : []
	  			      // }
	  			      // provinceJSON.city.push(cityJson)
	  			      // const valueNumber = $element.val()
	  			      // 	console.log(valueNumber)
				    // })   
	       
	              // let index = 0
	              // getAreaHTML($)
	        });
	    });
	}

		function getAreaHTML(query) {
		// 获取区县数据
		console.log(query)
		cityCode.forEach( area => {
			// console.log(area)
			const index = cityCode.indexOf(area)
			const selectorDom = ".H_shengji_box1 ul[parentandid='" + area + "'] li";
			 query(selectorDom).each((idx, ele) => {
			 	// console.log('=====', hubeiJSON.city[index].area)
			 	const $ele = query(ele)
			 	// console.log($ele.text())
			 	provinceJSON.city[index].area.push($ele.text())
			 })
		})
		fs.writeFileSync(fillJSON, JSON.stringify(provinceJSON))
	}
}

function getHubeiData() {
	  const hubeiURL = 'http://zwfw.hubei.gov.cn/hdjl/tohdjl.jspx'
	  console.log('湖北省')
	  	fs.createWriteStream('data/16.json')
	const fillJSON = ".\\data\\16.json"
	const hubeiJSON = {
		"name": "湖北省",
	    "city": []
		}
	const hubeiCode = []
	  getHTML(hubeiURL)

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
	                    $("#cityShi li").each(function (idx, element) {

				      const $element = $(element);
				      // console.log($element)
	  			      // console.log($element.text())
	  			      // console.log($element.attr('id'))
	  			      hubeiCode.push($element.attr('id'))
	  			      // console.log($element)
	  			      const cityJson = {
	  			      	"name" : $element.text(),
	  			      	"area" : []
	  			      }
	  			      hubeiJSON.city.push(cityJson)
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
		hubeiCode.forEach( area => {
			// console.log(area)
			const index = hubeiCode.indexOf(area)
			const selectorDom = ".H_shengji_box1 ul[parentandid='" + area + "'] li";
			 query(selectorDom).each((idx, ele) => {
			 	// console.log('=====', hubeiJSON.city[index].area)
			 	const $ele = query(ele)
			 	// console.log($ele.text())
			 	hubeiJSON.city[index].area.push($ele.text())
			 })
		})
		fs.writeFileSync(fillJSON, JSON.stringify(hubeiJSON))
	}
}

function getSiChuanData() {
	console.log('四川省')
	fs.createWriteStream('data/22.json')
	const fillJSON = ".\\data\\22.json"
	const sichuanJSON = {
		"name": "四川省",
	    "city": []
		}
	const sichuanCode = []
	const sichuanURL = 'http://egov.sczw.gov.cn/tools/SubmitHandler.ashx?action=GetArea'
	// const sichuanURL = 'http://egov.sczw.gov.cn/index.html'
		
	getHTML(sichuanURL)

	function getHTML(url){
		http.get(url, function(res) {
			// console.log(res)
	      res.setEncoding('utf-8'); //防止中文乱码
	        let html = '';
	        res.on('data', function(data) {
	        	// console.log('data', data)
	            html += data;
	        });
	        res.on('end', function() {
	            // console.log(html);
	            fs.writeFile('data/sichuan.json', html)
	            // const jsonData = JSON.parse(JSON.stringify(html))
	            const jsonData = JSON.parse(html)
	            // console.log(jsonData[0])
	            const cityCodeList = []
	            jsonData.forEach(data => {
	            	console.log(data.AREA_NAME)
	            	if (Number(data.AREA_LEVEL) === 2) {
	            		cityCodeList.push(data.Id)
	            		const cityJson = {
	  			      			"name" : data.AREA_NAME,
	  			      			"area" : []
	  			      		}
	  			      	sichuanJSON.city.push(cityJson)
	            	}
	            })

	            jsonData.forEach(data => {
	            	console.log(data.AREA_NAME)
	            if (Number(data.AREA_LEVEL) === 3) {
	            		// console.log(cityCodeList)
	            		const ind = cityCodeList.indexOf(data.PARENT_ID)
	            		console.log(ind)
	            		sichuanJSON.city[ind].area.push(data.AREA_NAME)
	            	}
	            })


	            fs.writeFileSync(fillJSON, JSON.stringify(sichuanJSON))
	        });
	    });
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
                // console.log($element.text())
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
       const selectorDom = ".c_list3";
       query(selectorDom).each((idx, ele) => {
        const $ele = query(ele)
        // console.log($ele.text())
        const dataTextList = $ele.text().split('\n')
        // console.log(dataTextList.length)
        dataTextList.forEach(data => {
        	// console.log(data)
        	const area = data.replace(/\s/mg, "")
        	if(area.length > 0) {
        		// console.log("this==", area)
        		hebeiJSON.city[idx].area.push(area)
        	}
        })
        // shanxiJSON.city[index].area.push($ele.text())
       })
       hebeiJSON.city[0].name = '省直管县'
       		fs.writeFileSync(fillJSON, JSON.stringify(hebeiJSON))
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
