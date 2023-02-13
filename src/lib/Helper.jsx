export async function getTweetsArray(dispatchData, setLoading = () => {}){
    setLoading(true);
    try {
        const response = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet');
        const data = await response.json();
        dispatchData({ type: 'SET_TWEETS', payload: data.tweets });
    } catch (e) {
        console.log(e);
    }
    setLoading(false);
  }

export async function postTweet(tweetData, setLoading = () => {}) {
    setLoading(true);
    try{
        await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tweetData)
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
}
