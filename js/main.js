
$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    onDeviceReady();
});

/*this.mywords = function() {        
        $("#wordsResultsList").html("");
        
        var words = window.myEngine._lexicon.getWords();
        var htmlStr = "<div id=\"nbWordsDiv\"><h4>There are " + words.length + " words in my lexicon.</h4></div>\n";
        
        htmlStr += "<p>List of words I am currently learning.\n";
        htmlStr += "<input type=\"button\" value=\"Switch Langages\" onclick=\"switchLangages();\"/></p>\n";
        
        htmlStr += "<ul id=\"wordslist\" data-role=\"listview\" class=\"ui-listview-outer\" data-filter=\"true\" data-filter-reveal=\"true\" data-filter-placeholder=\"Search words...\">\n";
        for (var i = 0, c = words.length; i < c; i++) {            
            htmlStr += renderWordStr(words[i], false);
        }       
        htmlStr += "</ul>\n";
        
        $("#wordsResultsList").append(htmlStr);
        
        var wordListJQObj = $("#mywords");                    
        
        //wordListJQObj.trigger('refresh');
        
        if (wordListJQObj.hasClass('ui-listview')) {
            wordListJQObj.listview('refresh');
        } else {
            wordListJQObj.trigger('create');                        
        }
        //$('#mywords').trigger('create');
    };*/

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
        console.log('My Engine Init 1 Ended');
       
        var wordspage = $("#mywords");       
        wordspage.on('pagebeforeshow', function() {
            if (_wordsInited == false)
                {
                    //wordListRetrieved(window.myEngine._lexicon.getOrderedWords());
                    displayWordsList(window.myEngine._lexicon.getOrderedWords());
                    _wordsInited = true;
                }
            
        });
        
               
        //testpage.on('pageshow', function() {        
        $("#testme").on('pagebeforeshow', function() {
            myWordsRevision(window.myEngine._lexicon.getExamWordsList(-1, 40));                                       
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
        
        
        
        
        $('#mainsearchfield').keyup(function(event) {
            var searchStr = $('#mainsearchfield').val();
            console.log('KEYUP: ' + searchStr);
            
            _searchResult = window.myEngine._all_hebrew_words_lexicon.searchWords(searchStr);
            
            if (_searchResult != null && typeof(_searchResult) != 'undefined' && _searchResult.length > 0){                
                /*for (var i = 0, c = searchResult.length; i < c; i++) {  
                    var w = searchResult[i];
                    console.log(w._translation);
                }*/                
               // $("#mywords").show();
                //displayWordsList(searchResult);
            }
        });
    }, 
    function() {
        console.log('My Engine Init 2 Ended');              
        
        $("#check_from_all_hebrew_words").on('pagebeforeshow', function() {            
            checkKnowledgeFromHugeDictionnary(window.myEngine._all_hebrew_words_lexicon.getExamWordsList(-1, 40));                                       
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
