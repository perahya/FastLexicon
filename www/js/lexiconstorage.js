 function LexiconLocalStorage() {                
        this._my_lexicon_id = 'my_lexicon'; //nom de la base perso
        //this._all_hebrew_words_lexicon_id = 'all_hebrew_words_lexicon';
        this._all_hebrew_words_lexicon_id = 'all_hebrew';
                
        /*this.getLexicon = function(fctDone) {            
            var ls = window.localStorage;
            console.log('local storage: ' + ls);
            var myLexicon = JSON.parse(ls.getItem(keyName));                     
            fctDone(myLexicon);                      
        }*/
     
        this.getMyLexicon = function(fctDone) {            
            this.getLexiconById('my_lexicon', fctDone);                    
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
                if (lexicon != null && typeof(lexicon) != 'undefined')
                {
                    lexicon._lexicon_id = lexiconId;
                }
                fctDone(lexicon);
            }
        }
        
        this.saveLexicon = function(lexicon, fctDone) {                                      
            if (lexicon == null || typeof(lexicon) == 'undefined' ||
                lexicon._lexicon_id == null || typeof(lexicon._lexicon_id) == 'undefined' || lexicon._lexicon_id.length == 0)
            {
                console.out("lexicon not specified");
                return;
            }
            var localData = JSON.stringify(lexicon);	
            var keyName = lexicon._lexicon_id;
            window.localStorage.setItem(keyName, localData);
                        
            fctDone();
        }
};
