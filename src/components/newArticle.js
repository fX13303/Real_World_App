import React, {useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faXmark} from "@fortawesome/free-solid-svg-icons"

function NewArticle() {
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
  const deleteTags = async (e) => {
    tagLists.splice(e.target.closest(".tag-pill").id, 1)
    console.log(tagLists)
    setTagList(tagLists)
    e.target.closest(".tag-pill").classList.add('disabled')
  }
  const handlePostArticle = async ()  => {
    console.log(article)
    const post = await axios.post('https://api.realworld.io/api/articles', 
      {"article": article},
      {
        headers: {
          "Authorization": "Token " + token,
          "Content-Type": "application/json"
        }
      }
    )
      return post;
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
                              {tagLists.map((tag, index) => 
                              <span className="tag-default tag-pill" id={`${index}`}><FontAwesomeIcon icon={faXmark} onClick={deleteTags}/> {tag} </span>
                              )}
                            </div>
                        </fieldset>
                        <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handlePostArticle}>
                            Publish Article
                        </button>
                    </fieldset>
                </form>
            </div>

        </div>
    </div>
</div>

  );
}
export default NewArticle;
