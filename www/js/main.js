
$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    onDeviceReady();
});


function onDeviceReady() {

    console.log("Ready");
    $(window).bind('pageshow resize orientationchange', function(e) { // resize page if needed
        maxHeight();
    });

    maxHeight();
    
    var PERSISTENT;
    if (typeof(LocalFileSystem) === 'undefined') {
        var PERSISTENT = window.PERSISTENT;
    } 
    else {
        PERSISTENT = LocalFileSystem.PERSISTENT ;
    }
    
    //window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(PERSISTENT, 0, gotFS, fail);
                      
    //var _wordsInited = false;   
    var _searchProcess;
    
    window.myEngine = new MainEngine();
    window.myEngine.init(function() {
        
        // administration page listing all the words contained into the lexicon
        var wordspage = $("#mywords");       
        wordspage.on('pagebeforeshow', function() {
            if (_wordsInited == false)
                {
                    displayWordsList(window.myEngine.getMyLexicon().getOrderedWords());
                    _wordsInited = true;
                }
            
        });
           
        // revision page
        $("#testme").on('pagebeforeshow', function() {
            myWordsRevision(window.myEngine.getMyLexicon().getExamWordsList(-1, 40));                                       
        });    
        
        $("#mysearch").on('pagebeforeshow', function() {
            $('#mysearchfield').keyup(function(event) {
                if (_searchProcess != null && typeof(_searchProcess) != 'undefined'){ 
                    clearTimeout(_searchProcess);
                }
                
                _searchProcess=setTimeout(function(){performSearch()},1500);
                function performSearch(){
                    var searchStr = $('#mysearchfield').val();
                    console.log('KEYUP: ' + searchStr);
            
                    var searchResult = window.myEngine._all_hebrew_words_lexicon.searchWords(searchStr);
            
                    if (searchResult != null && typeof(searchResult) != 'undefined'){                
                        displaySearchWordsList(searchResult);
                    }
                }               
            });        
        });                                        
    });              
}

function gotFS(fileSystem) {
    //fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
    console.log('got fs:' + fileSystem);
    console.log(fileSystem.name);
    console.log(fileSystem.root.name);
    //fileSystem.root.getFile("test_write.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);  
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    }


function fail(evt){
    console.log(evt.target.error.code);
}




function maxHeight() {

    var w = $(window).height();
    var cs = $('div[data-role="content"]');
    for (var i = 0, max = cs.length; i < max; i++) {
        var c = $(cs[i]);
        var h = $($('div[data-role="header"]')[i]).outerHeight(true);
        var f = $($('div[data-role="footer"]')[i]).outerHeight(true);
        var c_h = c.height();
        var c_oh = c.outerHeight(true);
        var c_new = w - h - f - c_oh + c_h;
        var total = h + f + c_oh;
        if (c_h < c.get(0).scrollHeight) {
            c.height(c.get(0).scrollHeight);
        } else {
            c.height(c_new);
        }
    }

}

function showAlert(message, title) {
    if (window.navigator.notification) {
        window.navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}
