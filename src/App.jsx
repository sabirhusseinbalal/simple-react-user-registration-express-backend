import React, { useState } from 'react'; // Make sure useState is imported
import { useForm } from 'react-hook-form';
import './index.css';
import axios from 'axios'; // Import axios

function App() {
  const { handleSubmit, register, formState: { errors, isSubmitting }, setError, reset } = useForm();
  const [buttonContent, setButtonContent] = useState("Submit"); // useState to manage button content

  const onSubmit = async (values) => {    
    console.log("In Progress...");    
    setButtonContent("In Progress...");    

    // Error handling with setError for specific cases


    try {        
        setButtonContent("Fetching data...");        
        console.log(values);        
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay
        
        let response = await fetch("http://localhost:3000/", {            
            method: "POST",            
            headers: {                
                "Content-Type": "application/json",            
            },            
            body: JSON.stringify(values),        
        }); 
    
      
        if (response.status === 409) {  
          setError("username", { message: "Username already exists" }); // Set error for username           
            const message = await response.text(); // Get the error message from response            
            console.error("Error:", message);                       
        } 

        // If successful, proceed with the response
        let res = await response.text();        
        console.log("Data saved successfully:", res);        
        setButtonContent("Done...");    

    } catch (error) {        
        console.error("There was an error saving data:", error);    
    } finally {
        // Reset form after a delay
        reset(); 
        setTimeout(() => setButtonContent("Submit"), 3000); // Reset button content after 3 seconds
    }
};

  



  return (
    <>
     <div className="bg h-screen overflow-hidden flex items-center justify-center">
  <div className="bg-shadow bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl  shadow-sm shadow-y-[4px] shadows-4 shadows-scale-2">
    <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
      </svg>
    </div>
    
    <form className="p-12 md:p-24" onSubmit={handleSubmit(onSubmit)}>
      {/* Error messages for username */}
    {errors.username && <p className="text-red-700">{errors.username.message}</p>}
      {/* Username */}
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text"  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" 
          {...register("username", { required: {value: true, message: "This field is required"}, minLength: {value: 5, message: "Min length is 5"}, maxLength: {value: 25, message: "Max length is 25"}, pattern: {value: /^[a-zA-Z0]+$/, message: "Only letters"}})}
        />
         
      </div>

      {/* Password */}
      {errors.password && <div className='text-red-700'>{errors.password.message}</div>}
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" 
         {...register("password", { required: {value: true, message: "This field is required"}, minLength: {value: 5, message: "Min length is 5"}, maxLength: {value: 15, message: "Max length is 15"}})}
        />
 
      </div>
      <button className={isSubmitting ?  "bg-gradient-to-b from-gray-700 to-gray-600 font-medium p-2 md:p-4 text-[#DADEDF] uppercase w-full rounded" : "bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"}   type="submit" disabled={isSubmitting} id="btn" >{buttonContent}
      </button>
    </form>
  </div>
 </div>
    </>
  )
}

export default App
