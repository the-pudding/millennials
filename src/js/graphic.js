/* global d3 */
import jump from 'jump.js';

let $content;

let verbJoin;
let nounJoin;
let articlesJoin;

let $verb;
let $noun;
let $articles;
let $separators;

let $progressBar;
let backgroundBarWidthPx;
let barWidthPx;
let barUpdater;

let articleNumber;
let currentArticle = 0;

let $nounSearch;
let $verbSelect;

let formattedVerbs;
let fixedSearchHeight;

function updateProgressBar(el){

    const $foregroundBar = d3.select(el.parentNode).select('.tooltip').select('.tooltip__progress-bar-foreground')

    $foregroundBar.style('width','0px') 

    backgroundBarWidthPx = +d3.select(el.parentNode).select('.tooltip').select('.tooltip__progress-bar-background').style('width').replace('px','')
    // console.log(backgroundBarWidthPx)

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

    
    // $noun.classed('faded',false)
}


function resize() {}

function setSentimentScroll(){
    const parentDiv = d3.select('div.content').node()

    const posHighFirstEl = d3.select('.verb-container-love').node();
    const sepPositiveHigh = document.createElement('div');
    sepPositiveHigh.className = 'separator separator__positive-high';
    sepPositiveHigh.innerHTML='😁 highly positive sentiments'
    
    const posLowFirstEl = d3.select('.verb-container-favor').node();
    const sepPositiveLow = document.createElement('div');
    sepPositiveLow.className = 'separator separator__positive-low';  
    sepPositiveLow.innerHTML = '🙂 positive sentiments';
    
    const neutralFirstEl = d3.select('.verb-container-say').node();
    const sepNeutral = document.createElement('div');
    sepNeutral.className = 'separator separator__neutral';
    sepNeutral.innerHTML = '😐 neutral sentiments';
    
    const negLowFirstEl = d3.select('.verb-container-leave').node();
    const sepNegativeLow = document.createElement('div');
    sepNegativeLow.className = 'separator separator__negative-low';
    sepNegativeLow.innerHTML = '🙁 negative sentiments'
    
    const negHighFirstEl = d3.select('.verb-container-hate').node();
    const sepNegativeHigh = document.createElement('div');
    sepNegativeHigh.className = 'separator separator__negative-high';
    sepNegativeHigh.innerHTML = '😱 highly negative sentiments'
    
    parentDiv.insertBefore(sepPositiveHigh, posHighFirstEl);
    parentDiv.insertBefore(sepPositiveLow, posLowFirstEl);
    parentDiv.insertBefore(sepNeutral, neutralFirstEl);
    parentDiv.insertBefore(sepNegativeLow, negLowFirstEl);
    parentDiv.insertBefore(sepNegativeHigh, negHighFirstEl);

    // const verbEl = d3.select(this);
    // const verbValue = verbEl.text();        
    // const scrollTarget = d3.select(`.verb-container-${verbValue}`).node()
    

    d3.select('.button-positive-high').on('click',()=>{
        scrollTo(d3.select('.separator__positive-high').node())
    })

    d3.select('.button-positive-low').on('click',()=>{
        scrollTo(d3.select('.separator__positive-low').node())
    })

    d3.select('.button-negative-low').on('click',()=>{
        scrollTo(d3.select('.separator__negative-low').node())
    })

    d3.select('.button-negative-high').on('click',()=>{
        scrollTo(d3.select('.separator__negative-high').node())
    })

    d3.select('.button-neutral').on('click',()=>{
        scrollTo(d3.select('.separator__neutral').node())
    })
}

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
    handleMouseLeave();

    if(val==''){
        $noun.style('font-size','14px')
        $verb.classed('hidden',false)
        $separators.classed('hidden', false)
        $noun.classed('faded',false)
        handleMouseLeave();
    }
    else{
        $noun.style('font-size',d=>{
            if (d.noun.includes(val)){return '48px'}
            else return '14px'
        })
        .classed('faded',d=>{
            if (d.noun.includes(val)){return false}
            else return true
        })

        $separators.classed('hidden', true)
    
        $verb.classed('hidden',d=>{           
            handleMouseLeave(); 
            const nounMatch = d.nounList.filter(item=>item.includes(val));
            if (nounMatch.length>=1){return false}
            else {return true}
        })
    }
    



	// const start = $input.attr('data-start');
}

function scrollTo(element) {
	jump(element, {
		duration: 1000,
		offset: -fixedSearchHeight
	})
}

function handleDropDown(){    
    const verbEl = d3.select(this);
    const verbValue = verbEl.text();        
    const scrollTarget = d3.select(`.verb-container-${verbValue}`).node()
    scrollTo(scrollTarget)
}

function addArticles(data){
    $nounSearch = d3.select('.search-noun__input')
    $nounSearch.on('keyup', handleInputChange)

    console.log(data.length)
    $content = d3.select('.content');
    

    //verbs (top-level)
    verbJoin = $content.selectAll('div.verb-container')
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
    .selectAll('span.noun')
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

    const verbDropDown = d3.select('.search-verb__input').node()

    const verbDropDownChoices = new Choices(verbDropDown, {
        choices: formattedVerbs.map(
          value=>({ value, label: `${value.verb}` })
        )
      })

    d3.select(verbDropDown).on('change',handleDropDown)

    setSentimentScroll()
    $separators = d3.selectAll('.separator')

    // Adjusting content to fit below fixed search bar
    fixedSearchHeight = d3.select('.fixed-search-bar').node().offsetHeight    

    d3.select('.content').style('padding-top', `${fixedSearchHeight}px`)

    // d3.select('.verb-container-favor')
    // .insert('div', '#foo')
    // .insert('div',":first-child")
    // .insert('div', '.verb-container-love + *')
    // .attr('id', 'foo');



    // .on('mouseenter', (d,i,n)=>handleMouseOver(n[i],d))
    // d3.select('body').on('mousemove',handleThing)
    // window.on('mousemove',handleThing)
    // d3.select(window).on('mousemove',handleThing)

}

function cleanData(data){
    const verbsToKeep = data[0]
    const verbsToKeepList = verbsToKeep.map(item=>item.verb);
    const allVerbs = data[1];
    const filteredVerbs = allVerbs.filter(verb=>verbsToKeepList.includes(verb.verb))
    
    formattedVerbs = filteredVerbs.map(verb=>({
        ...verb,
        nounList: verb.nouns.map(item=>item.noun),
        nouns: verb.nouns.map(noun=>({
            ...noun,            
            nounLevelVerb: verb.verb
        }))
    }))

    formattedVerbs.forEach(function(verb) {
        const result = data[0].filter(function(item) {
            return item.verb === verb.verb;
        });            
        verb.sentiment = (result[0] !== undefined) ? +result[0].sentiment_5 : null;
    });

    formattedVerbs = formattedVerbs.sort((a, b) =>  parseFloat(b.sentiment) - parseFloat(a.sentiment))
    console.log(formattedVerbs)
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


