import React from "react";
import { useForm } from "react-hook-form";

interface IForm{
    file:FileList
}

interface IProps{
    profileUrl:string;
}

const PhotoUpload = ({profileUrl}:IProps) => {

    const {register, handleSubmit, watch, reset} = useForm<IForm>({
        mode:"onChange"
    })

    const onSubmit = () =>{
        const {file} = watch();
        const formData = new FormData();
        formData.append("file", file[0]);
        // formData.append("upload_preset", "profile");
        // axios.post("https://api.cloudinary.com/v1_1/dxqjxqz5p/image/upload", formData, {
        //     headers:{
        //         "Content-Type":"multipart/form-data"
        //     }
        // }).then(res=>{
        //     console.log(res.data.secure_url);
        // })
    }    

    return (
            <form className="flex flex-col px-8 py-8" onSubmit={handleSubmit(onSubmit)}>
              <img
                src={profileUrl}
                alt="user"
                width="200"
                className="object-fill rounded-lg shadow-xl"
              />
              <label
                className="text-white hover:bg-blue-600 transition duration-300 ease-in-out shadow-xl cursor-pointer flex h-10 justify-center items-center bg-blue-500 rounded-lg mt-4"
                htmlFor="input-file"
              >
                업로드
              </label>
              <input
                id="input-file"
                {...register('file')}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <button  type="submit" className="text-white hover:bg-blue-600 transition duration-300 ease-in-out shadow-xl cursor-pointer flex h-10 justify-center items-center bg-blue-500 rounded-lg mt-4">엡데이트</button>
            </form>
        )
}


export default PhotoUpload;

