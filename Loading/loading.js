
// width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes
var unityInstance;

function onError(exception){
  alert(exception);
}

function onProgress(progress) {
   document.querySelector("#progress").style.width = progress * 100 + "%";
}

function onComplete(UnityInstance) {
  unityInstance = UnityInstance;
//document.querySelector("#loading").remove();
}

function onBackPressed() {
   if (unityInstance) unityInstance.SendMessage("JSRecevier","onBackPressed");
}

window.onresize = function resizeWindow(event){
  // 화면비율이 4:3보다 높이가 작으면 16:10으로 맞춤
  console.log(document.body.clientWidth,document.body.clientHeight,document.getElementById('loading').style.width,document.getElementById('loading').style.height);
  if(document.body.clientHeight*3/4<document.body.clientWidth){
    document.getElementById('main-container').style.width=(document.body.clientHeight/1.6)+'px';
    console.log(document.body.clientHeight*1.6);
  }else{
    document.getElementById('main-container').style.width='100%';
  }
}

window.onload = function(){;
  setTimeout(function(){
    window.dispatchEvent(new Event('resize'));
  },0);
  createUnityInstance(document.querySelector("#unity-canvas"),{
    dataUrl: "Build/InWebGL.data.unityweb",
    frameworkUrl: "Build/InWebGL.framework.js.unityweb",
    codeUrl: "Build/InWebGL.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "inappgame",
    productVersion: "1.0",
  },onProgress).then(onComplete).catch((e)=>{onError(e);});
}