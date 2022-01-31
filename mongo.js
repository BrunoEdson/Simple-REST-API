const {MongoClient} = require('mongodb')

async function main(data) {
    const uri ='mongodb://localhost:27017/'
    console.log
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const sel = await searchMultiData(client, data)
        return sel
    }catch (e){
        console.log(e)
    }finally {
        await client.close()
    }
}

async function searchMultiData(client, data, {MaximumNumberOfResults = Number.MAX_SAFE_INTEGER} = {}){
    if(data == null){
        const cursor = await client.db('quotes').collection('quotes').find()
        const results = await cursor.toArray()
        return results
    }else{
        const cursor = await client.db('quotes').collection('quotes').find(data)
        const results = await cursor.toArray()
        return results
    }
}
 
 module.exports = main