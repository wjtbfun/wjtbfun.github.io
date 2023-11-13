(function () {
    
    //UNITY STUFF
    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/ProfessorK.loader.js";
    var config = {
        dataUrl: buildUrl + "/0b677f1f495baa36a49c4c2930a90a33.data.unityweb",
        frameworkUrl: buildUrl + "/d41d8cd98f00b204e9800998ecf8427e.js.unityweb",
        codeUrl: buildUrl + "/d41d8cd98f00b204e9800998ecf8427e.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "com.mooi",
        productName: "ProfessorK",
        productVersion: "1.0.17",
    };



    function iOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
    function isFullscreen(){
        return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
    }
    var main_container = document.querySelector("#main-container");
    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var loader= document.querySelector("#loader");
    var loaderFill= document.querySelector("#fill");
    var toggle_fullscreen=document.querySelector("#toggle_fullscreen");
    var counter= document.querySelector("#counter");
    var myGameInstance = null;

    function onProgress(progress) {
        loaderFill.style.width = progress * 100 + "%";
        counter.innerHTML = Math.round(progress * 100) + "%";
    }

    function onComplete(unityInstance) {
        myGameInstance = unityInstance;
        loader.remove();
    }
    var resizeTimeOut;
    function onWindowResize() {
        var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        canvas.height=height;
        canvas.width=width;
    }
    function onWindowResizeWithDelay(){
        clearTimeout(resizeTimeOut);
        resizeTimeOut = setTimeout(onWindowResize, 200);
    }


    var script = document.createElement("script");
    script.src = loaderUrl;
    
    script.onload = () => {
        createUnityInstance(canvas, config, onProgress)
            .then(onComplete)
            .catch((message) => {
                // alert(message);
                myGameInstance.SendMessage('LogManager', 'OnError');
        });
    };
    document.body.appendChild(script);

    window.addEventListener('resize', onWindowResizeWithDelay);
    onWindowResizeWithDelay();

    window.onBackPressed = function () {
        myGameInstance.SendMessage('LogManager', 'OnClickBackBtn');
    }
    window.onForeground = function () {
        myGameInstance.SendMessage('LogManager', 'OnForeground');
    }
    window.onBackground = function () {
        myGameInstance.SendMessage('LogManager', 'OnBackGround');
    }

})();
