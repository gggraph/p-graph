var Network;

function SwitchToTezosNetwork(rpcnode)
{
    prompt.AddEventText('Network: Tezos ' + rpcnode);
    if (!Tezos.IsCurrentRPCEquals(rpcnode))
        Tezos.SetRPCNode(rpcnode);
    Network = Tezos;
}
function SwitchToEthereumNetwork(rpcnode)
{
    prompt.AddEventText('Network: Ethereum ' + rpcnode);
    if (!Ethereum.IsCurrentRPCEquals(rpcnode))
        Ethereum.SetRPCNode(rpcnode);
    Network = Ethereum;
    
}