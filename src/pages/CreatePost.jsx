import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { backendUrl } from "./Signup";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [publishError, setPublishError] = useState(false);
  const navigare = useNavigate();

  const handleUpdloadImage = () => {
    if (!file) {
      return setImageUploadError("Please select an image");
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        console.log(error);
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    try {
      const resp = await fetch(`${backendUrl}/api/post/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await resp.json();
      if (!resp.ok) {
        return setPublishError(data.message);
      }
      navigare(`/post/${data.slug}`);
    } catch (err) {
      console.log(err);
      return setPublishError(err.message);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            <option value="sport">Sport</option>
            <option value="politics">Politics</option>
            <option value="entertainment">Entertainment</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="tech">Tech</option>
          </Select>
        </div>
        <div
          className="flex gap-4 items-center justify-between border-2 border-teal-500
          p-3 rounded-lg border-dotted"
        >
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData?.image && (
          <img
            src={formData?.image}
            alt="uploaded image"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
