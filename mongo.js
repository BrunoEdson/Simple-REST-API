const {MongoClient} = require('mongodb')

async function main(mode, data = {}) {
    const uri ='mongodb://localhost:27017/'
    const client = new MongoClient(uri)
    try{
        await client.connect()
        switch(mode){
            case 'select':
                const sel = await searchMultiData(client)
                return sel
            case 'selectOne':
                const selOne = await searchData(client, data)
                return selOne
        }
    }catch (e){
        console.log(e)
    }finally {
        await client.close()
    }
}

async function searchData(client, data){
        const cursor = await client.db('quotes').collection('quotes').find(data)
        const results = await cursor.toArray()
        return results
 }

async function searchMultiData(client, {MaximumNumberOfResults = Number.MAX_SAFE_INTEGER} = {}){
    const cursor = await client.db('quotes').collection('quotes').find()
    const results = await cursor.toArray()
    return results
}
 
 module.exports = main