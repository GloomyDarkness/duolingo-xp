const BASE_URL = 'https://www.duolingo.com/2017-06-30';
const headers = {
  Authorization: `Bearer ${process.env.DUOLINGO_JWT}`,
  'Content-Type': 'application/json',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
};
const { sub } = JSON.parse(Buffer.from(process.env.DUOLINGO_JWT.split('.')[1], 'base64').toString());

(async () => {
  try {
    const { fromLanguage, learningLanguage, xpGains } = await fetch(`${BASE_URL}/users/${sub}?fields=fromLanguage,learningLanguage,xpGains`, { headers }).then(r => r.json());

    const lessons = Number(process.env.LESSONS),
      skillId = xpGains.find(x => x.skillId).skillId;

    for (const i of Array(lessons).keys()) {
      const session = await fetch(`${BASE_URL}/sessions`, {
        body: JSON.stringify({
          challengeTypes: [
            'assist', 'characterIntro', 'characterMatch', 'characterPuzzle', 'characterSelect', 'characterTrace', 'completeReverseTranslation', 'definition', 'dialogue', 'form', 'freeResponse', 'gapFill', 'judge', 'listen', 'listenComplete', 'listenMatch', 'match', 'name', 'listenComprehension', 'listenIsolation', 'listenTap', 'partialListen', 'partialReverseTranslate', 'readComprehension', 'select', 'selectPronunciation', 'selectTranscription', 'syllableTap', 'syllableListenTap', 'speak', 'tapCloze', 'tapClozeTable', 'tapComplete', 'tapCompleteTable', 'tapDescribe', 'translate', 'typeCloze', 'typeClozeTable', 'typeCompleteTable'
          ],
          fromLanguage,
          isFinalLevel: false,
          isV2: true,
          juicy: true,
          learningLanguage,
          skillId,
          smartTipsVersion: 2,
          type: 'SPEAKING_PRACTICE'
        }),
        headers,
        method: 'POST'
      }).then(r => r.json());

      const response = await fetch(`${BASE_URL}/sessions/${session.id}`, {
        body: JSON.stringify({
          ...session,
          heartsLeft: 0,
          startTime: (+new Date - 6e4) / 1e3,
          enableBonusPoints: false,
          endTime: +new Date / 1e3,
          failed: false,
          maxInLessonStreak: 9,
          shouldLearnThings: true
        }),
        headers,
        method: 'PUT'
      }).then(r => r.json());

      console.log(`🪙 | ${response.xpGain}.00 `);
    }
  } catch (error) {
    console.error('There was a problem with your fetch operation: ', error);
  }
})();
