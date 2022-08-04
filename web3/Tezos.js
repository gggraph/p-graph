/*
// import { TezosToolkit } from '@taquito/taquito';
// const Tezos = new TezosToolkit('https://ithacanet.ecadinfra.com');
const Tezos = new taquito.TezosToolkit('https://mainnet.smartpy.io');


async function TestTezosStuff()
{
    // @ from //https://tezos.b9lab.com/taquito
    // @ Get a balance at address 
    var balance = await Tezos.tz.getBalance('tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY');
    console.log(balance.toNumber() / 1000000  + 'tz');
    // @ Get Current block length 
    var level = (await Tezos.rpc.getBlockHeader()).level;
    console.log(level);
}

TestTezosStuff();
*/

//@ main value
var Tezos;

class TezosNetWork
{

    constructor(rpcnodename)
    {
        this.SetRPCNode(rpcnodename);
        this.rpcnode = rpcnodename;
        // Set a default contract or a default block or a default transaction or a defautl wallet 
    }
    IsCurrentRPCEquals(rpcname)
    {
        return rpcname == this.rpcnode;
    }
    SetRPCNode(name)
    {

        name = name.toLowerCase();
        switch (name)
        {
            case "main": this.module = new taquito.TezosToolkit('https://mainnet.smartpy.io');break;
            case "ithacanet": this.module = new taquito.TezosToolkit('https://ithacanet.ecadinfra.com'); 
                                //this.client = new taquito.RpcClient('https://ithacanet.ecadinfra.com/', 'NetXjD3HPJJjmcd');
                                break;
            case "jakartanet": this.module = new taquito.TezosToolkit('https://jakartanet.ecadinfra.com');break;

        }
             
        
    }
    // @ Call this to avoid error 
    async Init()
    {
        await this.LoadLatestBlock();
    }
    async Test()
    {
        // @ Get a balance at address 
        var balance = await this.module.tz.getBalance('tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY');
        console.log(balance.toNumber() / 1000000  + 'tz');
        // @ Get Current block length 
        //var block = await this.module.rpc.getBlock(); 
        //console.log(block);
        // @ try get semi hack 
        var index = 8;
        var block = await this.module.rpc.getBlock({ block: index.toString() });
        console.log(block.hash);
    }
    
    async GetBlockchainLength()
    {
        var level = (await this.module.rpc.getBlockHeader()).level;
        this.chainlength = level;
        return level;
    }
    async LoadLatestBlock()
    {
        var latest = await this.module.rpc.getBlockHeader();
        this.block = latest;
        console.log(latest);
        this.chainlength = this.block.header.level;
        return this.block;
    }
    // @ this cannot be used if @taquito/rpc not loaded. See Html
    async LoadBlockAtIndex(index)
    {
        var block = await this.module.rpc.getBlock({ block: index.toString() });
        this.block = block;
        console.log(this.block);
        this.DebugBlockObject();
        return this.block;
    }
    SetInternalBlock(bloc)
    {
        this.block = bloc;
    }
    // @ int
    GetBlockIndex()
    {
        return this.block.header.level;
    }
    // @ string
    GetBlockHash()
    {
        // BLEoQGpV3sZ5At92LE8hMqzt5Jh3UtaaFhcZRD936Sc5yy7qfV1
        return this.block.hash;
    }
    GetBlockHexNonce()
    {
        // return an hex nonce
        // Get Object -> proof_of_work_nonce which is an Hex value
        return this.block.header[Object.keys(this.block.header)[10]];
    }
    GetBlockNonce()
    {
        // return an hex nonce
        // Get Object -> proof_of_work_nonce which is an Hex value
        return HexToDec(this.block.header[Object.keys(this.block.header)[10]]);
    }
    DebugBlockObject()
    {
        var blockl=  Object.keys(this.block.header).length;
        var i;
        for (i =0; i < blockl; i++)
        {
            console.log(i + " : " + this.block.header[Object.keys(this.block.header)[i]])
        }
    }
    // @ string
    GetBlockStringTimeStamp()
    {
        // eg : 2022-07-09T13:05:45Z
        return this.block.header.timestamp;
    }
    // @ Unix
    GetBlockTimeStamp()
    {
        // eg : 2022-07-09T13:05:45Z
        var date = new Date(this.block.header.timestamp);
        return Math.floor(date.getTime() / 1000);
    }
    GetBlockPreviousHash()
    {
        return this.block.header.predecessor;
    }
    // @ string
    GetBlockSignature()
    {
        // eg : sigqThvmbsgfBaPKo4HCp8SeTXG5MvPZL6nGxFK6Nb1XZG43JpaxYaVX2t9Qtvkeueqb4AuCvLLdFae4fGS4voHv3H5Mgogt
        return this.block.header.signature;
    }
  
    // Transactions [?]
    
    // Contract. You can eventually see contract at :
    //https://better-call.dev/ithacanet/KT1NzbR52g8TBAKzDH5TXEtxiARFuwzvC4hi/storage
    // see
    // https://tezostaquito.io/docs/maps_bigmaps
    // Lots of MAP are just not working but well 
    //@ Load Contract and its storage 
    async LoadContract(contractaddr)
    {
        this.contract =  await this.module.contract.at(contractaddr);
        this.contractstorage = await this.contract.storage();
        console.log( this.contractstorage);
        console.log(this.contract);
        // Build storage map
        if ( typeof this.contractstorage.keyMap === 'undefined')
            return;
        this.storageMap = new Array();
        for (const [key, value] of this.contractstorage.keyMap.entries()) 
        {
            console.log("Adding key " + value);
            this.storageMap.push(value);
        }
    }
    // @ Get number of elements in contract storage 
    GetStorageLength()
    {
        return this.storageMap.length;
    }
    GetContractAddress()
    {
        return this.contract.address;
    }
    // @ This was working in any format until there
    GetStorageValueAtIndex(index)
    {
        if (typeof this.contractstorage.keyMap === 'undefined')
        {
            return this.contractstorage[Object.keys(this.contractstorage)[index]];
        }
        return this.contractstorage.get(this.storageMap[index]);
    }
    GetStorageKeyAtIndex(index)
    {
        
        if ( typeof this.contractstorage.keyMap === 'undefined')
        {
           return Object.keys(this.contractstorage)[index];
        }
        return this.storageMap[index];
    }
}

function InitTezosNetwork()
{
    Tezos = new TezosNetWork("ithacanet");
    Tezos.Test();
 
   
}