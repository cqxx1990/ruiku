function i(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}function t(i,t){return i(t={exports:{}},t.exports),t.exports}var s=i(t((function(i){i.exports=function(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")},i.exports.__esModule=!0,i.exports.default=i.exports}))),o=i(t((function(i){function t(i,t){for(var s=0;s<t.length;s++){var o=t[s];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(i,o.key,o)}}i.exports=function(i,s,o){return s&&t(i.prototype,s),o&&t(i,o),Object.defineProperty(i,"prototype",{writable:!1}),i},i.exports.__esModule=!0,i.exports.default=i.exports}))),e=function(){function i(){s(this,i),this.list=[],this.dict={},this.timer=0,this.now=Date.now()}return o(i,[{key:"run",value:function(){this.now=Date.now(),this.timer||(this.timer=setInterval(this.__update.bind(this),0))}},{key:"clear",value:function(){this.timer&&(clearInterval(this.timer),this.timer=0),this.list.length=0,this.dict={}}},{key:"__update",value:function(){for(this.now=Date.now();this.list.length>0;){var i=this.list[0],t=this.dict[i];if(!(this.now-t.time>3e3))break;delete this.dict[i],this.list.shift(),null!=t.failed&&t.failed()}}},{key:"wait",value:function(i){this.list.push(i.msgid),this.dict[i.msgid]=i,i.time=this.now}},{key:"notify",value:function(i,t){var s=this.dict[i];if(s){var o=this.list.indexOf(i);-1!=o&&this.list.splice(o,1),s.success&&s.success(t),delete this.dict[i]}}},{key:"resend",value:function(i){for(var t=0,s=this.list.length;t<s;++t){var o=this.dict[this.list[t]];o&&o.data&&(o.time+=200,i.send(o.data))}}}]),i}(),n=i(t((function(i){i.exports=function(i,t,s){return t in i?Object.defineProperty(i,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):i[t]=s,i},i.exports.__esModule=!0,i.exports.default=i.exports}))),h=require("iconv-lite"),r=require("buffer").Buffer,f=Math.pow(2,32),u=function(){function i(t){s(this,i),n(this,"position",void 0),n(this,"buffer",void 0),n(this,"end",void 0),this.position=0,this.end=0}return o(i,[{key:"pushBuffer",value:function(i){this.buffer=new Uint8Array(i),this.position=0,this.end=this.buffer.byteLength}},{key:"readByte",value:function(){var i=255&this.buffer[this.position];return this.position++,i}},{key:"readShort",value:function(){var i=255&this.buffer[this.position]|(255&this.buffer[this.position+1])<<8;return this.position+=2,i}},{key:"readInt",value:function(){var i=255&this.buffer[this.position]|(255&this.buffer[this.position+1])<<8|(255&this.buffer[this.position+2])<<16|(255&this.buffer[this.position+3])<<24;return this.position+=4,i}},{key:"readLong",value:function(){return(this.readInt()>>>0)+this.readInt()*f}},{key:"readFloat",value:function(){var i=this.buffer.subarray(this.position,this.position+4),t=r.from(i).readFloatLE(0);return this.position+=4,t}},{key:"readDouble",value:function(){var i=this.buffer.subarray(this.position,this.position+8),t=r.from(i).readDoubleLE(0);return this.position+=8,t}},{key:"readString",value:function(){for(var i=this.position;0!=this.buffer[i];)++i;var t=i,s=this.buffer.subarray(this.position,i);return this.position=t+1,h.decode(s,"GB18030")}},{key:"readBytes",value:function(i){var t=r.alloc(i);return this.buffer.copy(t,0,this.position,this.position+i),this.position+=i,t}},{key:"clear",value:function(){this.position=this.end=0,this.buffer&&this.buffer.fill(0,0,this.buffer.length)}},{key:"avilength",get:function(){return this.end-this.position}}]),i}(),l=function(){function i(t,o,e,n){s(this,i),this.onMessage=t,this.websocket=null,this.urls="",this.isOver=!1,this.onClose=e,this.onVerify=o,this.isVerify=!1,this.onTrigerReconnect=n,this.buffer=new u(51200),this.__msgid=0,this.name=""}return o(i,[{key:"connect",value:function(i){var t,s,o=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=this;this.urls=i,t=s=i.length;for(var h=function(i){var t=new WebSocket(o.urls[i]);t.binaryType="arraybuffer",t.onopen=function(i){n.isOver||n.websocket?t.close():(n.websocket=t,n.isVerify=!0,n.onVerify())},t.onclose=function(i){n.isVerify||--s<=0&&(n.websocket=null,e>5e3&&(e=5e3),n.isOver||setTimeout((function(){n.reconnect(2*e)}),e)),t==n.websocket&&(n.onClose&&n.onClose(),n.buffer.clear(),n.isVerify=!1,n.isOver||setTimeout((function(){n.reconnect(100)}),e),n.websocket=null)},t.onmessage=function(i){if(t==n.websocket){var s=i.data;n.buffer.pushBuffer(s),n.onMessage(n.buffer)}},t.onerror=function(i){}},r=0;r<t;++r)h(r)}},{key:"msgid",get:function(){return++this.__msgid}},{key:"send",value:function(i){return!(!this.websocket||this.websocket.readyState!=WebSocket.OPEN)&&(console.log(this.name+"confirm send cmd:"+i[0]),this.websocket.send(i),!0)}},{key:"close",value:function(){this.isOver=!0,this.websocket&&this.websocket.close()}},{key:"reconnect",value:function(i){this.onTrigerReconnect?this.onTrigerReconnect():console.log("与服务器重连"),this.connect(this.urls,i)}}]),i}(),p=require("iconv-lite"),a=require("buffer").Buffer,c=Math.pow(2,32),b=function(){function i(t){s(this,i),n(this,"position",void 0),n(this,"buffer",void 0),n(this,"length",void 0),this.position=this.length=0,this.buffer=a.alloc(t)}return o(i,[{key:"setPosition",value:function(i){this.position=i,this.position>this.length&&(this.length=this.position)}},{key:"writeByte",value:function(i){this.buffer.fill(255&i,this.position,this.position+1),++this.position,this.position>this.length&&(this.length=this.position)}},{key:"writeShort",value:function(i){this.buffer.fill(255&i,this.position,this.position+1),++this.position,this.buffer.fill(i>>8&255,this.position,this.position+1),++this.position,this.position>this.length&&(this.length=this.position)}},{key:"writeInt",value:function(i){this.buffer.fill(255&i,this.position,this.position+1),++this.position,this.buffer.fill(i>>8&255,this.position,this.position+1),++this.position,this.buffer.fill(i>>16&255,this.position,this.position+1),++this.position,this.buffer.fill(i>>24&255,this.position,this.position+1),++this.position,this.position>this.length&&(this.length=this.position)}},{key:"writeLong",value:function(i){this.buffer.fill(255&i,this.position,this.position+1),++this.position,this.buffer.fill(i>>8&255,this.position,this.position+1),++this.position,this.buffer.fill(i>>16&255,this.position,this.position+1),++this.position,this.buffer.fill(i>>24&255,this.position,this.position+1),++this.position;var t=Math.floor(i/c);this.buffer.fill(255&t,this.position,this.position+1),++this.position,this.buffer.fill(t>>8&255,this.position,this.position+1),++this.position,this.buffer.fill(t>>16&255,this.position,this.position+1),++this.position,this.buffer.fill(t>>24&255,this.position,this.position+1),++this.position,this.position>this.length&&(this.length=this.position)}},{key:"writeLong2",value:function(i,t){this.buffer.fill(255&i,this.position,this.position+1),++this.position,this.buffer.fill(i>>8&255,this.position,this.position+1),++this.position,this.buffer.fill(i>>16&255,this.position,this.position+1),++this.position,this.buffer.fill(i>>24&255,this.position,this.position+1),++this.position,this.buffer.fill(255&t,this.position,this.position+1),++this.position,this.buffer.fill(t>>8&255,this.position,this.position+1),++this.position,this.buffer.fill(t>>16&255,this.position,this.position+1),++this.position,this.buffer.fill(t>>24&255,this.position,this.position+1),++this.position,this.position>this.length&&(this.length=this.position)}},{key:"writeDouble",value:function(i){this.buffer.writeDoubleLE(i,this.position),this.position+=8,this.position>this.length&&(this.length=this.position)}},{key:"writeString",value:function(i){var t=p.encode(i,"GB18030");this.buffer.fill(t,this.position,this.position+t.length),this.position+=t.length+1,this.position>this.length&&(this.length=this.position)}},{key:"writeLenString",value:function(i,t){var s=p.encode(i,"GB18030");this.buffer.fill(s,this.position,this.position+t),this.position+=t,this.position>this.length&&(this.length=this.position)}},{key:"clear",value:function(){this.buffer.fill(0,0,this.buffer.length),this.position=this.length=0}},{key:"writeBytes",value:function(i){this.buffer.fill(i,this.position,this.position+i.length),this.position+=i.length,this.position>this.length&&(this.length=this.position)}},{key:"export",value:function(){var i=a.from(this.buffer.subarray(0,this.length));return this.clear(),i}}],[{key:"string2buffer",value:function(i){return p.encode(i,"GB18030")}}]),i}();export{e as ReqQueue,b as XBuffer,u as YBuffer,l as default};
