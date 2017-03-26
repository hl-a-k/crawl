const phantom = require('phantom');

function sleep(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        },t)
    })
}

async function waitFor(testFx,time){
    for(var i = 0; i < time; ++i){
        if(await testFx())
            return true;
        await sleep(500);
    }
    return false;
}

(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();

    user_agent = (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
    )


    page.setting('userAgent', user_agent);
    await page.on("onResourceRequested", function (requestData) {
        // console.info('Requesting', requestData.url)
    });

    await page.on("onConsoleMessage",function (msg) {
        console.info(msg)
    })

    await page.open('http://www.cnrsj.com/qiuzhi/zuixin.aspx');


    let idx = 1;
    while(true){
         await page.render(idx++ + ".png");

        await page.evaluate(function () {
            var trs = $('tr.RowStyle,tr.AltRowStyle')
            var n = trs.length
            for(var i=0;i<n;++i){
                var company = $(trs[i].children[1]).text().trim()
                var job = $(trs[i].children[2]).text().trim()
                var href = $(trs[i].children[2]).find("a")[0].href
                if(job.indexOf("程序") > -1 ||job.indexOf("软件") > -1 || job.indexOf("java") > -1  ){
                    console.log(company + "\t" + job + "\t" + href)
                }
            }


            return true;
        })

        let next = await page.evaluate(function () {
            var tds = $('tr.PagerStyle table td');
            var n = tds.length;

            for(var i=1;i<n;++i){
                if( $(tds[i-1]).find("a").length == 0 ){
                    $(tds[i]).find("a")[0].click()
                    return true;
                }
            }
            return false;
        })

        if(next){
            await sleep(800)

            await waitFor(()=>{
                return page.evaluate(function () {
                    // console.log( $('tr.PagerStyle table td').length )
                    return $('tr.PagerStyle table td').length > 0
                })
            },10);
        }else {
            break;
        }
    }

    instance.exit();
}());

//
// 温州三创网络科技有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=36263&zw=20121108103031088_36263
//     温州崇坤印业有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=66387&zw=20170323121218002_66387
//     浙江维融电子科技股份有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=62196&zw=20160910110955683_62196
//     温州快富电子科技有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=61308&zw=20161219163617877_61308
//     温州市科星电子有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=23213&zw=20160608081430887_23213
//     浙江天信仪表科技有限公司	单片机/DLC/DSP/底层软件开发	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=83641&zw=20170313164723607_83641
//     浙江天信仪表科技有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=83641&zw=20170313165630155_83641
//     温州九度文化传媒有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=78603&zw=20161012100508608_78603
//     温州德平医药连锁有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=68248&zw=20170201192849572_68248
//     联众智慧科技股份有限公司温州分公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=83581&zw=20170308104330890_83581
//     福建哈德仪表有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=82091&zw=20170225162520661_82091
//     福建哈德仪表有限公司	单片机/DLC/DSP/底层软件开发	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=82091&zw=20170225161008280_82091
//     浙江苍南仪表厂	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=12551&zw=20170224082211259_12551
//     温州神思电子科技有限公司	程序员/软件工程师	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=29266&zw=20170210110006496_29266
//     温州图荣科技有限公司	单片机/DLC/DSP/底层软件开发	http://www.cnrsj.com/qiuzhi/zhiweixinxi.aspx?dw=73775&zw=20150318104003140_73775