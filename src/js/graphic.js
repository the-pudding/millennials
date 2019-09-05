/* global d3 */
let verbJoin;
let nounJoin;
let articlesJoin;

let $verbs;
let $nouns;
let $articles;

let positiveVerbs = []
let negativeVerbs = []

let allNounCount;

const allVerbs = [positiveVerbs,positiveVerbs]


function resize() {}

function addInitialData(data){
    
    return data.map(item=>({
        ...item,
        count: +item.nouns.length
    })).sort((a,b)=>(b.count-a.count))
}

function cleanData(dirtyData){
    console.log(dirtyData)
    negativeVerbs = dirtyData.filter(item=>item.avg_noun_valence < 0)
    positiveVerbs = dirtyData.filter(item=>item.avg_noun_valence > 0)

    console.log(dirtyData[0])
}

function checkNoun(noun){
    if (noun.hasOwnProperty('noun')){
        return true;
    }
    return false;
}

function generateEmoji(){
    var emojis = [
        '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
    ];
        
    return emojis[Math.floor(Math.random() * emojis.length)];    
}

function loadNounArticles(noun){
    d3.selectAll('div.main-page__articles-container').selectAll('div.article-container').remove()

    articlesJoin = d3.select('div.main-page__articles-container')
        .selectAll('div.article')
        .data(noun.articles)
        .enter()

    $articles = articlesJoin        
        .append('div')
        .attr('class', 'article-container')
        .on('click', d => window.open(d.url))   
    
        
    $articles
        .append('p')
        .attr('class','article-meta')
        .text(d=>`${d.url.split('//')[1].split('/')[0]} • ${d.pub_date}`)

    $articles
        .append('p')
        .attr('class','article-hed')
        .text(d=>d.headline)

    $articles
        .append('p')
        .attr('class','article-snippet')
        .html(d=>`<span>${d.snippet}</span>... <span class='click-more'>Click for full text</span>`)    
        
}


function setNounVisibilityClass(noun,i, wordType){
    if(checkNoun(noun)){
        if (i<6) return `noun ${wordType}`
        else return `noun ${wordType} hidden`
    }
    else{return 'expand-button'}
}

function abbreviateNoun(word){
    const abbreviatedWord = word.length > 25 ? word.slice(0,25).concat('...') : word
    return abbreviatedWord
}

function handleExpandButton(el){
    const buttonClasses = d3.select(el).attr('class')
    return buttonClasses.includes('expanded')
}

function expandNouns(el){
    d3.select(el).classed('expanded', true)
    d3.select(el).text('See fewer nouns')
    d3.select(el.parentNode).selectAll('div.noun').classed('hidden',false)
}

function contractNouns(el){
    const totalNouns = d3.select(el.parentNode).selectAll('div.noun').size()
    d3.select(el.parentNode).selectAll('div.noun').classed('hidden',(d,i)=> i<6 ? false : true)
    d3.select(el).classed('expanded', false).text(`Click for ${totalNouns} more...`)
    
}

function handleNounClick(el, noun){
    if(checkNoun(noun)){        
        loadNounArticles(noun)
    }
    else {
        const expanded = handleExpandButton(el);
        expanded ? contractNouns(el) : expandNouns(el)
    }
 
}

function fillColumn(data, wordType){
    verbJoin=d3.select(`.${wordType}.main-page__nav`)
        .selectAll(`div.verb-${wordType}`)
        .data(data)
        .enter()

    $verbs = verbJoin
        .append('div')

    $verbs.attr('class', d=>`verb-${wordType} verb verb-${d.verb}`)
        .html(d=>{
           return `<span class='verb'>${d.verb}</span> <span class='count'>${d.count}x</span>`
        })

    nounJoin = $verbs.selectAll(`div.noun-${wordType}`)
        .data(function(d){
            allNounCount = d.nouns.length;

            let nounsToAdd = d.nouns;
            
            if(allNounCount <6 ){
            }
            else d.nouns.push(`click for ${allNounCount} more...`) 
            
            return nounsToAdd;
        })
        .enter()

    $nouns= nounJoin
        .append('div')
    

    $nouns
        .attr('class',(noun,i)=>setNounVisibilityClass(noun,i,wordType))
        .text(noun=>{
            const emoji = generateEmoji()
            if(checkNoun(noun)){
                let shortNoun =abbreviateNoun(noun.noun)                
                return `${shortNoun}${emoji}`;
            }
            else return `${noun}${emoji}`
        })
        .on('click',(noun,i,n)=>handleNounClick(n[i],noun))
}


function addWords(){
    fillColumn(positiveVerbs,'positive')
    fillColumn(negativeVerbs,'negative')
}

function init() {    
  d3.json('assets/data/articles.json')
  .then(data=>addInitialData(data))
  .then(addedData=>cleanData(addedData))
  .then(()=>addWords())
}



export default { init, resize };


