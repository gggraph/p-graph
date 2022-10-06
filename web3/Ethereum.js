var Ethereum;
var LoadedABI = null;
class EthereumNetWork
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
            case "main": this.module = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")); break;
            case "ropsten": this.module = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));break;
            case "rinkeby": this.module = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));break;
            case "goerli": this.module = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));break;
            case "kovan": this.module = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));break;
        }
             
        
    }
    // @ Call this to avoid error 
    async Init()
    {
        await this.LoadLatestBlock();
    }
    async Test()
    {
        
        
    }
    
    async GetBlockchainLength()
    {
        var level = await this.module.eth.getBlockNumber();
        this.chainlength = level;
        return level;
    }
    async LoadLatestBlock()
    {
        var latest = await this.module.eth.getBlock('latest')
        this.block = latest;
       
        //this.chainlength = this.block.level;
        return this.block;
    }
    // @ this cannot be used if @taquito/rpc not loaded. See Html
    async LoadBlockAtIndex(index)
    {
        var block = await this.module.eth.getBlock(index)
        this.block = block;
        return this.block;
    }
    SetInternalBlock(bloc)
    {
        this.block = bloc;
    }
    // @ int
    GetBlockIndex()
    {
        return this.block.number;
    }
    // @ string
    GetBlockHash()
    {
        return this.block.hash;
    }
    GetBlockHexNonce()
    {
        return this.block.nonce;
    }
    GetBlockNonce()
    {
        // return an hex nonce
        // Get Object -> proof_of_work_nonce which is an Hex value
        return HexToDec(this.block.nonce);
    }
    DebugBlockObject()
    {
        var blockl=  Object.keys(this.block).length;
        var i;
        for (i =0; i < blockl; i++)
        {
            console.log(i + " : " + this.block[Object.keys(this.block)[i]])
        }
    }
    // @ string
    GetBlockStringTimeStamp()
    {
        var date = new Date(this.block.timestamp * 1000);
        return date.toDateString();
    }
    // @ Unix
    GetBlockTimeStamp()
    {
        return this.block.timestamp;
    }
    GetBlockPreviousHash()
    {
        return this.block.parentHash;
    }
    // @ string
    GetBlockSignature()
    {
        // eg : not available !!!!!!!!!!!!!!!!!!!!!!!!!!!
        return this.block.signature;
    }
    GetBlockTransactionAddress(index)
    {
        return this.block.transactions[index];
    }
    GetBlockGasLimit()
    {
        return this.block.gasLimit;
    }
    GetBlockGasUsed()
    {
        return this.block.gasUsed;
    }
    GetBlockBytesSize()
    {
        return this.block.size;
    }
    GetBlockchainDifficultyAtBlockTime()
    {
        return this.block.totalDifficulty;
    }
    GetBlockMinerAddress()
    {
        return this.block.miner;
    }
  
    // Transactions
    async LoadTransaction(transactionaddr)
    {
        var tx = await this.module.eth.getTransaction(transactionaddr);
        this.transaction = tx;
        console.log(tx);
        return this.transaction; 
    }
    GetTransactionBlockIndex()
    {
        return this.transaction.blockNumber;
    }
    GetTransactionBlockHash()
    {
        return this.transaction.blockHash;
    }
    GetTransactionAccountAddr()
    {
        return this.transaction.from;
    }
    GetTransactionHash()
    {
        return this.transaction.hash;
    }
    GetTransactionIndexInBlock()
    {
        return this.transaction.transactionIndex;
    }
    GetTransactionGasUsed()
    {
        return this.transaction.gas;
    }
    GetTransactionGasPrice()
    {
        return parseInt(this.transaction.gasPrice);
    }
    
    // Contract. Here we need an Abi as JSON for ethereum .... 
    //@ Load Contract and its storage 
    async LoadContract(contractaddr, abi)
    {
        //this.contract =  await this.module.contract.at(contractaddr);
        //this.contractstorage = await this.contract.storage();
        window.web3 = this.module;
        this.contract = await new web3.eth.Contract(abi, contractaddr);
        this.contractstorage = this.contract.methods;
        console.log(this.contract);
        prompt.AddEventText("Contract loaded at " + this.GetContractAddress());
        /*
        // Try to get method for the test ...
        console.log("length of storage"  + this.GetStorageLength());
        this.DebugStorage();
        // owner is 26
        var owner = await this.GetStorageValueAtIndex(26);
        console.log(owner);
        */
    }
    DebugStorage()
    {
        // Object.keys(this.contractstorage)[index]
        var l = this.GetStorageLength();
        var i ;
        for ( i = 0 ; i < l; i++)
            console.log(i + " : " + this.GetStorageKeyAtIndex(i));
    }
    // @ Get number of elements in contract storage 
    GetStorageLength()
    {
        return  Object.keys(this.contractstorage).length;
    }
    GetContractAddress()
    {
        return this.contract._address;
    }
    
    // @ Get value of storage at index in any format 
    async GetStorageValueAtIndex(index)
    {
        var method = this.GetStorageKeyAtIndex(index); 
        var asyncf = "var data = await Ethereum.contract.methods."+method+".call(); Ethereum.storagevalue = data;";
        var data = await eval("(async () => {"+asyncf+"})()");
        return this.storagevalue;
    }
    GetStorageKeyAtIndex(index)
    {
        return Object.keys(this.contractstorage)[index];
    }
    
    // @ And More
    async GetAverageGasPrice()
    {
        var r = await this.module.eth.getGasPrice();
        return r;
    }
}

async function InitEthereumNetwork()
{
    setInterval(RequestEtherToRealMoney, 10000);
    Ethereum = new EthereumNetWork("ropsten");
    Ethereum.Test();
    
   
}

function LoadContractABI(abifile)
{
    var json = JSON.parse(abifile);
    LoadedABI = json;
    prompt.AddEventText("ABI SUCCESSFULLY LOADED")
}
/*
var OnMainNet = false;
var ProviderFound = false;
var Accounts;
var LatestEthereumBlockIndex = 0;
var DollarForOneEther = 0;
var EuroForOneEther   = 0; 
var GweiForOneGas    = 0;

async function LoadProvider()
{
    if ((typeof window.ethereum !== 'undefined')
    || (typeof window.web3 !== 'undefined')) 
    {
        
        window.web3 = new Web3(window.ethereum);
        ProviderFound = true;
        var type = await web3.eth.net.getNetworkType();
        console.log("type of network:"+type);
        if ( type == "main" )
        {
            OnMainNet = true;
            console.log("set true");
           
        } 
        else
        {
            
                        console.log("set false");
            OnMainNet = false;
        }  
    }
    else
    {
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
        OnMainNet = false;
        ProviderFound = false;
        console.log("set false");
    }
   
}

async function CheckRopstenConnection()
{
    if ( ProviderFound)
    {
        var type = await web3.eth.net.getNetworkType();
        if ( type == "main" )
        {
            OnMainNet = true;
        } 
        else
        {
                        
            OnMainNet = false;
        }        
    }
}

async function GetProviderAccounts()
{
    if ( OnMainNet){
        Accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
        return Accounts;
    }
    
}

async function GetLatestBlockIndex()
{
    if( OnMainNet)
    {
        LatestEthereumBlockIndex = await new web3.eth.getBlockNumber();
        return LatestEthereumBlockIndex;
    }
        
      
}

async function GetAverageGasPrice()
{
    
    if( OnMainNet)
    {
        web3.eth.getGasPrice().then((result) => {
            GweiForOneGas = result;
        })
    }
    
}
*/
