var refFirst = false;
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
var _wordsInited = false;           

var setAnswerByRef= function(word_reference, isCorrect, isReference){
    window.myEngine.getMyLexicon().updateWordKnowledgeByReference(word_reference, isCorrect, isReference);
    window.myEngine._localStorageEngine.saveLexicon(window.myEngine.getMyLexicon(), function(){                    
        console.log('Lexicon saved');
    });
};    

var setAnswerByRefToGlobalLexicon= function(word_reference, isCorrect, isReference){
    window.myEngine._all_hebrew_words_lexicon.updateWordKnowledgeByReference(word_reference, isCorrect, isReference);
    window.myEngine._localStorageEngine.saveLexicon(window.myEngine._all_hebrew_words_lexicon, function(){                    
        console.log('Lexicon saved');
    });
};     
            
var displayWordsList = function(words){                
    var divNbWordsDom = document.getElementById("nbWordsDiv");    
    divNbWordsDom.innerHTML = "<h4>There are " + words.length + " words in my lexicon.</h4>";
                                
    //var wordListDom = document.getElementById("wordslist");    
    var wordListJQObj = $("#wordslist");
    wordListJQObj.empty();
    //wordListDom.innerHTML = '';
                
     var frag = document.createDocumentFragment();            
     for (var i = 0, c = words.length; i < c; i++) {    
    	renderWordForAdministration(frag, words[i]);                                  
    }
    //wordListDom.appendChild(frag);
    //wordListJQObj.trigger('create'); 
    wordListJQObj.append(frag);            
    wordListJQObj.trigger('create');    
    wordListJQObj.listview('refresh');
    
    $('.mybuttonedit_ref').on('click', function () { 
            var ref = $(this).attr('ref'); 
            
            var wordToEdit = window.myEngine.getMyLexicon().getWord(ref);
            if (wordToEdit != null && typeof(wordToEdit) != 'undefined')
            {
                $('#existingReferenceId').val(wordToEdit.getReferenceValue());
                $('#modifiedReferenceId').val(wordToEdit.getReferenceValue());
                $('#modifiedTranslationId').val(wordToEdit.getTranslationValue());
                $('#modifiedPronunciationId').val(wordToEdit.getPronunciationValue());
                
                $( "#popupEditWord" ).popup( "open" );
            }            
        });
        
        $('.mybuttonadd_ref').on('click', function () {             
                $('#referenceId').val('');
                $('#modifiedReferenceId').val('');
                $('#translationId').val('');
                $('#pronunciationId').val('');
                
                $( "#popupAddWord" ).popup( "open" );                  
        });
};   


var displaySearchWordsList = function(words){                
    var wordListJQObj = $("#searchwordslist");
    wordListJQObj.empty();
                
     var frag = document.createDocumentFragment();            
     for (var i = 0, c = words.length; i < c; i++) {    
    	renderWordForAdministration(frag, words[i], true);                                  
    }
    wordListJQObj.append(frag);            
    wordListJQObj.trigger('create');    
    wordListJQObj.listview('refresh');
    
    $('.mybuttonedit_ref').on('click', function () { 
            var ref = $(this).attr('ref'); 
            
            var wordToEdit = window.myEngine._all_hebrew_words_lexicon.getWord(ref);
            if (wordToEdit != null && typeof(wordToEdit) != 'undefined')
            {
                $('#existingReferenceId').val(wordToEdit.getReferenceValue());
                $('#modifiedReferenceId').val(wordToEdit.getReferenceValue());
                $('#modifiedTranslationId').val(wordToEdit.getTranslationValue());
                $('#modifiedPronunciationId').val(wordToEdit.getPronunciationValue());
                
                $( "#popupEditWord" ).popup( "open" );
            }            
        });
                
        
        $('.mybutton_add_from_dico_to_my_lexicon').on('click', function () {          
                var ref = $(this).attr('ref'); 
                var wordToEdit = window.myEngine._all_hebrew_words_lexicon.getWord(ref);
                if (wordToEdit != null && typeof(wordToEdit) != 'undefined')
                {                 
                    addWordFromDictionary(wordToEdit.getReferenceValue(), wordToEdit.getTranslationValue(), wordToEdit.getPronunciationValue());
                }
        });
};   


var displayWordListForRevision = function(wordsListJQObj, words, isFromMyPersonalLexicon){                
    console.log('display assessment - nb words:' + words.length);
                                                
    wordsListJQObj.empty();    
                
    var frag = document.createDocumentFragment();            
    for (var i = 0, c = words.length; i < c; i++) {
        var w = words[i];
        var assessReference = !w.isReferenceBetterKnown();
    	renderWord(frag, w, assessReference, isFromMyPersonalLexicon);                           
    }
    wordsListJQObj.append(frag);    
    wordsListJQObj.trigger('create');
    wordsListJQObj.listview('refresh');        
};

var myWordsRevision = function(words){                    
    var assessmentWordsListJQObj = $("#assessmentWordsList");
    displayWordListForRevision(assessmentWordsListJQObj, words, true);
    
    //$('.mybuttonknown_ref').on('touchend', function () { 
    $('.mybuttonknown_ref').on('click', function () { 
            var ref = $(this).attr('ref');             
            setAnswerByRef(ref, true, true);
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
        });
            
        $('.mybuttonunknown_ref').on('click', function () { 
            var ref = $(this).attr('ref'); 
            setAnswerByRef(ref, false, true); 
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
        });
    
        $('.mybuttonknown_tra').on('click', function () { 
            var ref = $(this).attr('ref'); 
            setAnswerByRef(ref, true, false);
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
        });
    
        $('.mybuttonunknown_tra').on('click', function () { 
            var ref = $(this).attr('ref'); 
            setAnswerByRef(ref, false, false); 
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
        });         
        
        $('.mybutton_display_train_again').on('click', function () {            
        });
        
        $('.mybutton_display_mylexicon_stats').on('click', function () { 
            
            var words = window.myEngine.getMyLexicon().getWords();
            var nbAnsweredWords = 0;
            var nbRefAnswered = 0;
            var globalRefKnowledge = 0;
            var averageRefKnowledge = 0;
            var nbTransAnswered = 0;
            var globalTransKnowledge = 0;
            var averageTransKnowledge = 0;
            for (var i = 0, c = words.length; i < c; i++) {    
                w = words[i];
                
                var refAlreadyAnswered = w.isReferenceAlreadyAnswered();
                if (refAlreadyAnswered)
                {
                    nbAnsweredWords++;
                }
                
                nbRefAnswered++;
                var refK = w.getReferenceKnowledgeValue();
                if (refK >= 1)
                {
                   refK = 1;
                }
                else
                {
                   refK = 0;
                }
                globalRefKnowledge += refK;
                
                
                var transAlreadyAnswered = w.isTranslationAlreadyAnswered();
                if (transAlreadyAnswered)
                {
                    if (refAlreadyAnswered == false)
                    {
                        nbAnsweredWords++;
                    }
                }
                
                nbTransAnswered++;
                var traK = w.getTranslationKnowledgeValue();
                if (traK >= 1)
                {
                   traK = 1;
                }
                else
                {
                    traK = 0;
                }
                globalTransKnowledge += traK;                                                             
            }
            averageRefKnowledge = globalRefKnowledge/nbRefAnswered;
            averageRefKnowledge = Math.round(averageRefKnowledge * 100);
            averageTransKnowledge = globalTransKnowledge/nbTransAnswered;
            averageTransKnowledge = Math.round(averageTransKnowledge * 100);
            
            /*if(out.innerText === undefined) out.textContent = output;
	    else out.innerText = output;*/
            var html = nbAnsweredWords + ' answered words over ' + words.length;
            if (nbRefAnswered > 0){
                html += '\nAverage reference knowledge: ' + averageRefKnowledge + ' %';
            }
            if (nbTransAnswered > 0){
                html += '\nAverage translated knowledge: ' + averageTransKnowledge + ' %';
            }
            $('#out_stats_mylexicon').html(html);   
            $( "#popupDisplayMyLexiconStatistics" ).popup( "open" );            
        });
};

var checkKnowledgeFromHugeDictionnary = function(words){                    
    var hugeDictionnaryWordsListJQObj = $("#globalCheckWordsList");
    displayWordListForRevision(hugeDictionnaryWordsListJQObj, words, false);
    
    //$('.mybuttonknown_ref').on('touchend', function () { 
    $('.mybutton_global_known_ref').on('click', function () { 
            var ref = $(this).attr('ref');             
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
            
            // update and save the word in the lexicon
            setAnswerByRefToGlobalLexicon(ref, true, true);            
        });
            
        $('.mybutton_global_unknown_ref').on('click', function () { 
            var ref = $(this).attr('ref'); 
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
            
            // update and save the word in the lexicon
            setAnswerByRefToGlobalLexicon(ref, false, true);             
        });
    
        $('.mybutton_global_known_tra').on('click', function () { 
            var ref = $(this).attr('ref'); 
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
            
            // update and save the word in the lexicon
            setAnswerByRefToGlobalLexicon(ref, true, false);            
        });
    
        $('.mybutton_global_unknown_tra').on('click', function () { 
            var ref = $(this).attr('ref'); 
            var parent = $(this).parent().parent().parent();
            parent.addClass("ui-screen-hidden");
            
            // update and save the word in the lexicon
            setAnswerByRefToGlobalLexicon(ref, false, false);             
        });          
        
        $('.mybutton_display_stats').on('click', function () { 
            
            var words = window.myEngine._all_hebrew_words_lexicon.getWords();
            var nbAnsweredWords = 0;
            var nbRefAnswered = 0;
            var globalRefKnowledge = 0;
            var averageRefKnowledge = 0;
            var nbTransAnswered = 0;
            var globalTransKnowledge = 0;
            var averageTransKnowledge = 0;
            for (var i = 0, c = words.length; i < c; i++) {    
                w = words[i];
                
                var refAlreadyAnswered = w.isReferenceAlreadyAnswered();
                if (refAlreadyAnswered)
                {
                    nbAnsweredWords++;
                    nbRefAnswered++;
                    globalRefKnowledge += w.getReferenceKnowledgeValue();
                }
                
                var transAlreadyAnswered = w.isTranslationAlreadyAnswered();
                if (transAlreadyAnswered)
                {
                    if (refAlreadyAnswered == false)
                    {
                        nbAnsweredWords++;
                    }
                    nbTransAnswered++;
                    globalTransKnowledge += w.getTranslationKnowledgeValue();
                }
                                             
            }
            averageRefKnowledge = globalRefKnowledge/nbRefAnswered;
            averageRefKnowledge = Math.round(averageRefKnowledge * 100) / 100;
            averageTransKnowledge = globalTransKnowledge/nbTransAnswered;
            averageTransKnowledge = Math.round(averageTransKnowledge * 100) / 100;
            
            /*if(out.innerText === undefined) out.textContent = output;
	    else out.innerText = output;*/
            var html = nbAnsweredWords + ' answered words over ' + words.length;
            if (nbRefAnswered > 0){
                html += '\nAverage reference knowledge: ' + averageRefKnowledge;
            }
            if (nbTransAnswered > 0){
                html += '\nAverage translated knowledge: ' + averageTransKnowledge;
            }
            $('#out_stats').html(html);   
            $( "#popupDisplayStatistics" ).popup( "open" );            
        });
};


function addWord(reference, translation, pronunciation){
    if (reference == null || (typeof(reference) == 'undefined') || reference.length == 0 ||
        translation == null || (typeof(translation) == 'undefined') || translation.length == 0)
    {
        return;
    }
    
    if (pronunciation == null || (typeof(pronunciation) == 'undefined'))
    {
        pronunciation = '';
    }
    
    var rank = window.myEngine.getMyLexicon().getNbWords() + 1;
    var wordObj = new Word(reference,translation,pronunciation,-1,-1,rank,false);
    
    window.myEngine.getMyLexicon().addWord(wordObj);
    window.myEngine._localStorageEngine.saveLexicon(window.myEngine.getMyLexicon(), 
        function(){                    
            console.log('Lexicon saved');
            var wordListJQObj = $("#wordslist");
            //var wordListDom = document.getElementById("wordslist");    
            var frag = document.createDocumentFragment();                    
            renderWordForAdministration(frag, wordObj, refFirst, true);                               
            //wordListDom.appendChild(frag);
            var divNbWordsDom = document.getElementById("nbWordsDiv");
            divNbWordsDom.innerHTML = "<h4>There are " + window.myEngine.getMyLexicon().getWords().length + " words in my lexicon.</h4>";            
            
            wordListJQObj.append(frag);
            wordListJQObj.trigger('create');
            wordListJQObj.listview('refresh');
            
            var html = 'Word added and saved in my lexicon';            
            $('#out_administration').html(html);   
            var mypop = $( "#popupAdministrationDisplayMessage" );
            mypop.popup( "open" );
            mypop.fadeOut(3000);
        });
};

function addWordFromDictionary(reference, translation, pronunciation){
    if (reference == null || (typeof(reference) == 'undefined') || reference.length == 0 ||
        translation == null || (typeof(translation) == 'undefined') || translation.length == 0)
    {
        return;
    }
    
    if (pronunciation == null || (typeof(pronunciation) == 'undefined'))
    {
        pronunciation = '';
    }
    
    var rank = window.myEngine.getMyLexicon().getNbWords() + 1;
    var wordObj = new Word(reference,translation,pronunciation,-1,-1,rank,true);
    
    window.myEngine.getMyLexicon().addWord(wordObj);
    window.myEngine._localStorageEngine.saveLexicon(window.myEngine.getMyLexicon(), 
        function(){                    
            console.log('Lexicon saved');
            _wordsInited = false;
            
            var html = 'Word added and saved in my lexicon';            
            $('#out_dictionary').html(html);   
            var mypop = $( "#popupDictionaryDisplayMessage" );
            mypop.popup( "open" );
            mypop.fadeOut(3000);
        });
};


function editWord(existingReference, modifiedReference, modifiedTranslation, modifiedPronunciation){
    if (existingReference == null || (typeof(existingReference) == 'undefined') || existingReference.length == 0 ||
        modifiedReference == null || (typeof(modifiedReference) == 'undefined') || modifiedReference.length == 0 ||
        modifiedTranslation == null || (typeof(modifiedTranslation) == 'undefined') || modifiedTranslation.length == 0)
    {
        return;
    }
    
    if (modifiedPronunciation == null || (typeof(modifiedPronunciation) == 'undefined'))
    {
        modifiedPronunciation = '';
    }
   
    var modifiedWord = new Word(modifiedReference,modifiedTranslation,modifiedPronunciation,-1,-1);
    var wordEdited = window.myEngine.getMyLexicon().editWord(existingReference,modifiedWord);
    if (wordEdited){
        // we remove the existing list item
        var liIdentifier = '#li_' + existingReference;
        liIdentifier = liIdentifier.replace(/\s/g,'_');
        liIdentifier = liIdentifier.replace(/\./g,'');
        liIdentifier = liIdentifier.replace(/\'/g,'');
        liIdentifier = liIdentifier.replace(/\!/g,'');
        liIdentifier = liIdentifier.replace(/\?/g,'');
        liIdentifier = liIdentifier.replace(/\"/g,'');
        var existingLi = $(liIdentifier);
        existingLi.remove();
                
        // and we add the modified one
        var wordListJQObj = $("#wordslist");
 
        var frag = document.createDocumentFragment();                    
        renderWordForAdministration(frag, modifiedWord, refFirst, false);                               

        wordListJQObj.append(frag);
        wordListJQObj.trigger('create');
        wordListJQObj.listview('refresh');
        
        window.myEngine._localStorageEngine.saveLexicon(window.myEngine.getMyLexicon(), 
            function(){                    
                console.log('Word modified and lexicon saved');
                var html = 'Word saved in my lexicon';            
                $('#out_administration').html(html);   
                var mypop = $( "#popupAdministrationDisplayMessage" );
                mypop.popup( "open" );
                mypop.fadeOut(3000);
        });
    }
};
            
  function renderWord(wordListDom, w, refFirst, isFromMyPersonalLexicon) {

      if (isFromMyPersonalLexicon == null || (typeof(isFromMyPersonalLexicon) == 'undefined'))
                {
                    isFromMyPersonalLexicon = true;
                }

                var li = document.createElement("li");
                
                li.setAttribute("data-iconpos", "right");
                li.setAttribute("data-shadow", "false");
                li.setAttribute("data-corners", "false");
                li.setAttribute("data-inset", "false");
                li.setAttribute("style", "padding:0px 0px 0px 0px;");
                
                var div = document.createElement("div");
                div.setAttribute("data-role", "collapsible");
                
                /*var lastUpdateDate = w.getLastUpdateDate();
                var result = 'new';
                if (lastUpdateDate != null && typeof(lastUpdateDate) != 'undefined')
                {
                    year = lastUpdateDate.getFullYear();
                    month = lastUpdateDate.getMonth();
                
                    d = lastUpdateDate.getDate();                                
                    h = lastUpdateDate.getHours();
                    if(h<10)
                    {
                        h = "0"+h;
                    }
                    m = lastUpdateDate.getMinutes();
                    if(m<10)
                    {
                        m = "0"+m;
                    }
                    s = lastUpdateDate.getSeconds();
                    if(s<10)
                    {
                        s = "0"+s;
                    }
                    result = ''+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
                }*/
                
                if (refFirst){
                    //div.innerHTML = "<h4>" + w.getReferenceValue() + " - K: " + ((w.getBestKnowledgeValue()+w.getWorseKnowledgeValue())/2) + " - " + result + "</h4>";                                        
                    div.innerHTML = "<h4>" + w.getReferenceValue() + "</h4>";
                    var divTrad = document.createElement("div");
                    divTrad.setAttribute("data-role", "collapsible");                               
                    divTrad.innerHTML = "<h4>" + w.getTranslationValue() + "</h4>\n<p>" + w.getPronunciationValue() + "</p>";
                } 
                else{
                    //div.innerHTML = "<h4>" + w.getTranslationValue() + " - K: " + ((w.getBestKnowledgeValue()+w.getWorseKnowledgeValue())/2) + " - " + result + "</h4>";                    
                    div.innerHTML = "<h4>" + w.getTranslationValue() + "</h4>";                    
                    var divTrad = document.createElement("div");
                    divTrad.setAttribute("data-role", "collapsible");                               
                    divTrad.innerHTML = "<h4>" + w.getReferenceValue() + "</h4>\n<p>" + w.getPronunciationValue() + "</p>";
                }
                
                div.appendChild(divTrad);
                
                var divButton = document.createElement("div");
                
                var buttonKnown = document.createElement("button");
                if (refFirst)
                {
                    if (isFromMyPersonalLexicon){                        
                        buttonKnown.setAttribute('class', 'mybuttonknown_ref');                
                    }
                    else{
                        buttonKnown.setAttribute('class', 'mybutton_global_known_ref');
                    }
                }
                else
                {                    
                    if (isFromMyPersonalLexicon){                        
                        buttonKnown.setAttribute('class', 'mybuttonknown_tra');                
                    }
                    else{
                        buttonKnown.setAttribute('class', 'mybutton_global_known_tra');
                    }
                }
                buttonKnown.setAttribute('ref', w.getReferenceValue());
                var t = document.createTextNode("I know it!");
                buttonKnown.appendChild(t);
                                
                var buttonUnknown = document.createElement("button");                
                if (refFirst)
                {                              
                    if (isFromMyPersonalLexicon){                        
                        buttonUnknown.setAttribute('class', 'mybuttonunknown_ref');                
                    }
                    else{
                        buttonUnknown.setAttribute('class', 'mybutton_global_unknown_ref');
                    }
                }
                else
                {                    
                    if (isFromMyPersonalLexicon){                        
                        buttonUnknown.setAttribute('class', 'mybuttonunknown_tra');                
                    }
                    else{
                        buttonUnknown.setAttribute('class', 'mybutton_global_unknown_tra');
                    }
                }                
                buttonUnknown.setAttribute('ref', w.getReferenceValue());
                var t = document.createTextNode("I don't know this word :(");
                buttonUnknown.appendChild(t);
                
                divButton.appendChild(buttonKnown);
                divButton.appendChild(buttonUnknown);
                div.appendChild(divButton);
                
                li.appendChild(div);
                wordListDom.appendChild(li);                                                                            
           };              
    
function renderWordForAdministration(wordListDom, w, isFromDico) {    
    var li = document.createElement("li");
    li.setAttribute("data-iconpos", "right");
    li.setAttribute("data-shadow", "false");
    li.setAttribute("data-corners", "false");
    li.setAttribute("data-inset", "false");    
    li.setAttribute("style", "padding:0px 0px 0px 0px;");
    
    var liIdentifier = 'li_' + w.getReferenceValue();
    liIdentifier = liIdentifier.replace(/\s/g,'_');  
    liIdentifier = liIdentifier.replace(/\./g,'');
    liIdentifier = liIdentifier.replace(/\'/g,'');
    liIdentifier = liIdentifier.replace(/\!/g,'');
    liIdentifier = liIdentifier.replace(/\?/g,'');
    liIdentifier = liIdentifier.replace(/\"/g,'');
    li.setAttribute("id", liIdentifier);
                
    var div = document.createElement("div");
    div.setAttribute("data-role", "collapsible");
                
    var lastUpdateDate = w.getLastUpdateDate();
    var result = 'new';
    if (lastUpdateDate != null && typeof(lastUpdateDate) != 'undefined')
    {
        year = lastUpdateDate.getFullYear();
        month = lastUpdateDate.getMonth();
                
        d = lastUpdateDate.getDate();                                
        h = lastUpdateDate.getHours();
        if(h<10)
        {
            h = "0"+h;
        }
        m = lastUpdateDate.getMinutes();
        if(m<10)
        {
            m = "0"+m;
        }
        s = lastUpdateDate.getSeconds();
        if(s<10)
        {
            s = "0"+s;
        }
        result = ''+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
    }
                    
    div.innerHTML = "<h4>" + w.getReferenceValue() + " - K: " + ((w.getBestKnowledgeValue()+w.getWorseKnowledgeValue())/2) + " - " + result + "</h4>";                    
    var divTrad = document.createElement("div");
    divTrad.setAttribute("data-role", "collapsible");                               
    divTrad.innerHTML = "<h4>" + w.getTranslationValue() + "</h4>\n<p>" + w.getPronunciationValue() + "</p>";
    div.appendChild(divTrad);
                
    var divButton = document.createElement("div");
                                    
    if (isFromDico)
    {
        var buttonEdit = document.createElement("button");
        buttonEdit.setAttribute('class', 'mybutton_add_from_dico_to_my_lexicon');                
        buttonEdit.setAttribute('ref', w.getReferenceValue());
        var t = document.createTextNode("Add to my lexicon");
        buttonEdit.appendChild(t);                
        divButton.appendChild(buttonEdit);
    }
    else
    {
        var buttonEdit = document.createElement("button");
        buttonEdit.setAttribute('class', 'mybuttonedit_ref');                
        buttonEdit.setAttribute('ref', w.getReferenceValue());
        var t = document.createTextNode("Edit");
        buttonEdit.appendChild(t);                
        divButton.appendChild(buttonEdit);
    }
    
    div.appendChild(divButton);
                
    li.appendChild(div);
    wordListDom.appendChild(li);
};

      
      
