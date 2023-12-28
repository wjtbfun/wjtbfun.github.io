// width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes
var unityInstance;
var ToolTipText;
ToolTipText = document.querySelector("#toolTipFont");
var urlParts = window.location.href;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function SetUpToolTip() {
  console.log("툴팁텍스트변경");
  var tooltipindex = rand(0, 4); //0부터 2까지 포함된 3개의 인덱스
  if (urlParts.includes("langCd=KO") || urlParts.includes("langCd=ko")) {
    //한글일때
    if (tooltipindex == 0) {
      ToolTipText.textContent = "브레인 배틀은 최대 4명까지 함께 즐길 수 있어.";
    }
    if (tooltipindex == 1) {
      ToolTipText.textContent = "커스터마이징을 통해 너만의 캐릭터를 꾸며봐!";
    }
    if (tooltipindex == 2) {
      ToolTipText.textContent = "빠르고 정확한 수학 실력을 뽐내봐!";
    }
    if (tooltipindex == 3) {
      ToolTipText.textContent = "브레인 배틀을 친구들과 함께 즐겨봐!";
    }
  } else {
    if (tooltipindex == 0) {
      ToolTipText.textContent ="Brain Battle can be play with up to 4 players.";
    }
    if (tooltipindex == 1) {
      ToolTipText.textContent = "Customize your own character!";
    }
    if (tooltipindex == 2) {
      ToolTipText.textContent =
        "Show off youre quick and accurate math skills!";
    }
    if (tooltipindex == 3) {
      ToolTipText.textContent = "Enjoy Brain Battle wwith friends!";
    }
  }
}

SetUpToolTip();
var intervalId = setInterval(SetUpToolTip, 1000);

function onError(exception) {
  alert(exception);
}

function onProgress(progress) {
  document.querySelector("#progress").style.width = progress * 100 + "%";
}

function onComplete(UnityInstance) {
  unityInstance = UnityInstance;
  document.querySelector("#loading").remove();
}

function onBackPressed(data) {
  if (unityInstance)
    unityInstance.SendMessage("JSRecevier", "pressBackspace", data);
}
function onBackground(data) {
  console.log("onBackground");
  if (unityInstance)
    unityInstance.SendMessage("JSRecevier", "onBackground", data);
}
function onForeground(data) {
  console.log("onForeground");
  if (unityInstance)
    unityInstance.SendMessage("JSRecevier", "onForeground", data);
}

function onCloseInAppGame(data) {
  try {
    window.android.closeInAppGame();
  } catch (e) {}
  try {
    window.webkit.messageHandlers.closeInAppGame.postMessage(null);
  } catch (e) {}
}

window.onresize = function resizeWindow(event) {
  if ((document.body.clientHeight * 3) / 4 < document.body.clientWidth)
    document.getElementById("main-container").style.width =
      document.body.clientHeight / 1.6 + "px";
  //if(document.body.clientHeight*3/4<document.body.clientWidth) document.getElementById('main-container').style.width=(document.body.clientHeight/1.7777)+'px';
  else document.getElementById("main-container").style.width = "100%";
};

window.onload = function () {
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 0);
  clearInterval(intervalId);
  createUnityInstance(
    document.querySelector("#unity-canvas"),
    {
      dataUrl: "Build/InWebGL.data.unityweb",
      frameworkUrl: "Build/InWebGL.framework.js.unityweb",
      codeUrl: "Build/InWebGL.wasm.unityweb",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "wjthinkbig",
      productName: "mathpid.brb",
      productVersion: "1.1.1",
      /*
     dataUrl: "Build/InWebGL.data.unityweb",
     frameworkUrl: "Build/InWebGL.framework.js.unityweb",
     codeUrl: "Build/InWebGL.wasm.unityweb",
     streamingAssetsUrl: "StreamingAssets",
     companyName: "WoonjingThinkbig",
     productName: "Brainbattle",
     productVersion: "1.0",
     */
    },
    onProgress
  )
    .then(onComplete)
    .catch((e) => {
      onError(e);
    });
};
