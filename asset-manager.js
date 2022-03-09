export default function AssetManager() {
    var successCount = 0;
    var errorCount = 0;
    var imageStorage = {};
    var downloadQueue = [];

    function queueDownload(path) {
        downloadQueue.push(path);
    }

    function getAsset(path) {
        return imageStorage[path];
    }

    function isDone() {
        return (downloadQueue.length == successCount + errorCount);
    }

    function downloadAll(downloadCallback) {
        if (downloadQueue.length === 0) {
            downloadCallback();
        }
        
        for (var i = 0; i < downloadQueue.length; i++) {
            var path = downloadQueue[i];
            var img = new Image();

            img.addEventListener('load', function() {
                successCount += 1;
                
                if (isDone()) {
                    downloadCallback();
                }

            }, false);
            
            img.addEventListener('error', function() {
                errorCount += 1;
                
                if (isDone()) {
                    downloadCallback();
                }
            }, false);

            img.src = path;
            imageStorage[path] = img;
        }
    }

    return {
        getAsset,
        queueDownload,
        downloadAll
    }
}