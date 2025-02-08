import './PostAuth.css'
import { useGlobalState } from "../../../../../../../shared/utils/GlobalState";
import { useState, useRef } from "react";
import { RefObject } from "react";
import { Link } from 'react-router-dom';

// Services & interfaces
import { secureFetch } from "../../../../../../api/secureFetch";
import { ICreatePost } from "../../../../../../../shared/interfaces/ICreatePost";

// Config
import { API_URL } from "../../../../../../../config/anx.config.breadriuss";

// Svgs
import { AddImage } from "../../../../../../../assets/svgs/feed/AddImage";
import NoAuthIcon from '../../../../../../../assets/svgs/post/NoAuthIcon';

export default function PostAuth({ options_auth }: ICreatePost) {
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  // Global state
  const { infoUser, setNotis, notis } = useGlobalState();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File[] | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) setFile(Array.from(files || []));
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!options_auth.IsAuthenticated) return;

    const formData = new FormData()
    formData.append('id', crypto.randomUUID().split("-")[4])
    formData.append('content', formRef.current!.content.value)
    formData.append('user_id', infoUser.id.toString())
    formData.append('created_at', new Date().toISOString())
    formData.append('updated_at', new Date().toISOString())

    if (formData.get('content') === '') {
      setNotis([...notis, { message: 'ANX | Please write something.', type: 'warning', options: { isLoading: false } }]);
      return false
    }

    if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.append('images', file[i])
      }
    }

    setLoading(true);
    const { data, error } = await secureFetch(`${API_URL}/posts/publish`, { method: 'POST', body: formData, stringify: false }, setLoading)

    if (error) {
      setLoading(false);
      setNotis([...notis, { message: error, type: "error", options: { isLoading: true } }]);
      console.log(error);
      return;
    }

    if (data) {
      setLoading(false);
      console.log(data);
      setNotis([...notis, { message: "Post has been created correctly.", type: "success", options: { isLoading: true } }]);
    }

    formRef.current?.reset()
    setFile(null);
  };

  return (
      options_auth.IsAuthenticated ? (
        <form className="post-form" ref={formRef} onSubmit={handleSubmitPost}>
        <textarea
        name="content"
        id="content"
      placeholder="What's happening?"
      ></textarea>
      {file ? (
        <div className="post-form-images">
        {file
          ? file.map((image, index) => (
            <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            key={index}
            />
          ))
          : null}
          </div>
        ) : null}
        
        <div className="post-form-footer">
        <div>
          <input
          type="file"
            hidden
            id="file"
            name="file"
            multiple
            onChange={handleChangeFile}
            />
            <label htmlFor="file">
            <AddImage />
            </label>
            </div>
            {loading ? <div className='loading-spin'></div> : <button disabled={loading}>Post</button>}
            </div>
            </form>
          ) : (

            <div className="post-auth-no-authenticated" onClick={(e) => {console.log(e)}}>
              <div className="post-auth-main">
                  <NoAuthIcon />
                  <p className='post-auth-text'>You shuould consider <Link to={"/login"}>sign in</Link>, or if you don't have an account you can <Link to={"/register"}>sign up</Link>.</p>
              </div>	
            </div>
        )
  );
}