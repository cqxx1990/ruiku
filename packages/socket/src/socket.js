import YBuffer from "./YBuffer";
class Sokect{
    constructor(onmessage,onverify,onclose,onreconnect){
        this.onMessage=onmessage;
        this.websocket=null;
        this.urls="";
        this.isOver=false;
        this.onClose=onclose;
        this.onVerify=onverify;
        this.isVerify=false;
        this.onTrigerReconnect=onreconnect;
        this.buffer=new YBuffer(1024*50);
        this.__msgid=0;
        this.name="";
    }
    connect(urls,retryDelay=100){
        let that=this;
        this.urls=urls;
        let len,waits;
        len=waits=urls.length;
        for(let i=0;i<len;++i){
            let websocket= new WebSocket(this.urls[i]); 
            websocket.binaryType="arraybuffer";
            websocket.onopen = function(evt) {
                if(that.isOver) {
                    websocket.close();
                    return;
                };
                if(that.websocket){ //以及有连接了
                    websocket.close();
                    return;
                }
                that.websocket=websocket;
                that.isVerify=true;
		    	that.onVerify();
            }; 
            websocket.onclose = function(evt) {
                if(!that.isVerify){ //一个都没认证成功
                    --waits;
                    if(waits<=0){
		    		    that.websocket=null;
                        if(retryDelay>5000) retryDelay=5000;
                        if(!that.isOver)
                            setTimeout(()=>{that.reconnect(retryDelay*2);},retryDelay);
                    }
                }
                if(websocket!=that.websocket) return;
                if(that.onClose) that.onClose();
                that.buffer.clear();
                that.isVerify=false;
		    	if(that.isOver){
		    		that.websocket=null;
		    	}else{
		    		setTimeout(()=>{that.reconnect(100);},retryDelay);
		    		that.websocket=null;
		    	}
            }; 
            websocket.onmessage = function(evt) {
                if(websocket!=that.websocket) return;
                let data=evt.data;
                that.buffer.pushBuffer(data);
                that.onMessage(that.buffer);
            }; 
            websocket.onerror = function(evt) { 

            };
        }
    }
    get msgid(){
        return ++this.__msgid;
    }
    send(data){
        if(this.websocket && this.websocket.readyState==WebSocket.OPEN){
            console.log(this.name+"confirm send cmd:"+data[0]);
            this.websocket.send(data);
            return true;
        }
        return false;
    }
    close()
    {
        this.isOver=true;
        if(this.websocket)
            this.websocket.close();
    }
    reconnect(retryDelay){
        if(this.onTrigerReconnect)
            this.onTrigerReconnect();
        else
            console.log("与服务器重连");
        this.connect(this.urls,retryDelay);
    }
}
export default Sokect;