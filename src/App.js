import { useState,useRef,useEffect } from "react";
import user from "./assets/img/user.svg";
import ContentEditable from "react-contenteditable";
import Post from "./Components/post";

function App(props) {
  const [open, setopen] = useState(false);
  const [mydata, setmydata] = useState([]);
  const [selectedgif,setselectedgif] = useState()
  const [content,setcontent] = useState('')
  const [posts,setposts] = useState([])

  let post  = {
    content,
    gif:selectedgif
  }

  const contentref = useRef();

  useEffect(() => {
   contentref.current.el.current.focus();
  })

  const handleClick = () => {
    setopen(!open);
  };

  const handleSearch = (e) =>{
    let val = e.target.value;
     if (val.length > 3){
        fetch(`https://g.tenor.com/v1/search?q=${val}&key=A4YZJPS6QSL3&limit=3`).then((res) =>{
          return res.json()
        }).then((data) =>{
            setmydata(data.results);
        })
     }
    
    
  }
  const handleSelection = (gifurl) =>{
    console.log(gifurl)
    setselectedgif(gifurl);
    setmydata([]);
    setopen(!open);
  }

  const handleRemove = () =>{
    setselectedgif('')
  }

  const handleContetnChange = (e) =>{
      console.log(e.target.value)
      setcontent(e.target.value)
  }

  const handleCreatePost = () =>{
    setposts([post,...posts])
    setcontent('')
    setselectedgif('')
    contentref.current.el.current.focus()
  }
   

  return (
    <div className="container py-16 mx-auto bg-gray-200">
      <h1 className="text-2xl text-center my-2">{props.name}</h1>
      <div className="w-2/6 mx-auto">
        
        <div className="bg-white w-full p-5 shadow-sm break-words rounded-t-sm">
          <section className="flex flex-col">
            <div className="flex w-full">
              <img className="w-12 h-12 mr-2" src={user} alt="" />
              <ContentEditable
                ref={contentref}
                html={content}
                onChange={(e) => handleContetnChange(e)}
                className="ml-3 w-5/6 focus:outline-none"
              />
            </div>

            { selectedgif ?  <img
              onClick={() => handleRemove()}
              className="mt-10"
              src={selectedgif}
              alt=""
            />:''}
           
          </section>
        </div>
         {/* bottom bar */}
        <section className="bg-gray-300 px-3 flex items-center justify-between py-2 relative">
          <span
            onClick={() => handleClick()}
            className="bg-white border cursor-pointer border-gray-200 px-3 py-1 text-gray-500 rounded"
          >
            gif
          </span>
          <button onClick={() => handleCreatePost()} className="py-2 px-2 bg-blue-600 text-white">post</button>
          {open ? (
            <div className="w-5/6 px-3 py-2 top-12 bg-white shadow-xl absolute">
              <input
                onChange={(e) => handleSearch(e)}
                className="w-full px-1 py-2 border border-gray-300 focus:outline-none"
                type="text"
                placeholder="search gif"
              />
              {/* results section */}
              <section>

                {mydata.map((item) =>      <img
              className="mt-2"
              onClick={() => handleSelection(item.media[0].gif.url)}
              src={item.media[0].gif.url}
              alt=""
            />)  }
             
    
              </section>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
      <div className="my-10">
      { posts.map((item,index) => <Post key={index} content={item.content} gif={item.gif} />) }
          </div>
    </div>
  );
}

export default App;
