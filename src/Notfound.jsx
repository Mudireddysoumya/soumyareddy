import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function NotFound()
{   
    const navigate=useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/home")
        },1000)
    },[]);

    return(
    <>
    <h1>404 page Not Found</h1>
    <img src="notfound.png"></img>
    
     </>
    )
}
export default NotFound;