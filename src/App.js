import React, {useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/newscard/NewsCards';
import useStyles from './styles';

const alanKey='763288d384cf64afd3cb7e81f3dd30a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticles,setActiveArticles] = useState(-1);
    const classes = useStyles();
  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand:({command,articles,number})=>{
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setActiveArticles(-1);
        } else if(command === 'highlight'){
          setActiveArticles((prevActiveArticle)=>prevActiveArticle+1);
        } else if(command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number,{fuzzy:true}) : number;
          const article = articles[parsedNumber - 1];
          
          if (parsedNumber >20){
            alanBtn().playText('Please try that again.');
          } else if(article){
               window.open(articles.url,'_blank');
               alanBtn().playText('Opening....');
          }
        }
      }
    })
  },[])

  return (
    <div>
       <div className={classes.logoContainer}>
         <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"></img>
       </div>
       <NewsCards articles={newsArticles} activeArticle={activeArticles}/>
    </div>
  );
}

export default App;
