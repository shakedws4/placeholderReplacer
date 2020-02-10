 //this function search for {{..}} and replace it with the param's value from the data store
 var placeholderReplacer = function(string,_data) {
    try {
      if (typeof string !== "string") return string;//do nothing
      var phraseStart, phraseEnd, param, paramVal, linkPhrase, paramStart, paramEnd, wordLength, anchorPhrase, anchorTag;
      while (string.indexOf('{{') > -1) { 
        phraseStart = string.indexOf('{{');
        phraseEnd = string.indexOf('}}');
        param = string.slice(phraseStart+2,phraseEnd);
        if (typeof _data !== "undefined") paramVal = _data[param];
        else throw new Error("no data was found");
        string = string.replace('\{{'+ param +'}}',paramVal);
      }
      //this function search for #$$PARAM$$text$$PARAM$$# and replace it with the param's links from the data store as anchore tags
      var linksReplacer = function(string) {
          var replacedKeys =[];
          var linkscounter;
          while (string.indexOf('#$$') > -1 || string.indexOf('$$#') > -1) {
            //get the entire link phrase
            phraseStart = string.indexOf('#$$');
            phraseEnd = string.indexOf('$$#'); 
            linkPhrase =string.slice(phraseStart,phraseEnd+3);
            paramStart = linkPhrase.indexOf('$$');
            paramEnd = linkPhrase.indexOf('$$',paramStart+1);
            param = linkPhrase.slice(paramStart+2,paramEnd);
            if (typeof _data !== "undefined") {
              paramVal = _data[param];
              if(replacedKeys.indexOf(param) > -1) {
                linkscounter = 2 //to prevent the same id twice
              }else {
                replacedKeys.push(param)
                linkscounter = 1
              } 
            }
            else throw new Error("no data was found");
            //replace the link phrase with an <a> tag 
            wordLength = paramEnd+2;
            anchorPhrase =linkPhrase.slice(wordLength,linkPhrase.length-wordLength);
            
            anchorTag = '<a class="Link" id="'+_data.name+'_'+param+linkscounter+'" href="'+paramVal+'" target="_blank" onclick="Obj.openLink(this.href); return false;" onfocus="this.blur()">'+anchorPhrase+'</a>';
            string = string.replace(linkPhrase,anchorTag);
            
          }
          
        return string;
      }
      string = linksReplacer(string);
      return string;

    } catch(e){
        console.log("placeholderReplacer err: " + e.message);	
      return string
    }
  
};