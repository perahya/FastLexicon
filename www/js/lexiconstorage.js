 function LexiconLocalStorage() {                
        this._my_lexicon_id = 'my_lexicon'; //nom de la base perso
        //this._all_hebrew_words_lexicon_id = 'all_hebrew_words_lexicon';
        this._all_hebrew_words_lexicon_id = 'all_hebrew';
                            
        this.getMyLexicon = function(fctDone) {            
            this.getLexiconById(this._my_lexicon_id, fctDone);                    
        } 
        
        this.getLexiconById = function(lexiconId, fctDone) {            
            if (lexiconId == null || typeof(lexiconId) == 'undefined')
            {
                fctDone('undefined');
            }
            else
            {
                var ls = window.localStorage;
                var key = lexiconId;
            
                var lexicon = JSON.parse(ls.getItem(key));                
                fctDone(lexicon);
            }
        }
        
        this.saveLexicon = function(lexicon, fctDone) {                                      
            if (lexicon == null || typeof(lexicon) == 'undefined')
            {
                console.out("lexicon not specified");
                return;
            }
            var localData = JSON.stringify(lexicon);	
            var keyName = this._my_lexicon_id;
            window.localStorage.setItem(keyName, localData);
                        
            fctDone();
        }
};
