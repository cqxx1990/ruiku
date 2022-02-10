class ReqQueue{
    constructor(){
        this.list=[];
        this.dict={};
        this.timer=0;
        this.now=Date.now();
    }
    run(){
        this.now=Date.now();
        if(!this.timer)
            this.timer=setInterval(this.__update.bind(this), 0);
    }
    clear(){
        if(this.timer){
            clearInterval(this.timer)
            this.timer=0;
        }
        this.list.length=0;
        this.dict={};
    }
    __update(){
        this.now=Date.now();

        while(this.list.length>0){
            let msgid=this.list[0];
            let obj=this.dict[msgid];
            if(this.now-obj.time>3000){
                delete this.dict[msgid];
                this.list.shift();
                if(obj.failed!=null)
                    obj.failed();
            }else{
                break;
            }
        }
    }
    wait(obj){
        this.list.push(obj.msgid);
        this.dict[obj.msgid]=obj;
        obj.time=this.now;
    }
    notify(msgid,data){
        let obj=this.dict[msgid];
        if(obj){
            let index=this.list.indexOf(msgid);
            if(index!=-1){
                this.list.splice(index,1);
            }
            if(obj.success){
                obj.success(data);
            }
            delete this.dict[msgid];
        }
    }
    resend(socket){
        for(let i=0,len=this.list.length;i<len;++i){
            let obj=this.dict[this.list[i]];
            if(obj && obj.data){
                obj.time+=200;
                socket.send(obj.data);
            }
        }
    }
}
export default ReqQueue