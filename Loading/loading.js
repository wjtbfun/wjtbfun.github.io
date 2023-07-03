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
   if (unityInstance) unityInstance.SendMessage('JSRecevier','onBackPressed',data);
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
  /*
  createUnityInstance(document.querySelector("#unity-canvas"),{
    dataUrl: "Build/InWebGL.data",
    frameworkUrl: "Build/InWebGL.framework.js",
    codeUrl: "Build/InWebGL.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "inappgame",
    productVersion: "1.0",
    // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
    // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
  },onProgress).then(onComplete).catch((e)=>{onError(e);});
  */
  createUnityInstance(document.querySelector("#unity-canvas"),{
    dataUrl: "Build/InWebGL.data",
    frameworkUrl: "Build/InWebGL.framework.js",
    codeUrl: "Build/InWebGL.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "WoonjingThinkbig",
    productName: "Brainbattle",
    productVersion: "1.0",
    // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
    // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
  },onProgress).then(onComplete).catch((e)=>{onError(e);});
}
