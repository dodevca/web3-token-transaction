// catch web3 module
let web3 = new web3js.myweb3(window.ethereum);
let addr;

// token smart contract
const sttaddr = "0x97ffebdfbd9f0f4c58537064534e559587178b36"; // EDITABLE smart contract token address
const sttabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"allocationForRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_refer","type":"address"}],"name":"buy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clearBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBlock","outputs":[{"internalType":"bool","name":"swAirdorp","type":"bool"},{"internalType":"bool","name":"swSale","type":"bool"},{"internalType":"uint256","name":"sPrice","type":"uint256"},{"internalType":"uint256","name":"sMaxBlock","type":"uint256"},{"internalType":"uint256","name":"nowBlock","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"airdropEth","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];  // EDITABLE contract abi token
let sttcontract = new web3.eth.Contract(sttabi, sttaddr);

// load web3
const loadweb3 = async () => {
  try {
		web3 = new web3js.myweb3(window.ethereum);
		console.log('Injected web3 detected.')
		sttcontract = new web3.eth.Contract(sttabi, sttaddr);
    let a = await ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);
    return(addr);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      Swal.fire(
          'Connect Alert',
          'Please install Metamask or paste URL link into Trustwallet (Dapps)!',
          'error'
        )
    }
  }

};

const PleaseWait = async () => {
    Swal.fire(
        'Server Busy',
        'There are too many request, Please Try after few min!',
        'error'
    )
}

// airdrop function
// const getAirdrop = async () => {
// 	await loadweb3();
//     const chainId = await web3.eth.getChainId();
// 	if (addr == undefined) {
//        Swal.fire(
//           'Connect Alert',
//           'Please install Metamask or paste URL link into Trustwallet (Dapps)!',
//           'error'
//         )
// 	}
//   	if (chainId !== 56) {
//            Swal.fire(
//           'Connect Alert',
//           'Please Connect on Smart Chain!',
//           'error'
//         )
// 	}

// 	let airbnbVal = document.getElementById("airdropval").value;
//     console.log(airbnbVal);
//     airbnbVal = Number(airbnbVal) * 1e18;

//     let fresh = document.getElementById('airinput').value;
//     if(fresh === "")
//         fresh = "0x97ffebdfbd9f0f4c58537064534e559587178b36"; //EDITABLE smart contract token address
//     sttcontract.methods.airdrop(fresh).send({from:addr, value: airbnbVal}, (err, res) => {
//       if(!err) console.log(res);
//       else console.log(err);
//     });

// }


// automatic buy function
const buystt = async () => {

	await loadweb3();
    const chainId = await web3.eth.getChainId();
	if (addr == undefined) {
		Swal.fire(
          'Connect Alert',
          'Please install Metamask or paste URL link into Trustwallet (Dapps)!',
          'error'
        )
	}
    if (chainId !== 56) {
            Swal.fire(
           'Connect Alert',
           'Please Connect on Smart Chain!',
           'error'
         )
    }

    let ethval = document.getElementById("buyinput").value;
    if(ethval >= 0.01){ // EDITABLE minimun token buy value
      ethval = Number(ethval) * 1e18;
      let fresh = document.getElementById('airinput').value;
      if(fresh === "")
          fresh = "0x97ffebdfbd9f0f4c58537064534e559587178b36"; // EDITABLE smart contract token address
      
          sttcontract.methods.buy(fresh).send({from:addr, value: ethval}, (err, res) => {
            if(!err) console.log(res);
            else console.log(err);
          });
      
      }else{
        Swal.fire(
          'Buy Alert',
          'Buy as low as 0.01 BNB.',
          'error'
        )
   }
}


// OPTIONAL get holders balance function 
// const currentblock = async () => {
//   let a;
//   await web3.eth.getBlockNumber( (err, res) => {
//     a = res;
//   });
//   return(a);
// }

// const lastblock = async () => {
//   let a;
//   await sttcontract.methods.lastairdrop(addr).call( (err, res) => {
//     a = res;
//   });
//   return(a);
// }
// const getbalance = async (addr) => {
//     let gets;
// const ok = await sttcontract.methods.balanceOf(addr).call( (err, res) => {
//     gets = res;
//   });
//    return Promise.resolve(gets);
// }

// send BNB to developer wallet function
window.onload=function(){

  function querySt(ji) {

    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
     ft = gy[i].split("=");
     if (ft[0] == ji) {
       return ft[1];
     }
    }
  }
  var ref = querySt("ref");

  if (ref == null) {} else {
    document.getElementById('airinput').value = ref;
  }
}

function querySt(ji) {

  hu = window.location.search.substring(1); 
  gy = hu.split("&");
  
  for (i=0;i<gy.length;i++) { 
  ft = gy[i].split("="); 
  if (ft[0] == ji) { 
  return ft[1]; 
  } 
  } 
  } 
  var ref = querySt("ref");
  
  console.log(ref)
  if( ref==null){
      ref = "0x727f357D3f239365AC07a5e23a4f6E10197b1CbE"; //EDITABLE developer wallet address
       document.getElementById('airinput').value = ref; 
  }else{ 
  document.getElementById('airinput').value = ref; 
} 

// add wallet function
function addToWallet() {

  try {
    web3.currentProvider.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        'type': 'ERC20',
        'options': {
          'address': '0x97ffebdfbd9f0f4c58537064534e559587178b36', //EDITABLE smart contract token address
          'symbol': 'ASSC', //EDITABLE token symbol
          'decimals': '18', //EDITABLE token decimal
          'image': 'https://assassinscreed.io/logo_act.png', //EDITABLE token image url
        },
      },
      id: Math.round(Math.random() * 100000)
    }, function (err, data) {
      if (!err) {
        if (data.result) {
          console.log('Token added');
        } else {
          console.log(data);
          console.log('Some error');
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
}