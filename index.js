const cheerio = require('cheerio');
const http = require('http');
const iconv = require('iconv-lite');
const fs = require('fs');
// const qs = require('querystring');

// var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';

const provinceList = ['辽宁省', '河北省', '江苏省', '浙江省', '福建省', '山东省', '湖北省', '广东省', '四川省', '陕西省']


let getStatus = false // 临时用于处理数据同步请求执行,避免上一次数据未处理完就开始下一次采集
// function getAddress(index) {
// 	if(index+1 <= provinceList.length) {
// 		provinceJSON(provinceList[index])
// 		if (!getStatus) {
// 			getAddress(index + 1)
// 		}
// 	}
// }
// getAddress(0)
provinceJSON(provinceList[0])

function provinceJSON(province) {
	switch(province) {
		case '辽宁省':
			getLiaoningData();
		  	break;
		case '河北省':
		  	getHebeiData();
		  	break;
		case '江苏省':
		  	getJiangSuData();
		  	break;
		case '浙江省':
		  	getZheJiangData();
		  	break;
		case '福建省':
		  	getFuJianData();
		  	break;
		case '山东省':
		  	getShanDongData();
		  	break;
		case '湖北省':
		  	getHubeiData();
		  	break;
		case '广东省':
		  	getGuangDongData();
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
	getStatus = true
}

	function getJSON(url) {
		http.get(url, res => {
			let html = ''
			res.on('data', data => {
				html += data
			})
			res.on('end', () => {
				console.log(html)
			})
		})
	}
function getLiaoningData() {
	const liaoningURL = 'http://www.lnzwfw.gov.cn/view/register/index_1.html'
	console.log('辽宁省')
			fs.createWriteStream('data/5.json')
	const fillJSON = ".\\data\\5.json"
	const provinceJSON = {
		"name": "辽宁省",
	    "city": []
		}
	const cityCode = []
}

function getShanDongData() {
	console.log('山东省')
	// const shandongURL = 'http://zwfw.sd.gov.cn/'
	const shandongURL = 'http://zwfw.sd.gov.cn/sdzw/front/web/cw.do'
		fs.createWriteStream('data/14.json')
	const fillJSON = ".\\data\\14.json"
	const provinceJSON = {
		"name": "山东省",
	    "city": []
		}
	const cityCode = []
	getHTML(shandongURL)
	
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
//               const deleteHTML = `/
// //document.writeln("		<ul id="ban_9_999" style="display:none;"  class="baner">
// //document.writeln("		</ul>/
//               `
              htmlArray.forEach(htm => {
                const newHtml = htm.replace(/\"\);$/mg, '').replace(/\\/mg,'')
                // console.log(newHtml)
                //   /(\"\);)$/g
                const endHtml = newHtml.replace(/^(document.writeln\(\")/g, '')
                              // console.log(endHtml)
                      newHTML = newHTML + endHtml + '\n'

              })
              // const regEXP = new RegExp(deleteHTML, 'mg')
              // console.log()
              // const testHTML = newHTML.replace(regEXP, '')
              // console.log(testHTML)
              // console.log(newHTML)
                         fs.writeFileSync('data/test.html', newHTML)
               const $ = cheerio.load(newHTML, {decodeEntities: false});
                      $("#ds a[style]").each(function (idx, element) {
                          // console.log(idx)
              const $element = $(element);
              cityCode.push($element.text())
              // // console.log($element)
                console.log($element.text())
                // console.log($element.attr('value'))
              //   // console.log($element)
                const cityJson = {
                  "name" : $element.text(),
                  "area" : []
                }
                provinceJSON.city.push(cityJson)


                // const valueNumber = $element.val()
                //  console.log(valueNumber)
            })
         
                // let index = 0
                getAreaHTML($)
          });
      });
  }
    function getAreaHTML(query){
    	// console.log('json')
       const selectorDom = "#right_qx .text1";
       console.log(provinceJSON.city.length)
       query(selectorDom).each((idx, ele) => {
        const $ele = query(ele)
        // console.log($ele.text())
        // console.log(idx)
        console.log(provinceJSON.city[idx].name)
        const dataTextList = $ele.text().split('\n')
        // console.log(dataTextList.length)
        dataTextList.forEach(data => {
        	// console.log(data)
        	const area = data.replace(/\s/mg, "")
        	if(area.length > 0) {
        		// console.log("this==", area)
        		if (!/\/\//mg.test(area)) {
        			const newArea = area.replace(/\"\)/mg, '');
        			provinceJSON.city[idx].area.push(newArea)
        		}
        	}
        })
        // shanxiJSON.city[index].area.push($ele.text())
       })
       // provinceJSON.city[0].name = '省直管县'
       		fs.writeFileSync(fillJSON, JSON.stringify(provinceJSON))
  }
}

function getFuJianData() {
	// const fujiangURL = 'http://www.fjbs.gov.cn/';
	const fujiangURL = 'http://www.fjbs.gov.cn/index.action';
	const fujiangCode = '?fn=newSiteList&punid=BE604230CB234D4620B334BED6517446';
	console.log('福建省');
	fs.createWriteStream('data/12.json')
	const fillJSON = ".\\data\\12.json"
	const provinceJSON = {
		"name": "福建省",
	    "city": []
		}
	const cityCode = []
	getJsonData(fujiangURL+fujiangCode)
	function getJsonData(url) {
		console.log(url)
		// const formData = new formData;
		// formData.
		http.get(url, function(res){
			res.setEncoding('utf-8'); //防止中文乱码
			// console.log(res)
			let html = ''
			res.on('data', data => {
				html += data
			})
			res.on('end', () => {
				// console.log(html)
				const newJSON = JSON.parse(html)
				// console.log(newJSON['sites'])
				const cityList = newJSON['sites'];
				cityList.forEach((key, index) => {
					console.log(key.name)
		      		const cityJson = {
		  			      	"name" : key.name,
		  			      	"area" : []
		  			      }
		  			      if (index !== 0) {
		  			    	provinceJSON.city.push(cityJson)
		  			      }
				})
				getAreaJSON(0)
				function getAreaJSON(index) {
					if(index + 1 <= provinceJSON.city.length) {
						const areaUrl = fujiangURL + '?fn=newSiteList&punid=' + cityList[index+1].unid
						console.log(cityList[index].unid)
						http.get(areaUrl, response => {
							response.setEncoding('utf-8')
							let areaString = ''
							response.on('data', data => {
								areaString += data
							})
							response.on('end', () => {
								const areaJsonList = JSON.parse(areaString)['sites']
								areaJsonList.forEach(area => {
									provinceJSON.city[index].area.push(area.name)
								})
								getAreaJSON(index + 1)
							})
						})
					} else {
						fs.writeFileSync(fillJSON, JSON.stringify(provinceJSON))
					}
				}
			})
		})
	}
}

function getGuangDongData() {
	// const guangdongURL = 'http://www.gdbs.gov.cn/portal/index.do'
	const guangdongURL = 'http://www.gdbs.gov.cn/portal/loadAsyncAADJs.do?xzqhdm=440000&callback=jQuery111104407450214630664_1522397742339&_=1522397742340'
	console.log('广东省')
		  	fs.createWriteStream('data/18.json')
	const fillJSON = ".\\data\\18.json"
	const provinceJSON = {
		"name": "广东省",
	    "city": []
		}
	const cityCode = []
	  getHTML(guangdongURL)

	function getHTML(url){
		http.get(url, function(res) {
	      res.setEncoding('utf-8'); //防止中文乱码
	        let html = '';
	        res.on('data', function(data) {
	            html += data;
	        });
	        res.on('end', function() {
	                     // console.log(html)
	                     const newHTML = html.replace(/\\/mg, "").replace(/^jQuery\d+\_\d+\(JSON.parse\(\'/mg, "").replace(/\'\)\)$/mg, "")
	                     // const testJson = JSON.parse(JSON.stringify(newHTML))
	                     const testJson = JSON.parse(newHTML)
	 
	                     /*
http://www.gdbs.gov.cn/portal/loadAsyncAADJs.do?callback=jQuery111104407450214630664_1522397742339&xzqhdm=440300000000
http://www.gdbs.gov.cn/portal/loadAsyncAADJs.do?callback=jQuery111104407450214630664_1522397742339&xzqhdm=440100000000

	                     */

	             
	                          	const cityList = testJson['dsft']
	                          	// const cityCode = []
	                          	cityList.forEach((city, index) => {
	                          		// const changeCityName = city.XZQHMC.replace(/u/mg,'\\u')
	                          		const changeCityName = unescape(city.XZQHMC.replace(/u/mg,'\%u'))
	                          		// cityCode.push(city.XZQHDM)
	                          		// console.log(changeCityName)
	                          		// provinceJSON.city.push(changeCityName)
	                          		const cityJson = {
					  			      	"name" : changeCityName,
					  			      	"area" : []
					  			      }
					  			    provinceJSON.city.push(cityJson)
	                          	})
	                          	            	// console.log('get==>', provinceJSON.city)
	                          	// provinceJSON.city.forEach()
	                          	getAreaJSON(0)
	                          	function getAreaJSON(index) {
	                          		console.log(index)
	                          		if (index + 1 <= cityList.length) {
	                          			const code = cityList[index].XZQHDM
		                          		console.log(code)
		                          		const url = 'http://www.gdbs.gov.cn/portal/loadAsyncAADJs.do?callback=jQuery111104407450214630664_1522397742339&xzqhdm=' + code
		                          		http.get(url, response => {
		                          			    response.setEncoding('utf-8'); //防止中文乱码
		                          			// console.log(response)
		                          			let html = ''
		                          			response.on('data', function(data) {
		                          				html += data
		                          			})
		                          			response.on('end', () => {
		                          				  const newJSON = html.replace(/\\/mg, "").replace(/^jQuery\d+\_\d+\(JSON.parse\(\'/mg, "").replace(/\'\)\)$/mg, "")
								                     // const testJson = JSON.parse(JSON.stringify(newHTML))
								                     const areaJSON = JSON.parse(newJSON)
		                          				// console.log()
		                          				const areaListData = areaJSON['dsft']
		                          				areaListData.forEach(area => {
		                          					const changeAreaName = unescape(area.XZQHMC.replace(/u/mg,'\%u'))
		                          					console.log(changeAreaName)
		                          					provinceJSON.city[index].area.push(changeAreaName)
		                          				})
		                          				getAreaJSON(index + 1)
		                          			})
		                          		})
	                          		} else {
	                          			   fs.writeFileSync(fillJSON, JSON.stringify(provinceJSON))
	                          		}
	                          	}

	                  
	        });
	    });
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
	        	const htmlList = html.split('\n')
	        	let newHTML = ''
	        	for(i = 0; i < 141; i++){
	        		newHTML = newHTML + htmlList[i];
	        		// console.log(htmlList[i])
	        	}
	        	const endHTML = `
					        	module.exports.arrList = arrWeb;
					       		`
	        			newHTML = newHTML + endHTML
	                     fs.writeFileSync('data/zhejiang.js', newHTML)
	                    // const test2 = import arrWeb from'./data/zhejiang.js'
	                     const ZJJson = require('./data/zhejiang.js')
	                     // console.log(arrWeb)
	                     // console.log(ZJJson)
	                     Object.keys(ZJJson.arrList).forEach((key, index) => {
	                     	const cityName = ZJJson.arrList[key][0][0].split('|')[0]
	                     	// console.log(cityName)
	                     	if(index !== 0){
                     			cityCode.push(cityName)
	                     		const cityJson = {
				  			      	"name" : cityName,
				  			      	"area" : []
				  			      }
				  			     provinceJSON.city.push(cityJson)
	                     	}
	                     	// console.log(ZJJson.arrList[key][0][1])
	                     })
	                     // console.log(cityCode)
	                     cityCode.forEach((city, index) => {
	                     	// console.log(ZJJson.arrList[index+1][0][0])
	                     	const areaList = []
	                     	const cityList = ZJJson.arrList[index+1]
	                     	// const = te
	                     	cityList.forEach((area, idx)=>{
	                     		if(idx!==0){
	                     			const areaName = area[0].split('|')[0]
	                     			// console.log(areaName)
	                     			areaList.push(areaName)
	                     			provinceJSON.city[index].area.push(areaName)
	                     		}
	                     	})
	                     })
	                     fs.writeFileSync(fillJSON, JSON.stringify(provinceJSON))
	        });
	    });
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
