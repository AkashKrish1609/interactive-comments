let container = document.querySelector(".container");
let replyingToName,mainData;
let userAddComment = document.querySelector(".main-post-container");

async function theData(){
    const response = await fetch("data.json");
    let data = await response.json();
    let comments = data.comments;
    let userPhoto = data.currentUser.image.png;
    userAddComment.innerHTML = `
    <form class="main-form">
    <label for=""><img src="${data.currentUser.image.png}" alt="" class="user-photo"></label>
    <textarea name="" id="" cols="30" rows="5" required placeholder="Add a comment.."></textarea>
    <button type="submit" class="send-btn">SEND</button>
    </form>`

    comments.forEach(function (comment){
        

        let commentCard = document.createElement("div")
        commentCard.setAttribute("class", "comment-card")
        commentCard.setAttribute("id", `${comment.user.username}`)
        commentCard.classList.add(`${comment.user.username}`)

        
        var newDiv = document.createElement("div")
        newDiv.setAttribute("class", "comment")

        var details = document.createElement("ul");
        details.setAttribute("class", "details")

        var commentPara = document.createElement("div");
        commentPara.setAttribute("class", "comment-para")

        var likes = document.createElement("div")
        likes.setAttribute("class", "reply-div");
        var likesDiv = document.querySelector(".reply-div");
       
        container.insertBefore(commentCard, userAddComment)
        commentCard.appendChild(newDiv)
        newDiv.appendChild(details)
        newDiv.appendChild(commentPara)
        newDiv.appendChild(likes)
        

        details.innerHTML = "<li><img src=" + comment.user.image.png + "></img>" + "</li>"+
                            "<li>"+ comment.user.username + "</li>"+
                            "<li>"+ comment.createdAt +"</li>";
        
        commentPara.innerHTML = `<p>${comment.content}</p>`;
        
        let commentScore = comment.score;
        
        likes.innerHTML =  `<div class="btn-div">
        <span class="plus" >+</span>
        <span class="numbr-space">${commentScore}</span>
        <span class="minus">-</span>
       </div><div class="reply-btn-div">
       <button class="reply-btn" ><img src="./images/icon-reply.svg" alt="" class="reply-img">Reply</button>
       </div>`;

       let addComment = document.createElement("div")
       addComment.setAttribute("class", "add-comment")
       addComment.setAttribute("dataset", `${comment.user.username}`)
       addComment.classList.add("hide")
   
       addComment.innerHTML = `<form class="first-form"><label for=""><img src="${userPhoto}" alt="" class="user-photo"></label>
       <textarea name="" id="" cols="30" rows="5" required placeholder="Add a comment.."></textarea>
       <button type="submit" class="comment-reply-btn"><img src="./images/icon-reply.svg" alt="" class="reply-img">REPLY</button></form>`;
   
       commentCard.appendChild(addComment)

       

       if(comment.replies.length !== 0 ){
        let replyArray = comment.replies;
        let repliesDiv = document.createElement("div")
        repliesDiv.setAttribute("class", "replies-div")



        replyArray.forEach(function(element){
           
            let interactive = document.createElement("div")
            interactive.setAttribute("class","interactive");


            repliesDiv.appendChild(interactive)
            if(element.user.username === data.currentUser.username){
                interactive.innerHTML = ` <ul>
            <li><img src="${element.user.image.png}"></li>
            <li>${element.user.username}</li>
            <li class="you-list">you</li>
            <li>${element.createdAt}</li>
           </ul>
           <div class="reply-para">
           <p><span class="replying-to">@${element.replyingTo}&nbsp;&nbsp;</span>${element.content}</p>
           </div>
            <div class="reply-likes-div">
            <div class="btn-div">
            <span class="plus no-event" >+</span>
            <span class="numbr-space">${element.score}</span>
            <span class="minus no-event">-</span>
            </div>
            <div class="delete-edit">
            <button class="delete"><img src="./images/icon-delete.svg" alt="" class="delete-img">Delete</button>
            <button class="edit"><img src="./images/icon-edit.svg" alt="" class="edit-img">Edit</button>
            </div>
           </div>`;
            }else{
                interactive.innerHTML = ` <ul>
                <li><img src="${element.user.image.png}"></li>
                <li>${element.user.username}</li>
                <li>${element.createdAt}</li>
               </ul>
               <div class="reply-para">
               <p><span class="replying-to">@${element.replyingTo}&nbsp;&nbsp;</span>${element.content}</p>
               </div>
                <div class="reply-likes-div">
                <div class="btn-div">
                <span class="plus" >+</span>
                <span class="numbr-space">${element.score}</span>
                <span class="minus">-</span>
                </div>
               <div class="reply-btn-div">
               <button class="reply-btn"><img src="./images/icon-reply.svg" alt="" class="reply-img">Reply</button>
               </div>
               </div>`;
            }
            
           

           let replying = document.querySelector(`.${comment.user.username}`)
           replying.appendChild(repliesDiv)
        
        })

       }
       
       

    })
    
    

    let forms = document.querySelectorAll("form.first-form")
    

    forms.forEach(function(form){
        
        
          form.addEventListener("submit", function(e){
            
            e.preventDefault()
            if(form.classList.contains("first-form")){
            
            let closestAddComment = e.target.closest(".add-comment")
            e.target.closest(".add-comment").classList.toggle("hide")
            let text = e.target.closest("form").childNodes[2].value;
            
            let userPost = document.createElement("div")
            userPost.setAttribute("class", "post-container")

            let date = new Date();
            let reqDate = date.toLocaleString("en-US", {  
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',});

            userPost.innerHTML = ` <ul>
            <li><img src="${data.currentUser.image.png}" class="user-image"></li>
            <li>${data.currentUser.username}</li>
            <li class="you-list">you</li>
            <li>${reqDate}</li>
           </ul>
           <div class="reply-para">
           <p><span class="replying-to">@${closestAddComment.parentElement.id}&nbsp;&nbsp;</span>${text}</p>
           </div>
            <div class="reply-likes-div">
            <div class="btn-div">
            <span class="plus no-event" >+</span>
            <span class="numbr-space">0</span>
            <span class="minus no-event">-</span>
            </div>
           <div class="delete-edit">
           <button class="delete"><img src="./images/icon-delete.svg" alt="" class="delete-img">Delete</button>
           <button class="edit"><img src="./images/icon-edit.svg" alt="" class="edit-img">Edit</button>
           </div>
           </div>`
           let only = document.querySelector(".replies-div")
           if(closestAddComment.nextSibling !== null){
            closestAddComment.nextSibling.appendChild(userPost)
           }else if(closestAddComment.nextSibling === null){
            
            let again = document.createElement("div")
            again.setAttribute("class", "replies-div")
            closestAddComment.parentElement.appendChild(again)
            again.appendChild(userPost)
           }

           
           e.target.closest("form").childNodes[2].value = "";
           deleteFunction();
           editFunction();
        }
            
        })
        
    
    })




    
    
    let plusBtns = document.querySelectorAll(".plus")
    plusBtns.forEach(function(btn){
        let value = Number(btn.nextElementSibling.innerText);
    
    btn.addEventListener("click", function(e){
        let previousValue =  Number(btn.nextElementSibling.innerText);
        if(value === previousValue || value === previousValue + 1 ){
            let addedNumbr = previousValue + 1;
            btn.nextElementSibling.innerText = addedNumbr;


        } 

    })
})
    let minusBtns = document.querySelectorAll(".minus")
    minusBtns.forEach(function(btn){
        let value = Number(btn.previousElementSibling.innerText);
    
    btn.addEventListener("click", function(e){
        let prevValue = Number(btn.previousElementSibling.innerText);
        if(value === prevValue || value === prevValue - 1 ){
            let minusNumbr = prevValue - 1;
            btn.previousElementSibling.innerText = minusNumbr;
            
        } 
    
        
    })
})

    let replyButtons = document.querySelectorAll(`.reply-btn`)
    replyButtons.forEach(function(btn){
     btn.addEventListener("click", function(e){
        if(btn.parentElement.parentElement.classList.contains("reply-div")){
         let closest = e.target.closest(".comment-card").id
       
         let hidden = document.querySelectorAll(`[dataset=${closest}]`)
         hidden.forEach(function(element){
            element.classList.toggle("hide")
            
            })
        }else {
            let magicCard = e.target.closest(".interactive");
            let parentDiv = magicCard.parentNode;
            let repliesHidden = document.createElement("div")
            repliesHidden.setAttribute("class", "hidden-replies")
            
            repliesHidden.innerHTML = `<form class="reply-form"><label for=""><img src="${userPhoto}" alt="" class="user-photo"></label>
            <textarea name="" id="" cols="30" rows="5" required placeholder="Add a comment.."></textarea>
            <button type="submit" class="comment-reply-btn"><img src="./images/icon-reply.svg" alt="" class="reply-img">REPLY</button></form>`
            if(magicCard.nextElementSibling === null || magicCard.nextSibling.classList.contains("interactive") === true ){


                parentDiv.insertBefore(repliesHidden, magicCard.nextSibling);
                
                
            }else if(magicCard.nextSibling.classList.contains("hidden-replies") === true){
                
                magicCard.nextSibling.classList.toggle("new-hide")
               
            }
            else{
                parentDiv.insertBefore(repliesHidden, magicCard.nextSibling);
            }

            theForm ()
            
            
        }

        
        })

    })

  function theForm (){
    let replyForms = document.querySelectorAll(".reply-form")
    
    replyForms.forEach(function(replyForm){
         replyForm.addEventListener("submit",  function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            
            
            let closestHiddenReplies = e.target.closest(".hidden-replies") ;
            closestHiddenReplies.classList.toggle("new-hide")
            let reqData = e.target.closest("form").childNodes[2].value;

            let AnotheruserPost = document.createElement("div")
            AnotheruserPost.setAttribute("class", "post-container")

            let theDate = new Date();
            let requiredDate = theDate.toLocaleString("en-US", {  
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',});

            AnotheruserPost.innerHTML = ` <ul>
            <li><img src="${data.currentUser.image.png}" class="user-image"></li>
            <li>${data.currentUser.username}</li>
            <li>you</li>
            <li>${requiredDate}</li>
           </ul>
           <div class="reply-para">
           <p><span class="replying-to">@ramsesmiron&nbsp;&nbsp;</span>${reqData}</p>
           </div>
            <div class="reply-likes-div">
            <div class="btn-div">
            <span class="plus no-event" >+</span>
            <span class="numbr-space">0</span>
            <span class="minus no-event">-</span>
            </div>
           <div class="delete-edit">
           <button class="delete"><img src="./images/icon-delete.svg" alt="" class="delete-img">Delete</button>
           <button class="edit"><img src="./images/icon-edit.svg" alt="" class="edit-img">Edit</button>
           </div>
           </div>`
            closestHiddenReplies.parentNode.appendChild(AnotheruserPost)
            
           e.target.closest("form").childNodes[2].value = "";
       
           deleteFunction();
           editFunction();
        })
    })

}
  let mainForm = document.querySelector(".main-form")
  mainForm.addEventListener("submit", function(e){
    e.preventDefault();
    let closestPC =  e.target.closest(".main-post-container")
    let reqText = e.target.closest("form").childNodes[3].value

    let newCommentCard = document.createElement("div")
    newCommentCard.setAttribute("class", "user-comment-card")

    
    let theDate = new Date();
    let requiredDate = theDate.toLocaleString("en-US", {  
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',});

    newCommentCard.innerHTML =
   `<ul>
    <li><img src="${data.currentUser.image.png}" class="user-image"></li>
    <li>${data.currentUser.username}</li>
    <li class="you-list">you</li>
    <li>${requiredDate}</li>
   </ul>
   <div class="reply-para">
   <p>${reqText}</p>
   </div>
    <div class="reply-likes-div">
    <div class="btn-div">
    <span class="plus no-event" >+</span>
    <span class="numbr-space">0</span>
    <span class="minus no-event">-</span>
    </div>
   <div class="delete-edit">
   <button class="delete"><img src="./images/icon-delete.svg" alt="" class="delete-img">Delete</button>
   <button class="edit"><img src="./images/icon-edit.svg" alt="" class="edit-img">Edit</button>
   </div>
   </div>`

   container.insertBefore(newCommentCard, userAddComment )
   e.target.closest("form").childNodes[3].value = "";
   deleteFunction();
   editFunction();
  })

/*-----delete--function----*/
function deleteFunction(){
    let alert = document.createElement("div")
    alert.setAttribute("class", "alert-delete")
    alert.classList.add("hide")
    alert.innerHTML = `
    <div class="appearing-del-div">
    <h2>Delete Comment</h2>
    <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
    <div class="appearing-buttons">
    <button class="cancel">NO, CANCEL</button>
    <button class="del">YES, DELETE</button>
    </div>
    </div>`
    
  let delButtons = document.querySelectorAll(".delete")
  delButtons.forEach(function(btn){
    btn.addEventListener("click", function(e){
        console.log(e);
        e.preventDefault()
        e.stopImmediatePropagation()
        if(container.lastElementChild.classList.contains("alert-delete") === false){
            container.insertBefore(alert, userAddComment.nextSibling)
            alert.classList.remove("hide")
        }else if(container.lastElementChild.classList.contains("alert-delete") === true){
            container.lastElementChild.classList.remove("hide")
            console.log("hello");
        }

        let cancelButtons = document.querySelectorAll(".cancel")
        cancelButtons.forEach(function(cancelButton){
            cancelButton.addEventListener("click", function(event){
                e.preventDefault()
                e.stopImmediatePropagation()
                alert.classList.add("hide")
                
            })
        })
        let deleteButtons = document.querySelectorAll(".del")
        deleteButtons.forEach(function(deleteButton){
            deleteButton.addEventListener("click", function(){
            e.preventDefault()
            e.stopImmediatePropagation()
            e.path[3].remove()
            alert.classList.add("hide")
            })

        })

        

    })
  })
    
}
deleteFunction()

/*-----edit--function----*/
function editFunction(){
    let editButtons = document.querySelectorAll(".edit")

    let updateBtn = document.createElement("div")
    updateBtn.setAttribute("class", "update-div")
    updateBtn.classList.add("hide")

    updateBtn.innerHTML= `<button class="update-btn">UPDATE</button>`
    editButtons.forEach(function(editButton){
        editButton.addEventListener("click", function(e){
            e.preventDefault()
            e.stopImmediatePropagation()

            let editablePara = e.path[3].children[1]
            let reqParent = e.path[3];
            let reqBefore = e.path[2];
            const final = Array.from(e.path).filter(it =>it.localName == "div" && it.className == "user-comment-card" || it.localName == "div" && it.className == "post-container" || it.localName == "div" && it.className == "interactive")
            let paths =Array.from(e.path) ;
            paths.forEach(function(reqPath){
                if(reqPath?.classList?.contains("user-comment-card") === true || reqPath?.classList?.contains("post-container") === true || reqPath?.classList?.contains("interactive") === true){
                   let focusReplyPara =  Array.from(reqPath.children).filter(it =>it.localName == "div" && it.className == "reply-para")
                   focusReplyPara[0].setAttribute("contenteditable", "true")
                   focusReplyPara[0].focus()
                   let focusReplyPara1 =  Array.from(reqPath.children).filter(it =>it.localName == "div" && it.className == "reply-likes-div")
                   let reqFinal = Array.from(e.path).filter(it =>it.localName === "div" && it.className === "user-comment-card")
                   
                   if(focusReplyPara[0].nextElementSibling.classList.contains("reply-likes-div")){
                    final[0].insertBefore(updateBtn, focusReplyPara1[0]) 
                    updateBtn.classList.remove("hide")
                    
                }else{
                    updateBtn.classList.remove("hide")
                   
                }
                }  
            })
            
            
            let updateButtons = document.querySelectorAll(".update-btn")
            
            updateButtons.forEach(function(updateButton){
                updateButton.addEventListener("click", function(){
                    e.preventDefault()
                    e.stopImmediatePropagation()
                    updateBtn.classList.add("hide")
                    editablePara.removeAttribute("contenteditable", "true")
                    editablePara.blur()
                })
            })

        })
    })


}
editFunction()

}

theData();











