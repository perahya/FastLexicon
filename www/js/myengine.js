 function MainEngine() {       
     this._my_lexicon;
     this._all_hebrew_words_lexicon;
     this._localStorageEngine;
               
     this.init = function(fctDone) {      
         // we first try to load the personal lexicon from the local storage
        this._localStorageEngine = new LexiconLocalStorage();
        this._localStorageEngine.getMyLexicon(function(lexicon) {                
            var new_lexicon = new Lexicon(window.myEngine._localStorageEngine._my_lexicon_id);
                                
            new_lexicon.initFromLexicon(lexicon);                
            window.myEngine._my_lexicon = new_lexicon;
                                                                            
            // we update the personal lexicon with new words from the default hebrew words list
            var nbNewWordsAdded = 0;
            for (var i = 0, c = _default_hebrew_words.length; i < c; i++) {    
                var w = _default_hebrew_words[i];                       
                var rank = i+1;
         
		var wordObj = new Word(w[1],w[0],w[2],-1,-1,rank,false);
		var newWordAdded = window.myEngine._my_lexicon.addWord(wordObj);
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
            window.myEngine._all_hebrew_words_lexicon = new Lexicon(window.myEngine._localStorageEngine._all_hebrew_words_lexicon_id);
            for (var i = 0, c = _all_hebrew_words.length; i < c; i++) {
                var w = _all_hebrew_words[i];
                var rank = i+1;
                var wordObj = new Word(w[0],w[1],w[2],-1,-1,rank,true);
                window.myEngine._all_hebrew_words_lexicon.addWord(wordObj);
            }
            fctDone();
        });
    };        
    
    this.getMyLexicon = function() {
        return this._my_lexicon;
    };
};
