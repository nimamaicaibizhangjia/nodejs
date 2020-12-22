const stuDao=require('../dao/app1Dao');
const { temp } = require('./tempCtrl');
module.exports={ 
    add(req,resp){
      let id = req.body.id;
      let type = req.body.type;
      let value = req.body.value;
      let cz = req.body.cz;
    //  console.log(id,type,value,cz)
        var sq="INSERT INTO device (id,type,value,cz) VALUES (?,?,?,?);";
        stuDao.getStuDao(sq,[id,type,value,cz],function(err,data){
             resp.send({ succ: true });
        })  
    },
    update(req,resp){
      let id = req.body.id;
      let type = req.body.type;
      let value = req.body.value;
      let cz = req.body.cz;
      console.log(type,value,cz,id)
      const zz=[type,value,cz,id]
     var s="UPDATE device SET type=? ,value = ?,cz= ? WHERE id = ?";
     stuDao.getStuDao(s,zz,function(err,data){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
       }
    })  
    },
    serch(req,resp){
        var sql="SELECT * FROM device;";
        stuDao.getStuDao(sql,[],function(err,result){
          let queryData = JSON.stringify(result);
          console.log(queryData);
          resp.send(queryData);
   })
  },
  search(req,resp){
    const id = req.params['id'];  
    var sql="SELECT * FROM device WHERE id="+id;
    stuDao.getStuDao(sql,[],function(err,result){
      let queryData = JSON.stringify(result);
      console.log(queryData);
      resp.send(queryData);
})
  },
    delete(req,resp){
   var id=req.body.id
   console.log(id);
   var z="DELETE FROM device WHERE id="+id;
stuDao.getStuDao(z,[],function(err,result){
      resp.send({ succ:true });

})
    },
    echarts(req,resp){
      const id = req.params["id"];
      const temp = req.params["temp"];
      const humd = req.params["humd"];
      let sql = 'INSERT INTO environment VALUES(\''+ id +'\','+Date.now()+','+humd +','+temp+')';
      console.log(sql);
      stuDao.getStuDao(sql,[],function(err,result){
        //console.log(err);
        if(err){
          console.log('[UPDATE ERROR] - ',err.message);
          resp.send('修改失败');
          return;
        }
          resp.send({id:id,status:'success'});
           resp.end();
      })
    },
    echarts1(req,resp){
       const id = req.params['id'];   
      const count = req.params['count'];
      console.log(id,count)
      var sql = "SELECT * from environment WHERE id=" + id + " order by time desc limit " + count;
      console.log(sql);
      stuDao.getStuDao(sql,[],function(err,result){
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          resp.send(JSON.stringify({
            succ:false,
            msg:'查询失败！',
          }));
          return;
        }
        console.log(result)
        const resp1 = {
          id:id,
          data:result
        };
          resp.send(JSON.stringify(resp1));
           resp.end();
      })
    }
}