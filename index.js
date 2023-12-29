const headers={
  Authorization:`Bearer ${process.env.DUOLINGO_JWT}`,
  'Content-Type':'application/json',
  'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
},
{sub}=JSON.parse(Buffer.from(process.env.DUOLINGO_JWT.split('.')[1], 'base64').toString());

let totalXp = 0;

const sendToDiscord = async (webhookUrl, message) => {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: message,
      username: 'Duolingo - Xp',
      avatar_url: 'https://th.bing.com/th/id/OIP.sEBFvfASegiUc95lVyvwRAHaHa?rs=1&pid=ImgDetMain'
    })
  });
};

(async()=>{
  const {fromLanguage,learningLanguage,xpGains}=await fetch(`https://www.duolingo.com/2017-06-30/users/${sub}?fields=fromLanguage,learningLanguage,xpGains`,{headers}).then(r=>r.json());

  const lessons=Number(process.env.LESSONS),
  skillId=xpGains.find(x=>x.skillId).skillId;
  
  for(const i of Array(lessons).keys()){
    const session=await fetch('https://www.duolingo.com/2017-06-30/sessions',{
      body:JSON.stringify({
        challengeTypes:[
          'assist','characterIntro','characterMatch','characterPuzzle','characterSelect','characterTrace','completeReverseTranslation','definition','dialogue','form','freeResponse','gapFill','judge','listen','listenComplete','listenMatch','match','name','listenComprehension','listenIsolation','listenTap','partialListen','partialReverseTranslate','readComprehension','select','selectPronunciation','selectTranscription','syllableTap','syllableListenTap','speak','tapCloze','tapClozeTable','tapComplete','tapCompleteTable','tapDescribe','translate','typeCloze','typeClozeTable','typeCompleteTable'
        ],
        fromLanguage,
        isFinalLevel:false,
        isV2:true,
        juicy:true,
        learningLanguage,
        skillId,
        smartTipsVersion:2,
        type:'SPEAKING_PRACTICE'
      }),
      headers,
      method:'POST'
    }).then(r=>r.json());
    
    const response=await fetch(`https://www.duolingo.com/2017-06-30/sessions/${session.id}`,{
      body:JSON.stringify({
        ...session,
        heartsLeft:0,
        startTime:(+new Date-6e4)/1e3,
        enableBonusPoints:false,
        endTime:+new Date/1e3,
        failed:false,
        maxInLessonStreak:9,
        shouldLearnThings:true
      }),
      headers,
      method:'PUT'
    }).then(r=>r.json());
    
    totalXp += response.xpGain;
    console.log(`🪙 | ${response.xpGain}.00 `);

    if (totalXp % 1000 === 0) {
      await sendToDiscord(process.env.DISCORD_WEBHOOK, `🎉 Parabéns! Você ganhou ${totalXp} XP no Duolingo! ⭐ Continue assim!`);
    }
  }
})()
