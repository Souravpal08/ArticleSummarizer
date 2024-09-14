import { logo } from '../assets'

const Body = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col" >
   
 <nav className="flex justify-between items-center w-full pt-3"> 
 <img src={logo} alt="logo" className="w-28 object-contain color" />

 <button
 type='button'
 onClick={() =>  window.open('http://www.linkedin.com/in/sourav-pal-659631266', '_blank')}
    className="black_btn"
 >Find Me </button>
    </nav> 
<h1 className='mt-5 text-5xl font-extrabold'> Welcome to <span className='mt-5 text-5xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent'>
      Summize</span>👋
</h1>
 
 <h1 className='head_text'>
     <br className='max-md:hidden' />
        Summarize your article with <span className="orange_gradient">OpenAI GPT-4</span>
 </h1>
 <h2 className='desc'>
        Simplify your reading with Summize,it's an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries.
      </h2>

    </header>
  )
}

export default Body
