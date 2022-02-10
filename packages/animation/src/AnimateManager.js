let Engine={
    queue:[],
    timer:0,
    isRunning:false,
    register(runner){
        if(this.queue.indexOf(runner)!=-1)
            return;
        this.queue.push(runner);
        this.run();
    },
    unregister(runner){
        let index=this.queue.indexOf(runner);
        if(index==-1) return;
        this.queue.splice(index,1);
        if(this.queue.length<1){
            this.stop();
        }
    },
    run(){
        if(this.isRunning) return;
        this.isRunning=true;
        this.timer=Date.now();
        requestAnimationFrame(this.update.bind(this));
    },
    stop(){
        if(!this.isRunning) return;
        this.isRunning=false;
    },
    update(){
        if(!this.isRunning) return;
        let now=Date.now();
        let dt=now-this.timer;
        this.timer=now;
        let list=this.queue.concat();
        for(let i=0,len=list.length;i<len;++i){
            list[i].update(dt);
        }
        requestAnimationFrame(this.update.bind(this));
    }
}
class BaseAnimate{
    constructor(){
        this.time=0;
        this.totalTime=0;
        this.isComplete=false;
        this.callback=null;
    }
    duration(time){
        this.totalTime=time;
        return this;
    }
    start(){
        Engine.register(this);
    }
    update(dt){
        
    }
    onComplete(callback){
        this.callback=callback;
        return this;
    }
    stop(){
        if(this.isComplete) return;
        Engine.register(this);
    }
}
export class MoveAnimate extends BaseAnimate{
    constructor(target){
        super();
        this.target=target;
        this.ox=this.target.offsetLeft;
        this.oy=this.target.offsetTop;
        this.dx=this.ox;
        this.dy=this.oy;
        this.isFromCurrent=false;
    }
    startFrom(x,y){
        this.target.style.left=x+"px";
        this.target.style.top=y+"px";
        this.ox=x;
        this.oy=y;
        this.isFromCurrent=false;
        return this;
    }
    startFromCurrent(){
        this.isFromCurrent=true;
        return this;
    }
    moveto(x,y){
        this.dx=x;
        this.dy=y;
        return this;
    }
    start(){
        if(this.isFromCurrent){
            this.ox=this.target.offsetLeft;
            this.oy=this.target.offsetTop;
        }
        super.start();
    }
    update(dt){
        this.time+=dt;
        if(this.time>this.totalTime){
            if(this.callback) this.callback();
            this.target.style.left=this.dx+"px";
            this.target.style.top=this.dy+"px";
            Engine.unregister(this);
            this.isComplete=true
        }else{
            let x=Math.floor((this.dx-this.ox)*this.time/this.totalTime+this.ox);
            let y=Math.floor((this.dy-this.oy)*this.time/this.totalTime+this.oy);
            this.target.style.left=x+"px";
            this.target.style.top=y+"px";
        }
    }
}
export class WaitAnimate extends BaseAnimate{
    constructor(){
        super();
    }
    update(dt){
        this.time+=dt;
        if(this.time>this.totalTime){
            if(this.callback) this.callback();
            this.callback=null;
            Engine.unregister(this);
            this.isComplete=true
        }
    }
}
export class ScrollAnimate extends BaseAnimate{
  constructor(target){
    super();
    this.target=target;
    this.oleft=this.target.scrollLeft;
    this.otop=this.target.scrollTop;
    this.dleft=this.oleft;
    this.dtop=this.otop;
  }
  scrollTo(left,top){
    this.dleft=left;
    this.dtop=top;
    return this;
  }
  update(dt){
    this.time+=dt;
    if(this.time>this.totalTime){
        if(this.callback) this.callback();
        this.target.scrollLeft=this.dleft;
        this.target.scrollTop=this.dtop;
        Engine.unregister(this);
        this.isComplete=true
    }else{
        let left=Math.floor((this.dleft-this.oleft)*this.time/this.totalTime+this.oleft);
        let top=Math.floor((this.dtop-this.otop)*this.time/this.totalTime+this.otop);
        this.target.scrollLeft=left;
        this.target.scrollTop=top;
    }
}
}
export class AnimateGroup{
    constructor(){
        this.callback=null;
        this.oncancle=null;
        this.stepCallBack=null;
        this.index=0;
        this.queue=[];
        this.isRunning=false;
        this.runner=null;
    }
    onComplete(callback){
        this.callback=callback;
        return this;
    }
    onCancle(callback){
        this.oncancle=callback;
        return this;
    }
    addAnimate(animate){
        this.queue.push(animate);
        return this;
    }
    start(){
        if(this.isRunning) return;
        this.isRunning=true;
        this.next();
    }
    next(){
        if(this.stepCallBack) this.stepCallBack();
        this.stepCallBack=null;
        if(!this.isRunning) return;
        if(this.index>=this.queue.length){
            this.isRunning=false;
            if(this.callback) this.callback();
            this.callback=null;
            return;
        }
        this.runner=this.queue[this.index++];
        if(this.runner){
            this.stepCallBack=this.runner.callback;
            this.runner.callback=this.next.bind(this);
            this.runner.start();
        }else{
            this.next();
        }
    }
    stop(){
        this.isRunning=false;
        if(this.runner) this.runner.stop();
        this.runner=null;
        for(let i=this.index,len=this.queue.length;i<len;++i){
            this.queue[i].stop();
        }
        this.queue.length=0;
        if(this.oncancle) this.oncancle();
        this.oncancle=null;
    }
}