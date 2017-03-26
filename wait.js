function sleep(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        },t)
    })
}

async function waitFor(testFx,time){
    for(var i = 0; i < time; ++i){
        if(testFx())
            return true;
        await sleep(500);
    }
    return false;
}



async function f1() {
    for(var i=0;i<3;++i){
        await sleep(2000)
        console.log(i)
    }

    await f3()

    console.log("over")


}

f1()


console.log("end")

async function f3() {
    try {
        await sleep(3000)
        var z = await Promise.reject(30)

    }catch (e){
        console.log(e)
    }

}

f3()