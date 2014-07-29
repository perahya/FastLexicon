// object representing a word definition
function WordDefinition(id, origin, reference, translation, pronunciation, difficulty_level) {        
    // word id
    this._id = id;
    // origin of the word (from which list does it come from ?)
    this._origin = origin;
    // reference word
    this._ref = reference;        
    // translation
    this._tra = translation;
    // pronunciation
    this._pro = pronunciation;
    // difficulty level 
    this._difficulty_level = difficulty_level;
    
    // definition id is the pair value composed by the id and the origin
    this.getDefinitionId = function() {                                                 
        return this.getOrigin() + '_' + this.getId();
    };
        
    this.getId = function() {                                                 
        return this._id;
    };
        
    this.hasId = function() {                                                 
        var id = this.getId();
        return (id != null && id != 'undefined' && id.length > 0);
    };
        
    this.getOrigin = function() {                                                 
        return this._origin;
    };
        
    this.hasOrigin = function() {                                                 
        var ori = this.getOrigin();
        return (ori != null && ori != 'undefined' && ori.length > 0);
    };
        
    this.getReferenceValue = function() {                                                 
        return this._ref;
    };
        
    this.hasReferenceValue = function() {                                                 
        var ref = this.getReferenceValue();
        return (ref != null && ref != 'undefined' && ref.length > 0);
    };
        
    this.getTranslationValue = function() {                                                 
        return this._tra;
    };
        
    this.hasTranslationValue = function() {                                                 
        var trans = this.getTranslationValue();
        return (trans != null && trans != 'undefined' && trans.length > 0);
    };
        
    this.getPronunciationValue = function() {                                                 
        return this._pro;
    };
        
    this.hasPronunciationValue = function() {                                                 
        var pronunciation = this.getPronunciationValue();
        return (pronunciation != null && pronunciation != 'undefined' && pronunciation.length > 0);
    };                
        
    this.hasSameDefinitionValues = function(word) {                                     
        if (word == null || typeof(word) == 'undefined'){
            return false;
        }
        else{
            return ( (this.getReferenceValue() == word.getReferenceValue()) && 
                     (this.getTranslationValue() == word.getTranslationValue()) &&
                     (this.getPronunciationValue() == word.getPronunciationValue()) );
        }
    };
};

// object representing the knowledge on a word
function WordKnowledge(definition_id, reference_knowledge_level, translation_knowledge_level, last_reference_update_date, last_translation_update_date, nb_reference_success, nb_reference_fail, nb_translation_success, nb_translation_fail) {        
    // word definition id
    this._definition_id = definition_id;        
    // knowledge level of the reference
    this._ref_kw_lev = reference_knowledge_level;
    if (this._ref_kw_lev == null || this._ref_kw_lev == 'undefined'){
        this._ref_kw_lev = -1;
    }
    // knowledge level of the translation
    this._tra_kw_lev = translation_knowledge_level;
    if (this._tra_kw_lev == null || this._tra_kw_lev == 'undefined'){
        this._tra_kw_lev = -1;
    }
    // last revision date on the reference
    this._last_ref_update_date = last_reference_update_date;        
    // last revision date on the translation
    this._last_tra_update_date = last_translation_update_date;
    // number of time the reference was well answered    
    this._nb_ref_succ = nb_reference_success;
    if (this._nb_ref_succ == null || this._nb_ref_succ == 'undefined'){
        this._nb_ref_succ = 0;
    }
    // number of time the reference was not correctly answered    
    this._nb_ref_fail = nb_reference_fail;
    if (this._nb_ref_fail == null || this._nb_ref_fail == 'undefined'){
        this._nb_ref_fail = 0;
    }
    // number of time the translation was well answered    
    this._nb_tra_succ = nb_translation_success;
    if (this._nb_tra_succ == null || this._nb_tra_succ == 'undefined'){
        this._nb_tra_succ = 0;
    }
    // number of time the translation was not correctly answered    
    this._nb_tra_fail = nb_translation_fail;  
    if (this._nb_tra_fail == null || this._nb_tra_fail == 'undefined'){
        this._nb_tra_fail = 0;
    }
    
    this.getDefinitionId = function() {                                                 
        return this._definition_id;
    };
    
    this.hasDefinitionId = function() {                                                 
        var id = this.getDefinitionId();
        return (id != null && id != 'undefined' && id.length > 0);
    };
        
    this.isReferenceBetterKnown = function() {                                                            
        return (this.getReferenceKnowledgeValue() > this.getTranslationKnowledgeValue());            
    };
        
    this.isKnowledgeValueIdenticalForReferenceAndTranslation = function() {                                                            
        return (this.getReferenceKnowledgeValue() == this.getTranslationKnowledgeValue());            
    };
        
    this.getBestKnowledgeValue = function() {                    
        var ref = this.getReferenceKnowledgeValue();
        var tra = this.getTranslationKnowledgeValue();
            
        if (ref > tra){
            return ref;
        }
        else{
            return tra;
        }
    };
        
    this.getWorseKnowledgeValue = function() { 
        var ref = this.getReferenceKnowledgeValue();
        var tra = this.getTranslationKnowledgeValue();
        if (ref < tra){
            return ref;
        }
        else{
            return tra;
        }
    };
                
    this.getReferenceKnowledgeValue = function() {                                     
        if (this._ref_kw_lev == null || typeof(this._ref_kw_lev) == 'undefined'){
            this._ref_kw_lev = -1;                
        }
          
        return this._ref_kw_lev;
    };
        
    this.setReferenceKnowledgeValue = function(val) {                                     
        if (val != null && typeof(val) != 'undefined' && val >= -1){
            this._ref_kw_lev = val;                
        }
    };
        
    this.getTranslationKnowledgeValue = function() {                                     
        if (this._tra_kw_lev == null || typeof(this._tra_kw_lev) == 'undefined'){
            this._tra_kw_lev = -1;                
        }
            
        return this._tra_kw_lev;
    };
        
    this.setTranslationKnowledgeValue = function(val) {                                     
        if (val != null && typeof(val) != 'undefined' && val >= -1){
            this._tra_kw_lev = val;                
        }
    };
        
    this.hasReferenceUpdateDate = function() {                                     
        var updateDate = this.getLastReferenceUpdateDate();
        return (updateDate != null && updateDate != 'undefined');
    };
        
    this.hasTranslationUpdateDate = function() {                                     
        var updateDate = this.getLastTranslationUpdateDate();
        return (updateDate != null && updateDate != 'undefined');
    };
        
    this.getLastReferenceUpdateDate = function() {                                     
        return this._last_ref_update_date;
    };
        
    this.getLastTranslationUpdateDate = function() {                                     
        return this._last_tra_update_date;
    };
        
    this.updateKnowledge = function(isKnown, isReference) {        
        if (isKnown != null && typeof(isKnown) != 'undefined' 
            && isReference != null && typeof(isReference) != 'undefined') {                                
            if (isReference){
                var refKnowledge = this.getReferenceKnowledgeValue();
                if (isKnown){                        
                    if (refKnowledge == -1){
                        // case where the word was answered for the first time
                        refKnowledge = 1;
                    }
                    else{
                        refKnowledge += 1;    
                    }                                                                   
                }
                else{
                    refKnowledge = 0;                        
                }
                this.setReferenceKnowledgeValue(refKnowledge);
                var d = new Date();
                this._last_ref_update_date = d;
                if (isKnown == false && this.isTranslationAlreadyAnswered()){
                    // in case of error for reference check we downgrade also the translation knowledge value
                    this.setTranslationKnowledgeValue(0);
                    this._last_tra_update_date = d;
                }                        
            }
            else{        
                var transKnowledge = this.getTranslationKnowledgeValue();
                if (isKnown){
                    if (transKnowledge == -1){
                        transKnowledge = 1;   
                    }
                    else{
                        transKnowledge += 1;    
                    }                                        
                }
                else{
                    transKnowledge = 0;
                }
                this.setTranslationKnowledgeValue(transKnowledge);
                var d = new Date();
                this._last_tra_update_date = d;
                if (isKnown == false && this.isReferenceAlreadyAnswered()){
                    // in case of error for translation check we downgrade also the reference knowledge value
                    this.setReferenceKnowledgeValue(0);
                    this._last_ref_update_date = d;
                }
            }                
        }        
    };
        
    this.isReferenceAlreadyAnswered = function() {                                                             
        return (this.getReferenceKnowledgeValue() >= 0);
    };                
        
    this.isTranslationAlreadyAnswered = function() {                                                             
        return (this.getTranslationKnowledgeValue() >= 0);
    };
        
    this.getLastUpdateDate = function() {                    
        if ((this.hasTranslationUpdateDate() == false) && (this.hasReferenceUpdateDate() == false)){
            return;
        }
        else{
            if (this.hasReferenceUpdateDate() == false){
                return new Date(this.getLastTranslationUpdateDate());
            }
            else{
                var tradDate = new Date(this.getLastTranslationUpdateDate());
                var refDate = new Date(this.getLastReferenceUpdateDate());
                if (tradDate > refDate){
                    return tradDate;
                }
                else{
                    return refDate;
                }
            }
        }                        
    };             
};

// knowledge statistics on a selection of words
function LexiconKnowledge() {
    this._lastComputedExamList;
    
    this._wordsKnowledgeH = new HashTable({});
                
    this.addNewWords = function(words) {                            
        if (words == null || typeof(words) != 'undefined'){
            if (this._wordsKnowledgeH == null || typeof(this._wordsKnowledgeH) == 'undefined'){
                this._wordsKnowledgeH = new HashTable({});
            }
            for (var i = 0, c = words.length; i < c; i++) {    
                var w = words[i];                    
                this.addNewWord(w.getDefinitionId());                
            }
        }
    };
        
    this.initFromKnowledgeLexicon = function(knowledge_lexicon) {                            
        if (knowledge_lexicon != null && typeof(knowledge_lexicon) != 'undefined'){
            if (knowledge_lexicon._wordsKnowledgeH != null && typeof(knowledge_lexicon._wordsKnowledgeH) != 'undefined'){
                this._wordsKnowledgeH = new HashTable({});                        
                if ( (typeof(knowledge_lexicon._lastComputedExamList) != 'undefined') && 
                   (knowledge_lexicon._lastComputedExamList != null) ){
                    this._lastComputedExamList = new Date(knowledge_lexicon._lastComputedExamList);
                }
    
                var items = knowledge_lexicon._wordsKnowledgeH.items;                                        
                for (var p in items) {
                    if (items.hasOwnProperty(p)) {
                        var w = items[p];
                        var newW = new WordKnowledge(w._definition_id, w._ref_kw_lev, w._tra_kw_lev, w._last_ref_update_date, w._last_tra_update_date, w._nb_ref_succ, w._nb_ref_fail, w._nb_tra_succ, w._nb_tra_fail);                           
                        this.addWord(newW);
                    }
                }                                      
            }
        }
    };
        
    this.getWord = function(definition_id) {        
        if (definition_id != null && typeof(definition_id) != 'undefined' && definition_id.length > 0) {
            var existing_word = this._wordsKnowledgeH.getItem(definition_id);
            return existing_word;
        }
        else{
            return 'undefined';
        }            
    };
        
    this.addNewWord = function(definition_id) {        
        if (definition_id != null && typeof(definition_id) != 'undefined') {                
            var existing_word_knowledge = this._wordsKnowledgeH.getItem(definition_id);
            if (existing_word_knowledge == null || typeof(existing_word_knowledge) == 'undefined') {   
                var word_knowledge = new WordKnowledge(definition_id);
                this._wordsKnowledgeH.setItem(definition_id, word_knowledge);            
                return true;
            }                
        }
        return false;
    };
        
    this.addWord = function(word_knowledge) {        
        if (word_knowledge != null && typeof(word_knowledge) != 'undefined' && word_knowledge.hasDefinitionId()) { 
            var definition_id = word_knowledge.hasDefinitionId();
            var existing_word_knowledge = this._wordsKnowledgeH.getItem(definition_id);
            if (existing_word_knowledge == null || typeof(existing_word_knowledge) == 'undefined') {                       
                this._wordsKnowledgeH.setItem(definition_id, word_knowledge);            
                return true;
            }                
        }
        return false;
    };                                
        
    this.updateWordKnowledge = function(definition_id, isKnown, isReference) {        
        if (definition_id != null && typeof(definition_id) != 'undefined' && isKnown != null && typeof(isKnown) != 'undefined' 
                && isReference != null && typeof(isReference) != 'undefined') {
               
            var word_knowledge = this._wordsKnowledgeH.getItem(definition_id);
            if (word_knowledge == null || typeof(word_knowledge) == 'undefined') {
                word_knowledge = new WordKnowledge(definition_id);
            }
                
            word_knowledge.updateKnowledge(isKnown, isReference);                                
            this._wordsKnowledgeH.setItem(definition_id, word_knowledge);               
        }        
    };                  
        
        this.getWords = function() {        
            return this._wordsKnowledgeH.values();
        };                      
        
        this.getNbWords = function() {        
            return this.getWords().length;
        };
                  
               
    this.getExamWordsList = function(minimum_knowledge_level, nb_words_max) {        
        var assess_list = new Array();                         
        if (minimum_knowledge_level == null || typeof(minimum_knowledge_level) == 'undefined' ||
            minimum_knowledge_level < 0){
            assess_list = new Array();
            var words = this.getWords();
            for (var i = 0, c = words.length; i < c; i++) {    
                w = words[i];                    
                assess_list.push(w);                                    
            }
        }else{            
            assess_list = new Array();
            var words = this.getWords();
            for (var i = 0, c = words.length; i < c; i++) {    
                w = words[i];
                if (w.getWorseKnowledgeValue() < minimum_knowledge_level){
                    assess_list.push(w);
                }                
            }
        }
        
        if (this._lastComputedExamList != 'undefined' && this._lastComputedExamList != null)
        {
            var now = new Date();
            var diff = now.getTime() - this._lastComputedExamList.getTime();
            // convert to minutes
            diff = Math.round((diff/1000)/60);
            if (diff < 60){            
                var tmpArray = new Array();
                for (var i = 0, c = assess_list.length; i < c; i++) {    
                    w = assess_list[i];
                    if ( (typeof(w.getLastUpdateDate()) == 'undefined') || 
                         (w.getLastUpdateDate() < this._lastComputedExamList) ){
                        tmpArray.push(w);
                    }
                    else{
                        console.log('word bypassed:' + w.getReferenceValue());
                    }
                }
                assess_list = tmpArray;
            }
        }
            
        assess_list.sort(function(a, b){      
            if (a.getWorseKnowledgeValue() < b.getWorseKnowledgeValue()){
                return -1;
            }
            else{
                if (a.getWorseKnowledgeValue() > b.getWorseKnowledgeValue()){
                    return 1;
                }
                else{
                    if (a.getBestKnowledgeValue() < b.getBestKnowledgeValue()){
                        return -1;
                    }
                    else{
                        if (a.getBestKnowledgeValue() > b.getBestKnowledgeValue()){
                            return 1;
                        }
                        else{
                            if (a.getWorseKnowledgeValue() < b.getWorseKnowledgeValue()){
                                    return -1;
                                }
                                else{
                                    if (a.getWorseKnowledgeValue() > b.getWorseKnowledgeValue()){
                                        return 1;
                                    }
                                    else{
                                        if (a.getBestKnowledgeValue() < b.getBestKnowledgeValue()){
                                            return -1;
                                        }
                                        else{
                                            if (a.getBestKnowledgeValue() > b.getBestKnowledgeValue()){
                                                return 1;
                                            }
                                            else{
                                                if (typeof(a.getLastUpdateDate()) == 'undefined' && 
                                                    typeof(b.getLastUpdateDate()) == 'undefined'){
                                                    return -1;
                                                }  
                                                else{
                                                    if (typeof(a.getLastUpdateDate()) == 'undefined'){
                                                        return -1;
                                                    }
                                                    else{
                                                        if (typeof(b.getLastUpdateDate()) == 'undefined'){
                                                            return 1;
                                                        }else{
                                                            if (a.getLastUpdateDate() < b.getLastUpdateDate()){
                                                                return -1;
                                                            }else{
                                                                if (a.getLastUpdateDate() > b.getLastUpdateDate()){
                                                                    return 1;
                                                                }else{
                                                                    return 0;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });       
            
            if (nb_words_max == null || typeof(nb_words_max) == 'undefined'){
                return assess_list;
            }
            else{
                if (nb_words_max < 1 || nb_words_max > assess_list.length){
                    return assess_list;
                }
                else{
                    var nbMostOldWords = Math.round(50*nb_words_max/100);
                    var nbMostUnknownWords = nb_words_max - nbMostOldWords;
                    
                    // we slect first the most unknown words
                    var subMostUnknown = assess_list.slice(0,nbMostUnknownWords);
                                        
                    // then we select some words among the oldest one
                    var oldOnes = assess_list.slice(nbMostUnknownWords,assess_list.length);
                    oldOnes.sort(function(a,b){
                        if (typeof(a.getLastUpdateDate()) == 'undefined' && 
                            typeof(b.getLastUpdateDate()) == 'undefined'){
                            return -1;
                        }  
                        else{
                            if (typeof(a.getLastUpdateDate()) == 'undefined'){
                                return 1;
                            }
                            else{
                                if (typeof(b.getLastUpdateDate()) == 'undefined'){
                                    return -1;
                                }else{
                                    if (a.getLastUpdateDate() < b.getLastUpdateDate()){
                                        return -1;
                                    }else{
                                    if (a.getLastUpdateDate() > b.getLastUpdateDate()){
                                        return 1;
                                    }else{
                                        return 0;
                                    }
                                }
                            }
                        }
                    }});
                    
                    var subMostOld = oldOnes.slice(0,nbMostOldWords);
                    
                    // we concatenate most unknown words with most old ones
                    var sub = subMostUnknown.concat(subMostOld);
                    
                    // and then we scramble the words
                    sub.sort(function(){
                        return Math.round(Math.random()) - 0.5;
                    });
                    
                    this._lastComputedExamList = new Date();
                    
                    return sub;
                }
            }
        };        
        
        this.getJSONformat = function() {        
            var words =  this.getWords();
            var res = JSON.stringify(words);            
            return res;
        };
        
        this.getTxtFormat = function() {        
            var words =  this.getWords();
            var res;
            for (var i = 0, c = 34; i < c; i++) {    
                var w = words[i];
                res += w.getReferenceValue() + "\t" + w.getTranslationValue() + "\t" + w.getPronunciationValue() + "\n";
            }
            return res;
        };
};



function Lexicon(lexicon_id) {
        this._lastComputedExamList;
        //this._words = words;
        this._wordsH = new HashTable({});
        if (lexicon_id != null && typeof(lexicon_id) != 'undefined')
        {
            this._lexicon_id = lexicon_id;
        }
        
        this.initWords = function(words) {                            
            if (words == null || typeof(words) != 'undefined'){
                if (this._wordsH == null || typeof(this._wordsH) == 'undefined'){
                    this._wordsH = new HashTable({});
                }
                for (var i = 0, c = words.length; i < c; i++) {    
                    var w = words[i];
                    this.addWord(w);                
                }
            }
        };
        
        this.initFromLexicon = function(lexicon) {                            
            if (lexicon != null && typeof(lexicon) != 'undefined' && 
                lexicon._lexicon_id != null && typeof(lexicon._lexicon_id) != 'undefined' &&
                lexicon._lexicon_id.length > 0){
                if (lexicon._wordsH != null && typeof(lexicon._wordsH) != 'undefined'){
                    this._wordsH = new HashTable({});    
                    this._lexicon_id = lexicon._lexicon_id;
                    if ( (typeof(lexicon._lastComputedExamList) != 'undefined') && 
                            (lexicon._lastComputedExamList != null) ){
                        this._lastComputedExamList = new Date(lexicon._lastComputedExamList);
                    }
                        
                    var item = lexicon._wordsH.items;                                        
                    for (var p in item) {
                        if (item.hasOwnProperty(p)) {
                            var w = item[p];
                            var newW = new Word(w._ref,w._tra,w._pro,w._ref_kw_lev,
                                w._tra_kw_lev,w._rank,w._imp,w._last_ref_update_date,w._last_tra_update_date);                           
                            this.addWord(newW);
                        }
                    }                                      
                }
            }
        };
        
        this.getWord = function(wordReference) {        
            if (wordReference != null && typeof(wordReference) != 'undefined' && wordReference.length > 0) {
                var existing_word = this._wordsH.getItem(wordReference);
                return existing_word;
            }
            else{
                return 'undefined';
            }            
        };
        
        this.addWord = function(word) {        
            if (word != null && typeof(word) != 'undefined' && word.hasReferenceValue()) {
                var existing_word = this._wordsH.getItem(word.getReferenceValue());
                if (existing_word == null || typeof(existing_word) == 'undefined') {                                    
                    this._wordsH.setItem(word.getReferenceValue(), word);            
                    return true;
                }
                else if (existing_word.hasSameDefinitionValues(word) == false){
                    this._wordsH.removeItem(word.getReferenceValue());
                    this._wordsH.setItem(word.getReferenceValue(), word);
                    return true;
                }
            }
            return false;
        };
        
        this.editWord = function(existingReference, modifiedWord) {        
            if (existingReference != null && typeof(existingReference) != 'undefined' && existingReference.length > 0 &&
                modifiedWord != null && typeof(modifiedWord) != 'undefined' && modifiedWord.hasReferenceValue()
                && modifiedWord.hasTranslationValue()) {
                var existing_word = this._wordsH.getItem(existingReference);
                if (existing_word != null && typeof(existing_word) != 'undefined') {
                    this._wordsH.removeItem(existingReference);
                    modifiedWord.setRank(existing_word.getRank());
                    modifiedWord.setDictionaryImportValue(existing_word.isImportedFromDictionary());
                }
                this._wordsH.setItem(modifiedWord.getReferenceValue(), modifiedWord);
                return true;                
            }
            return false;
        };
        
        
        
        this.updateWordKnowledge = function(word, isKnown, isReference) {        
            if (word != null && typeof(word) != 'undefined' && isKnown != null && typeof(isKnown) != 'undefined' 
                    && isReference != null && typeof(isReference) != 'undefined') {
                
                word.updateKnowledge(isKnown, isReference);                                
                this._wordsH.setItem(word.getReferenceValue(), word);               
            }        
        };
        
        this.updateWordKnowledgeByReference = function(word_reference, isKnown, isReference) {        
            if (word_reference != null && typeof(word_reference) != 'undefined' && isKnown != null && typeof(isKnown) != 'undefined' 
                    && isReference != null && typeof(isReference) != 'undefined') {                
                
                var existing_word = this._wordsH.getItem(word_reference);
                if (existing_word != null && typeof(existing_word) != 'undefined') {                                                        
                    this.updateWordKnowledge(existing_word, isKnown, isReference) ;
                }                                
            }        
        };        
        
        this.getWords = function() {        
            return this._wordsH.values();
        };      
        
        this.searchWords = function(searchStr) {        
            if (searchStr != null && typeof(searchStr) != 'undefined' && searchStr.length > 1){
                var words = this.getWords();                
                var regex = new RegExp(searchStr,"gi");
                var resultArray  = $.grep(words, function(item){                    
                    return (regex.test(item.getReferenceValue()) || regex.test(item.getTranslationValue()));
                });

                return resultArray;
            }
            else{
                return new Array();
            }
        };
        
        this.getNbWords = function() {        
            return this.getWords().length;
        };
        
        this.getOrderedWords = function() {        
            var orderedwords = this._wordsH.values();
            
            orderedwords.sort(function(a,b){
                if (a.getTranslationValue() < b.getTranslationValue()){
                    return -1;
                }
                else if (a.getTranslationValue() > b.getTranslationValue()){
                    return 1;
                }
                else{
                    return 0;
                }
            });
            
            return orderedwords;
        };                  
               
    this.getExamWordsList = function(minimum_knowledge_level, nb_words_max) {        
        var assess_list = new Array();                         
        if (minimum_knowledge_level == null || typeof(minimum_knowledge_level) == 'undefined' ||
            minimum_knowledge_level < 0){
            assess_list = new Array();
            var words = this.getWords();
            for (var i = 0, c = words.length; i < c; i++) {    
                w = words[i];                    
                assess_list.push(w);                                    
            }
        }else{            
            assess_list = new Array();
            var words = this.getWords();
            for (var i = 0, c = words.length; i < c; i++) {    
                w = words[i];
                if (w.getWorseKnowledgeValue() < minimum_knowledge_level){
                    assess_list.push(w);
                }                
            }
        }
        
        if (this._lastComputedExamList != 'undefined' && this._lastComputedExamList != null)
        {
            var now = new Date();
            var diff = now.getTime() - this._lastComputedExamList.getTime();
            // convert to minutes
            diff = Math.round((diff/1000)/60);
            if (diff < 60){            
                var tmpArray = new Array();
                for (var i = 0, c = assess_list.length; i < c; i++) {    
                    w = assess_list[i];
                    if ( (typeof(w.getLastUpdateDate()) == 'undefined') || 
                         (w.getLastUpdateDate() < this._lastComputedExamList) ){
                        tmpArray.push(w);
                    }
                    else{
                        console.log('word bypassed:' + w.getReferenceValue());
                    }
                }
                assess_list = tmpArray;
            }
        }
            
        assess_list.sort(function(a, b){      
            if (a.getWorseKnowledgeValue() < b.getWorseKnowledgeValue()){
                return -1;
            }
            else{
                if (a.getWorseKnowledgeValue() > b.getWorseKnowledgeValue()){
                    return 1;
                }
                else{
                    if (a.getBestKnowledgeValue() < b.getBestKnowledgeValue()){
                        return -1;
                    }
                    else{
                        if (a.getBestKnowledgeValue() > b.getBestKnowledgeValue()){
                            return 1;
                        }
                        else{
                            if (a.getWorseKnowledgeValue() < b.getWorseKnowledgeValue()){
                                    return -1;
                                }
                                else{
                                    if (a.getWorseKnowledgeValue() > b.getWorseKnowledgeValue()){
                                        return 1;
                                    }
                                    else{
                                        if (a.getBestKnowledgeValue() < b.getBestKnowledgeValue()){
                                            return -1;
                                        }
                                        else{
                                            if (a.getBestKnowledgeValue() > b.getBestKnowledgeValue()){
                                                return 1;
                                            }
                                            else{
                                                if (typeof(a.getLastUpdateDate()) == 'undefined' && 
                                                    typeof(b.getLastUpdateDate()) == 'undefined'){
                                                    return -1;
                                                }  
                                                else{
                                                    if (typeof(a.getLastUpdateDate()) == 'undefined'){
                                                        return -1;
                                                    }
                                                    else{
                                                        if (typeof(b.getLastUpdateDate()) == 'undefined'){
                                                            return 1;
                                                        }else{
                                                            if (a.getLastUpdateDate() < b.getLastUpdateDate()){
                                                                return -1;
                                                            }else{
                                                                if (a.getLastUpdateDate() > b.getLastUpdateDate()){
                                                                    return 1;
                                                                }else{
                                                                    return 0;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });       
            
            if (nb_words_max == null || typeof(nb_words_max) == 'undefined'){
                return assess_list;
            }
            else{
                if (nb_words_max < 1 || nb_words_max > assess_list.length){
                    return assess_list;
                }
                else{
                    var nbMostOldWords = Math.round(50*nb_words_max/100);
                    var nbMostUnknownWords = nb_words_max - nbMostOldWords;
                    
                    // we slect first the most unknown words
                    var subMostUnknown = assess_list.slice(0,nbMostUnknownWords);
                                        
                    // then we select some words among the oldest one
                    var oldOnes = assess_list.slice(nbMostUnknownWords,assess_list.length);
                    oldOnes.sort(function(a,b){
                        if (typeof(a.getLastUpdateDate()) == 'undefined' && 
                            typeof(b.getLastUpdateDate()) == 'undefined'){
                            return -1;
                        }  
                        else{
                            if (typeof(a.getLastUpdateDate()) == 'undefined'){
                                return 1;
                            }
                            else{
                                if (typeof(b.getLastUpdateDate()) == 'undefined'){
                                    return -1;
                                }else{
                                    if (a.getLastUpdateDate() < b.getLastUpdateDate()){
                                        return -1;
                                    }else{
                                    if (a.getLastUpdateDate() > b.getLastUpdateDate()){
                                        return 1;
                                    }else{
                                        return 0;
                                    }
                                }
                            }
                        }
                    }});
                    
                    var subMostOld = oldOnes.slice(0,nbMostOldWords);
                    
                    // we concatenate most unknown words with most old ones
                    var sub = subMostUnknown.concat(subMostOld);
                    
                    // and then we scramble the words
                    sub.sort(function(){
                        return Math.round(Math.random()) - 0.5;
                    });
                    
                    this._lastComputedExamList = new Date();
                    
                    return sub;
                }
            }
        };        
        
        this.getJSONformat = function() {        
            var words =  this.getWords();
            var res = JSON.stringify(words);            
            return res;
        };
        
        this.getTxtFormat = function() {        
            var words =  this.getWords();
            var res;
            for (var i = 0, c = 34; i < c; i++) {    
                var w = words[i];
                res += w.getReferenceValue() + "\t" + w.getTranslationValue() + "\t" + w.getPronunciationValue() + "\n";
            }
            return res;
        };
};
        
