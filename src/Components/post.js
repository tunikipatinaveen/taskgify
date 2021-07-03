
  const Post = (props) =>{
    return (
      <div className="bg-white w-1/4 mx-auto p-2 mb-2">
        <p className="p-1">{props.content}</p>
        <img src={props.gif} alt="" />
      </div>
    )
  }


  export default Post;