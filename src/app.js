const IPFS = require('ipfs');
const Y=require('yjs');
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-map')(Y)
require('y-indexeddb')(Y)
require('y-ipfs-connector')(Y)

const ipfs=new IPFS({
    repo:repo(),
    EXPERIMENTAL:{
        pubsub:true,
    }
})

ipfs.once('ready',()=>ipfs.id((err, info)=>{
    if(err){
        throw err
    }else{
        console.log('Joined Dukaan Babu Network : Node Address -> ' +info.id);
        Y({
            db: {
              name: 'indexeddb'
            },
            connector: {
              name: 'ipfs',
              room: 'dukaanbabu',
              ipfs: ipfs
            },
            share: {
              textfield: 'Text',
              database:'Map'
            }
          }).then((y) => {
              // 1) Read all values from Database  and put it in the Database Map

              let history=[];


            document.getElementById("set").onclick =function(){
                let price=document.getElementById('price').value;
                console.log("Price Published as :"+price);
                history.push(y.share.database.set("product",price));
                console.log(history);
                y.share.database.set("product",history);
            };

            document.getElementById("get").onclick =function(){
                console.log("Subscribed to Topic : product")
                let priceRecieved=y.share.database.get("product");
                console.log(priceRecieved);
                document.getElementById('price').value=priceRecieved;
            };

          })        
    }
}))

function repo(){
    return 'ipfs/dukaandemo/'+Math.random();
}





  