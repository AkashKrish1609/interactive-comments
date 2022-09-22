let container = document.querySelector(".container");
let replyingToName,mainData;
  

async function theData(){
    const response = await fetch("data.json");
    let data = await response.json();
    let comments = data.comments;
    let userPhoto = data.currentUser.image.png;
    let obj;

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
       
        container.appendChild(commentCard)
        commentCard.appendChild(newDiv)
        newDiv.appendChild(details)
        newDiv.appendChild(commentPara)
        newDiv.appendChild(likes)
        

        details.innerHTML = "<li><img src=" + comment.user.image.png + "></img>" + "</li>"+
                            "<li>"+ comment.user.username + "</li>"+
                            "<li>"+ comment.createdAt +"</li>";
        
        commentPara.innerHTML = "<p>"+ comment.content + "</p>";
        
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
   
       addComment.innerHTML = `<form><label for=""><img src="${userPhoto}" alt="" class="user-photo"></label>
       <textarea name="" id="" cols="30" rows="5"></textarea>
       <button type="submit" class="comment-reply-btn">REPLY</button></form>`;
   
       commentCard.appendChild(addComment)

       

       if(comment.replies.length !== 0 ){
        let replyArray = comment.replies;
        console.log(replyArray);
        let repliesDiv = document.createElement("div")
        repliesDiv.setAttribute("class", "replies-div")



        replyArray.forEach(function(element){
            

            let interactive = document.createElement("div")
            interactive.setAttribute("class","interactive");


            repliesDiv.appendChild(interactive)

            

            interactive.innerHTML = ` <ul>
            <li><img src="${element.user.image.png}"></li>
            <li>${element.user.username}</li>
            <li>${element.createdAt}</li>
           </ul>
           <div class="reply-para">
           <p>${element.content}</p>
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

           let replying = document.querySelector(`.${comment.user.username}`)
           replying.appendChild(repliesDiv)
        
        })

       }
       
       

    })
    
    

    let forms = document.querySelectorAll("form")
    forms.forEach(function(form){
        form.addEventListener("submit", function(e){
            e.preventDefault()
            e.target.closest(".add-comment").classList.toggle("hide")
            let text = e.target.closest("form").childNodes[2].value;

            let userPost = document.createElement("div")
            userPost.setAttribute("class", "post-container")

             obj = {
                score: 0,
                content: text,

            }

            data.comments[0].replies.push(obj)
            console.log(data);
            
          
            
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
        console.log();
        if(btn.parentElement.parentElement.classList.contains("reply-div")){
         let closest = e.target.closest(".comment-card").id
       
         let hidden = document.querySelectorAll(`[dataset=${closest}]`)
         hidden.forEach(function(element){
            element.classList.toggle("hide")
            
            })
        }else {
            let magicCard = e.target.closest(".interactive");
            let parentDiv = magicCard.parentNode;
            // console.log(magicCard.nextElementSibling);
            let repliesHidden = document.createElement("div")
            repliesHidden.setAttribute("class", "hidden-replies")
            // repliesHidden.classList.add("hide")

            repliesHidden.innerHTML = `<label for=""><img src="${userPhoto}" alt="" class="user-photo"></label>
            <textarea name="" id="" cols="30" rows="5"></textarea>
            <button type="submit" class="comment-reply-btn">REPLY</button>`
            if(magicCard.nextElementSibling === null || magicCard.nextSibling.classList.contains("interactive") === true ){


                parentDiv.insertBefore(repliesHidden, magicCard.nextSibling);
                
            }else {
                magicCard.nextElementSibling.classList.toggle("new-hide") 
               
            }

        }
        })
    })


    
}

theData();










