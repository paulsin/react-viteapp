import React from 'react'

const Pagination = ({totalPosts,recordsPerPage,setCurrentPage,currentPage,firstpostIndex,lastpostIndex}) => {
    
    let pages=[]
   
    for(let i=1;i<= Math.ceil(totalPosts/recordsPerPage);i++){
        pages.push(i)
    }

    function prePage(){
        // alert("hhhhhh")
        if(currentPage!==firstpostIndex){
        setCurrentPage(currentPage-1)
        }
    }
    function nextPage(){
        // alert("jkkkk")
        if(currentPage!==lastpostIndex){
            setCurrentPage(currentPage+1)
        }
    }

    let plength=pages.length;
  return (
    <div>
       
        {/* {
            pages.map((page,index)=>{
                return <button key={index} onClick={()=>setCurrentPage(page)}
                class={page==currentPage?'active' : ''}>{page}</button>
            })
        } */}
       {/* <li class={`page-item ${page==currentPage ? 'active' : '' }` } */}
            <nav aria-label="..."  >
              <ul class="pagination" >
                <li class="page-item" >
                  <a class="page-link" href="#"  id="palink"tabindex="0" onClick={prePage} >Previous</a>
                </li>
                {
                pages.map((page,index)=>{
                    return <li  class={`page-item ${page==currentPage ? 'active' : '' }` } key={index} >
                        <a href="#" className="page-link"  id="palink" onClick={()=>setCurrentPage(page)} >{page}</a>
                    </li>
                        })

                }
                
                <li class="page-item">
                  <a class="page-link" href="#" id="palink" onClick={nextPage}>Next</a>
                </li> 
             
                <li  class="page-item" >
                    <a href="#" className="page-link" id="palink" >Total {plength} Pages</a>
                </li>
                    
               
                 
                 
              </ul>
            </nav>
    </div>
  )
}

export default Pagination