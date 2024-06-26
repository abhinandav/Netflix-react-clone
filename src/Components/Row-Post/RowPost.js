// import React,{useEffect,useState} from 'react'
// import './RowPost.css'
// import { API_KEY, imageUrl } from '../../Constants/constants'
// import axios from '../../axios'
// import Youtube from 'react-youtube'
// function RowPost(props) {
    
//     const [movies,setMovies]=useState([])
//     const [urlid,setUrlid]=useState('')

//     useEffect(()=>{
//             axios.get(props.url).then(response=>{
//                 console.log(response.data)
//                 setMovies(response.data.results)
//             })
//     },[])
//     const opts = {
//         height: '390',
//         width: '100%',
//         playerVars: {
//           // https://developers.google.com/youtube/player_parameters
//           autoplay: 0,
//         }}

//         const handleMovie = (id)=>{
//             axios.get(/movie/${id}/videos?api_key=${API_KEY}&language=en-US').then((response)=>{
//                 if(response?.data?.results[0]){
//                     setUrlId(response?.data?.results[0])
//                 }
//             })
//         }

//     const handleMovie=(id)=>{
//         console.log(id)
//         axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
//             console.log(response.data)
//             // check whether result is empty 
//             if(response?.data?.results[0]){
//                 setUrlid(response?.data?.results[0])
//             }
//             else{
//                 console.log('Trailer not Available')
//             }
//         })
//     }
//     return (
//         <div className='row'>
//             <h2>{props.title}</h2>
//             <div className='posters'>
//                  {movies.map((obj)=>
//                     <img className={props.isSmall?'small-poster':'poster'} onClick={()=>handleMovie(obj.id)} alt='poster' src={`${imageUrl+obj.backdrop_path}`} />
//                  )}
//             </div>
//             {/* we can able to click if when only urlid present for video */}

//             {urlid && <Youtube opts={opts} videoId={urlid.key}/>}
//         </div>
//     )
// }

// export default RowPost


import React,{useEffect,useState} from 'react'
import './RowPost.css'
import { API_KEY, imageUrl } from '../../Constants/constants'
import axios from '../../axios'
import Youtube from 'react-youtube'

function Rowpost(props) {
    const [ movies,setMovies] = useState([])
    const [urlId,setUrlId] = useState()
    useEffect(()=>{
        axios.get(props.url).then((response)=>{
            setMovies(response?.data?.results)
        })
    },[]);
    const opts = {
        height:'390',
        width:'100%',
        playerVars:{
            autoplay:0,
        }
    }
    const handleMovie = (id)=>{
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
            if(response?.data?.results[0]){
                setUrlId(response?.data?.results[0])
            }
        })
    }
  return (
    <div className='row'>
        <h2>{props?.title}</h2>
        <div className="posters">
            {movies.map((obj)=>
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall?'small-poster':'poster'} src={`${imageUrl+obj.backdrop_path}`}
            alt="Poster" />
            )}
            
        </div>
       {urlId && <Youtube opts={opts} videoId={urlId.key}/>}
    </div>
  )
}

export default Rowpost