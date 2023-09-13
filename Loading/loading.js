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
  document.querySelector("#loading").remove();
}

function onBackPressed(data){
   if (unityInstance) unityInstance.SendMessage('JSRecevier','pressBackspace',data);
}

function onCloseInAppGame(data){
  try{ window.android.closeInAppGame(); }catch(e){}
  try{ window.webkit.messageHandlers.closeInAppGame.postMessage(null); }catch(e){}
}

window.onresize = function resizeWindow(event){
  if(document.body.clientHeight*3/4<document.body.clientWidth) document.getElementById('main-container').style.width=(document.body.clientHeight/1.6)+'px';
  else document.getElementById('main-container').style.width='100%';
}

window.onload = function(){;
  setTimeout(function(){
    window.dispatchEvent(new Event('resize'));
  },0);
  createUnityInstance(document.querySelector("#unity-canvas"), {
    dataUrl: "Build/InWebGL.data.unityweb",
    frameworkUrl: "Build/InWebGL.framework.js.unityweb",
    codeUrl: "Build/InWebGL.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "WoonjingThinkbig",
    productName: "Brainbattle",
    productVersion: "1.0",
/*
    dataUrl: "Build/InWebGL.data.unityweb",
    frameworkUrl: "Build/InWebGL.framework.js.unityweb",
    codeUrl: "Build/InWebGL.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "WoonjingThinkbig",
    productName: "Brainbattle",
    productVersion: "1.0",
    */
  },onProgress).then(onComplete).catch((e)=>{onError(e);});
}
