const stuDao=require('../dao/app1Dao')
var cz = "off"
var zt =0;
const int = setInterval(() => {
  var sql="SELECT value FROM device WHERE id = "+'002' ;
  stuDao.getStuDao(sql,[],function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
 //console.log(result)
 const mid=JSON.parse(JSON.stringify(result));
 if(JSON.stringify(mid) === '[]'){

 }else{
  //console.log(mid)
  const zz=mid[0].value;
  //console.log(zz)
  if(zz >= 20){
    zt = 1
    cz = "on"
    //console.log(zt)
  }else{
    zt = 0
    cz = "off"
   }
 }
  })
}, 500);
const iot = require('alibabacloud-iot-device-sdk');
const device = iot.device({
  productKey: 'a1OeqPAQpvJ', //将<productKey>修改为实际产品的ProductKey
  deviceName: 'air777',//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: 'ad500e057ea8826605d89e94c2c06649',//将<deviceSecret>修改为实际设备的DeviceSecret
})
device.on('connect', () => {
  //将<productKey> <deviceName>修改为实际值
  device.subscribe('/a1OeqPAQpvJ/air777/user/get'); 
 // console.log('connect successfully!');
  //发送消息给谁
  device.publish('/a1OeqPAQpvJ/air777/user/update', 'hello world!');
});
device.on('message', (topic, payload) => {

});
module.exports={ 
   ac(req,resp){
     const id = req.params['id'];   
     const status = req.params['status']
     var zz=[id,'ac',status,cz];
     var zzz=[status,cz,id]
    var sq="INSERT INTO device (id,type,value,cz) VALUES (?,?,?,?)";
    stuDao.getStuDao(sq,zz,function(err,data){
      if(err){
       // console.log('[SELECT ERROR] - ',err.message);
        return;
      }
  })
 
  var s='UPDATE device SET value = ?, cz= ? WHERE id = ?';
  stuDao.getStuDao(s,zzz,function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
})  
device.postProps({  	
    PowerSwitch:zt,
     }, (res) => {
   //console.log(res);
   });	 
   device.onProps((cmd)=>{
    console.log('>>>onProps',cmd); //打印完整的属性设置消息
    for(var key in cmd.params){ 
      if(key=='PowerSwitch'){ //判断是否设置的是LightSwitch属性
    //   //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
          zt = cmd.params.PowerSwitch;
          clearInterval(int);
    //   //本地设置完毕之后，将更新后的状态报告给云端。
    //   //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
           device.postProps({'PowerSwitch':zt});
       }
     }
     })
    const obj = {
      id: id,
      success: true, // 是否成功
      status: zt
      };
      int.unref();
      resp.write(JSON.stringify(obj));
// 结束应答
      resp.end();       
},
acon(req,resp){
  clearInterval(int);
  zt = 1
  cz = "on"
  resp.send({ succ: true });
  resp.end();
},
acoff(req,resp){
  clearInterval(int);
  zt = 0
  cz ="off"
  resp.send({ succ: true });
  resp.end();
}
}