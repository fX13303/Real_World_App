import React, {useState, useEffect} from "react";
import axios from "axios";
// import GetAnArticle from "./article";
import { getAnArticle } from "../api/article";
import { Link } from "react-router-dom";

function EditArticle() {
  let [tagLists, setTagList] = useState([])
  const handleInputChangeTag = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target
      event.target.value = ''
      setTagList([...tagLists, value])
    }
    setArticle({...article, tagList: tagLists})
  }
  const token = localStorage.getItem("token")
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [] 
 });

    const path = window.location.pathname.split('/');
    useEffect(() => {
        getAnArticle(`/articles/${path[2]}`).then((res) => setArticle(res.data.article));
      }, []);
  const handleEditArticle = async ()  => {
    // console.log(article)
    const put = await axios.put(`https://api.realworld.io/api/articles/${path[2]}`, 
      {"article": article},
      {
        headers: {
            "Accept": "application/json",
          "Authorization": "Token " + token,
          "Content-Type": "application/json"
        }
      }
    )
      return put;
  }
  const handleInputChange = (event) => {
    const {name, value} = event.target
    setArticle({...article, [name]: value})
  }
  // console.log(article)
  return (
    <div className="editor-page">
    <div className="container page">
        <div className="row">

            <div className="col-md-10 offset-md-1 col-xs-12">
                <form>
                    <fieldset>
                        <fieldset className="form-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Article Title" name="title" onChange={handleInputChange} value={article.title}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" className="form-control" placeholder="What's this article about?" name="description" onChange={handleInputChange} value={article.description}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea className="form-control" rows="8"
                                      placeholder="Write your article (in markdown)" name="body" onChange={handleInputChange} value={article.body}></textarea>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" className="form-control" placeholder="Enter tags" name="tagList" onKeyPress={handleInputChangeTag}/>
                            <div className="tag-list">
                              {tagLists.map(tag => 
                              <span className="tag-default tag-pill"><i className="ion-close-round"></i>{tag}</span>
                              )}
                            </div>
                        </fieldset>
                        <Link to='/'>
                        <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handleEditArticle}>
                            Publish Article
                        </button>
                        </Link>
                        
                    </fieldset>
                </form>
            </div>

        </div>
    </div>
</div>
  );
}
export default EditArticle;
