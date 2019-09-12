/* global d3 */
let $content;

let verbJoin;
let nounJoin;
let articlesJoin;

let $verb;
let $noun;
let $articles;

let $progressBar;
let backgroundBarWidthPx;
let barWidthPx;
let barUpdater;

let articleNumber;
let currentArticle = 0;

let $nounSearch;


function updateProgressBar(el){

    const $foregroundBar = d3.select(el.parentNode).select('.tooltip').select('.tooltip__progress-bar-foreground')

    $foregroundBar.style('width','0px') 

    backgroundBarWidthPx = +d3.select(el.parentNode).select('.tooltip').select('.tooltip__progress-bar-background').style('width').replace('px','')
    console.log(backgroundBarWidthPx)

    const step = backgroundBarWidthPx/100;

    let barPercentage;
    barUpdater = setInterval(updateFunction, 50);

    function updateFunction(){        

        barWidthPx = +$foregroundBar.style('width').replace('px','')
        barWidthPx += step

        if(barWidthPx === backgroundBarWidthPx){
            $foregroundBar.style('width',`${barWidthPx}px`)  
            clearInterval(barUpdater)               
                   
        }   
        $foregroundBar.style('width',`${barWidthPx}px`)                                            
    }
    
}

function updateTooltip(d, el, $tooltip, currentArticle){
    `currentArticle: ${currentArticle}`
    // show tooltip, load data
    $tooltip.classed('hidden', false)

    $tooltip.select('p.tooltip__meta')
    .text(`${d.articles[currentArticle].url.split('//')[1].split('/')[0]} • ${d.articles[currentArticle].pub_date}`)  
    
    $tooltip.select('p.tooltip__hed')
    .text(`${d.articles[currentArticle].headline}`)   

    $tooltip.select('p.tooltip__other-verbs')
    .html(()=>{
        const additionalArticles = d.articles.length>1? `<span class='noun-selected'>${generateEmoji()} ${d.noun}</span> is also found in these verbs: <span class='additional-verbs'>${d.other_verbs.join(', ')}</span>`: ``
        return additionalArticles
    })   

    const x = el.offsetLeft;
    const y = el.offsetTop;    

    $tooltip
    .style('left',`${x}px`)
    .style('top', `-10px`)

    
}



function handleMouseEnter(d){
    
    console.log(d)
    const el = this;
    const $sel = d3.select(el)
	const $selVerb = d3.select(el.parentNode);
    const $tooltip = $selVerb.select('.tooltip')

    articleNumber = d.articles.length;

    updateTooltip(d, el, $tooltip, currentArticle)    
    updateProgressBar(el)

    if (articleNumber>1){
        currentArticle+=1
        const testUpdater = setInterval(testUpdate,5000)
        let testVar = 0
        function testUpdate(){
    
            if(currentArticle===articleNumber){
                clearInterval(testUpdater)
            }
        updateTooltip(d, el, $tooltip, currentArticle)    
        updateProgressBar(el)
        currentArticle+=1
        }
    }
}

function handleMouseLeave(){

    currentArticle = 0;
    articleNumber = 0;

    clearInterval(barUpdater)

    d3.selectAll('.tooltip__progress-bar-foreground')
    .style('width','0px')

    d3.selectAll('.tooltip')
    .classed('hidden', true)    
    



    
}


function resize() {}

// function checkNoun(noun){
//     if (noun.hasOwnProperty('noun')){
//         return true;
//     }
//     return false;
// }

function generateEmoji(){
    var emojis = [
        '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
    ];
        
    return emojis[Math.floor(Math.random() * emojis.length)];    
}

function handleMouseOver(el, noun){
 
    console.log(d3.mouse(el))
    
    // .attr('')

    // let coordinates= d3.mouse(el);

    // d3.select('.tooltip')
    // .classed('hidden',false)
    // .style("left", (d3.event.pageX) + "px")		
    // .style("top", (d3.event.pageY - 28) + "px");	
}

function handleInputChange(){
    const $input = d3.select(this);
    const val = this.value.toLowerCase();

    console.log(val)
    
    $noun.style('font-size',d=>{
        if (d.noun.includes(val)){return '48px'}
        else return '14px'
    })

    $verb.classed('hidden',d=>{            
        const nounMatch = d.nounList.filter(item=>item.includes(val));
        if (nounMatch.length>=1){return false}
        else {return true}
    })


	// const start = $input.attr('data-start');
}

function addArticles(data){
    $nounSearch = d3.select('.search-noun__input')
    $nounSearch.on('keyup', handleInputChange)

    console.log(data)
    $content = d3.select('.content');


    //verbs (top-level)
    verbJoin = $content.selectAll('div')
    .data(data)
    .enter()
    
    $verb = verbJoin
    .append('div')
    .attr('class',d=>`verb-container verb-container-${d.verb}`)
    
    $verb.append('div')
    .attr('class','verb-name')
    .attr('id', d=>d.verb)
    .text(d=>d.verb)

    //tooltip:
    const $tooltip = $verb
    .append('div')
    .attr('class','tooltip hidden')

    // tooltip: progress bar
    $progressBar = $tooltip
    .append('div')
    .attr('class','tooltip__progress-bar-background')

    $progressBar
    .append('div')
    .attr('class', 'tooltip__progress-bar-foreground')

    // tooltip: text sections
    $tooltip
    .append('p')
    .attr('class','tooltip__meta');

    $tooltip
    .append('p')
    .attr('class','tooltip__hed');

    $tooltip
    .append('p')
    .attr('class','tooltip__other-verbs');

    // nouns (bottom-level)
    nounJoin = $verb
    .selectAll('span')
    .data(d=>d.nouns)
    .enter()

    $noun = nounJoin
    .append('div')
    .attr('class', 'noun')
    .text(function(d){
        return ` ${d.noun} ${generateEmoji()} · `            
    })
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .on('click', d=> window.open(d.articles[0].url))





    // .on('mouseenter', (d,i,n)=>handleMouseOver(n[i],d))
    // d3.select('body').on('mousemove',handleThing)
    // window.on('mousemove',handleThing)
    // d3.select(window).on('mousemove',handleThing)

}

function cleanData(data){
    const verbsToKeep = data[0].map(item=>item.verb);
    const allVerbs = data[1];
    const filteredVerbs = allVerbs.filter(verb=>verbsToKeep.includes(verb.verb))

    const formattedVerbs = filteredVerbs.map(verb=>({
        ...verb,
        nounList: verb.nouns.map(item=>item.noun),
        nouns: verb.nouns.map(noun=>({
            ...noun,            
            nounLevelVerb: verb.verb
        }))
    }))
    
    return formattedVerbs;
}

function init() {   
    
Promise.all([
    d3.csv("assets/data/verbs_to_include.csv"),
    d3.json("assets/data/articles_json_v2_small.json")
    ])
    .then(data=>cleanData(data))
    .then(cleanedData=>addArticles(cleanedData))
}



export default { init, resize };


