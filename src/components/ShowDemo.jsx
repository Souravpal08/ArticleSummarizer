
import { useState, useEffect } from "react";
import {copy, linkIcon, loader, tick} from "../assets";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLazyGetSummaryQuery} from "../services/article.js";


const ShowDemo = () => {
  const [article, setArticle] = useState({
    url:'',
    summary:''
   });

   const [allArticles, setAllArticles] = useState([]);
    const [coppied, setCoppied] = useState("");

   const [getSummary, { error, isFetching}] = useLazyGetSummaryQuery();

   useEffect(()=>{
   const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles')
  )

   if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
   }
   },[]);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await getSummary({articleUrl: article.url});
    //Fetch summary
   if(data?.summary){
    const newArticle = {...article, summary: data.summary};
    
    //Save article
    const updatedALLArticles = [...allArticles, newArticle];

    setArticle(newArticle);
    setAllArticles(updatedALLArticles);

    localStorage.setItem('articles', JSON.stringify(updatedALLArticles));
   }

    toast.success(" Generated successfully😁");

  }

  const handleCopy = (copyUrl) => {
    setCoppied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCoppied(false);
    }, 2000);
    };
    
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
};

const handleDelete = (index) => {
  const updatedAllArticles = allArticles.filter((_, i) => i !== index);
  setAllArticles(updatedAllArticles);
  localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
  toast.success("Item deleted 🤫");
};
   


  return  (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Enter thr URL (e.g. https://example.com)'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={coppied === item.url ? tick : copy}
                  alt={"copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <button
                  className='delete_btn text-red-500 font-bold'
                  onClick={() => handleDelete(index)}
                >
                  Remove
                </button>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

   

export default ShowDemo

