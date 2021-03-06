 function MainEngine() {       
     this._my_lexicon;
     this._words_definition_list;
     //this._all_hebrew_words_lexicon;
     this._localStorageEngine;
               
     this.init = function(fctDone) {     
        // first we initialize the words definition list
        this._words_definition_list = new LexiconDefinition(_default_hebrew_words_id);
        for (var i = 0, c = _default_hebrew_words.length; i < c; i++) {
            var w = _default_hebrew_words[i];                                                                
            var wordDefinition = new WordDefinition(w[0], _default_hebrew_words_id, w[2], w[1], w[3], 1);
            this._words_definition_list.addWordObj(wordDefinition);                
        }
        
         // then we try to load the personal lexicon from the local storage
        this._localStorageEngine = new LexiconLocalStorage();
        this._localStorageEngine.getMyLexicon(function(lexicon) {
                                    
            //var new_lexicon = new Lexicon(window.myEngine._localStorageEngine._my_lexicon_id);
            var new_lexicon = new LexiconKnowledge();            
                                
            new_lexicon.initFromKnowledgeLexicon(lexicon);                
            window.myEngine._my_lexicon = new_lexicon;
                                                                            
            // we update the personal lexicon with new words from the default hebrew words list
            var nbNewWordsAdded = 0;
            var wordsDefinitionTab = window.myEngine._words_definition_list.getWords();
            for (var i = 0, c = wordsDefinitionTab.length; i < c; i++) {    
                var wordDefinitionObj = wordsDefinitionTab[i];                                                            		
		var newWordAdded = window.myEngine._my_lexicon.addNewWord(wordDefinitionObj.getWordId(), wordDefinitionObj.getLexiconOrigin());
                if (newWordAdded)
                {                                            
                    nbNewWordsAdded++;
                }
            }
            
            // if new words have been added then we save the personal lexicon in the loacl storage
            if (nbNewWordsAdded > 0){
                window.myEngine._localStorageEngine.saveLexicon(window.myEngine._my_lexicon, function(){                    
                    console.log(nbNewWordsAdded + ' new words added, Lexicon saved');
                });
            }

            // initialization of the dictionary
            /*window.myEngine._all_hebrew_words_lexicon = new Lexicon(window.myEngine._localStorageEngine._all_hebrew_words_lexicon_id);
            for (var i = 0, c = _all_hebrew_words.length; i < c; i++) {
                var w = _all_hebrew_words[i];                
                var rank = i+1;
                var wordObj = new Word(w[0],w[1],w[2],-1,-1,rank,true);
                window.myEngine._all_hebrew_words_lexicon.addWord(wordObj);
            }*/
            fctDone();
        });
    };        
    
    this.getMyLexicon = function() {
        return this._my_lexicon;
    };
    
    this.getExamWordsList = function(minimum_knowledge_level, nb_words_max) {
        var assess_list = new Array();
        var tmp_assess_list = this.getMyLexicon().getExamWordsList(minimum_knowledge_level, nb_words_max);
        for (var i = 0, c = tmp_assess_list.length; i < c; i++) {
            var wordKnowledgeObj = tmp_assess_list[i];
            
            var wordDefinitionObj = this._words_definition_list.getWord(wordKnowledgeObj.getKey());
            if (wordDefinitionObj != 'undefined' && wordDefinitionObj != null){
                var wordToAssess = new WordToAssess(wordDefinitionObj, wordKnowledgeObj);
                assess_list.push(wordToAssess);
            }
        }
        return assess_list;
    }
};
