let tagContent = [
  {
    image: "images/tag1bg.png",
    title: "Space",
    content: "FEATURED 28,291 posts",
    divNo: 1,
    colorIs: "darkslategray",
  },
  {
    image: "images/tag2bg.jpg",
    title: "Imgur13",
    content: "7,842 posts",
    divNo: 2,
    colorIs: "darkslateblue",
  },
  {
    image: "images/tag3bg.jpg",
    title: "Vintage",
    content: "8,926 posts",
    divNo: 3,
    colorIs: "seagreen",
  },
  {
    image: "images/tag4bg.jpg",
    title: "Pokemon",
    content: "52,584 posts",
    divNo: 4,
    colorIs: "indianred",
  },
  {
    image: "images/tag5bg.jpg",
    title: "Black History Month",
    content: "184 posts",
    divNo: 5,
    colorIs: "#328d67",
  },
  {
    image: "images/tag6bg.jpg",
    title: "Science And Tech",
    content: "44,943 posts",
    divNo: 6,
    colorIs: "#e47d57",
  },
  {
    image: "images/tag7bg.jpg",
    title: "Staff Picks",
    content: "6,536 posts",
    divNo: 7,
    colorIs: "#132d31",
  },
  {
    image: "images/tag8bg.jpg",
    title: "Gaming",
    content: "298,228 posts",
    divNo: 8,
    colorIs: "#2b1a5a",
  },
  {
    image: "images/tag9bg.jpg",
    title: "Memes",
    content: "571,088 posts",
    divNo: 9,
    colorIs: "#ba519f",
  },
  {
    image: "images/tag10bg.jpg",
    title: "OC",
    content: "39,274 posts",
    divNo: 10,
    colorIs: "#ab80b8",
  },
];

let data = []

async function fetchData(url){

 await fetch(url,{
      method:"GET",
      headers:{
        Authorization: 'Client-ID 72ebaa80e0288fb',
      },
  })
  .then(async(response)=>{
    const res = await response.json();
  
    data = res.data;

    showData(data)
  })
  .catch((e)=>{
    console.log(e)
  })

}

// clientID: 72ebaa80e0288fb
// clientSecret: a1aba82b2105a9b9634d1e446c1502e6cc41ad33

let url = "https://api.imgur.com/3/gallery/hot/viral/";
fetchData(url)


//show data
function showData(data){

let postDivContainer = document.getElementById("postsDiv__postsBody");
postDivContainer.innerHTML = null;

data.forEach((item)=>{

  let postBodyDiv = document.createElement("div");
  postBodyDiv.className = `postsDiv__postsBody__itemDiv`

let postTextDiv = document.createElement("div");
postTextDiv.className = `postsDiv__postsBody__itemDiv__textDiv`;


//post title div
let postTitle = document.createElement("h2");
postTitle.className = `postsDiv__postsBody__itemDiv__textDiv__title`;
postTitle.textContent = item.title;


// postdata div
let postDataFlexDiv = document.createElement("div");
postDataFlexDiv.className = `postsDiv__postsBody__itemDiv__textDiv__postData`;

//left side of post data
let postDataLeftDiv = document.createElement("div");
postDataLeftDiv.className = `postsDiv__postsBody__itemDiv__textDiv__postDatacontent`
let leftPostData = document.createElement("span");
leftPostData.innerHTML = `⬆ ${item.score} ⬇`;


//middle data div
let middleData = document.createElement("h3");
middleData.className = `postsDiv__postsBody__itemDiv__textDiv__postData__content`
middleData.textContent = `🗨 ${item.comment_count}`;

//right Data
let rightData = document.createElement("h3");
rightData.className = `postsDiv__postsBody__itemDiv__textDiv__postData__content`
rightData.textContent = `👁 ${item.views}`;


postDataLeftDiv.append(leftPostData);

// append in postdata div 
postDataFlexDiv.append(postDataLeftDiv, middleData, rightData);

// post text content div
postTextDiv.append(postTitle, postDataFlexDiv)

postBodyDiv.append(postTextDiv);

if(item.images){

  let extension = item.images[0].link.split(".")[3];

  if(extension == "mp4"){
    let video = document.createElement("video");
    video.src = item.images[0].link;
    video.autoplay = true;
    video.muted = true;
    video.className=`postsDiv__postsBody__itemDiv__images`;
    postBodyDiv.append(video);
  }else{



  let img = document.createElement("img");
  img.className=`postsDiv__postsBody__itemDiv__images`
img.src= item.images[0].link;
img.alt="imgur"
postBodyDiv.append(img)
}


postDivContainer.append(postBodyDiv)
}
});
}


// create new post
function postData(){
  const file = document.getElementById("file");

  file.addEventListener("change",(el)=>{
    const uploadData = new FormData()
    uploadData.append("image", el.target.files[0])
    fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers:{
        Authorization: 'Client-ID 72ebaa80e0288fb'
      },
      body: uploadData
    })
    .then((data)=>{
      data.json()
    })
    .then((data)=>{
      //  console.log(data.data.link);
    })
  })
}


// tag show div
tagContent.forEach((item) => {
  let tagDivContainer = document.getElementById("topDiv__tagDiv__tagImgDiv");

  let commonTagDiv = document.createElement("div");
  commonTagDiv.addEventListener("mouseover", ()=>{
    commonTagDiv.style.margin="-6px 6px 0";
  })
  commonTagDiv.addEventListener("mouseout", ()=>{
    commonTagDiv.style.margin="6px 6px 0";
  })


  commonTagDiv.className = `topDiv__tagDiv__tagImgDiv__commonDiv topDiv__tagDiv__tagImgDiv--tag${item.divNo}Div`;

  let tagImageDiv = document.createElement("div");
  tagImageDiv.className = `topDiv__tagDiv__tagImgDiv__div__imageDiv topDiv__tagDiv__tagImgDiv__div__imageDiv--tag${item.divNo}`;
  tagImageDiv.style.backgroundImage = `url(${item.image})`;

  let tagContentDiv = document.createElement("div");
  tagContentDiv.className = `topDiv__tagDiv__tagImgDiv__div__contentDiv topDiv__tagDiv__tagImgDiv__div__contentDiv--tag${item.divNo}`;
  tagContentDiv.style.backgroundColor = item.colorIs;

  let tagContent1 = document.createElement("p");
  tagContent1.className = `topDiv__tagDiv__tagImgDiv__div__contentDiv__content1`;
  tagContent1.textContent = item.title;

  let tagContent2 = document.createElement("p");
  tagContent2.className = `topDiv__tagDiv__tagImgDiv__div__contentDiv__content2`;
  tagContent2.textContent = item.content;

  tagContentDiv.append(tagContent1, tagContent2);

  commonTagDiv.append(tagImageDiv, tagContentDiv);

  tagDivContainer.append(commonTagDiv);
});




// on scroll style  

let topDiv = document.getElementById("topDiv");
window.onscroll = ()=>{
  let windowScrollY = window.scrollY;
  if(windowScrollY > 312){
    document.getElementById("topDiv__navDiv").style.position = "relative";
    document.getElementById("postNavbar").style.position = "fixed";
    document.getElementById("postNavbar").style.top = 0;
    document.getElementById("postNavbar").style.backgroundColor= "#2e3035";
    document.getElementById("postNavbar").style.zIndex = 15;


  }else{
    document.getElementById("topDiv__navDiv").style.position = "fixed";
    document.getElementById("postNavbar").style.position = "relative";
    document.getElementById("postNavbar").style.backgroundColor= "transparent";
  }
 
}

// input styling 
//left side
document.getElementById("leftSortHeader").addEventListener("click",function(){
  let val = document.getElementById("postsDiv__postNavbar__leftOptions").style.display;
document.getElementById("postsDiv__postNavbar__leftOptions").style.display="block";
if(val === "block"){
  document.getElementById("postsDiv__postNavbar__leftOptions").style.display="none";
}
})

function changeLeftOptionTitle(sortTitle){
  document.getElementById("leftSortHeader").textContent = `${sortTitle} \u00A0\u00A0 ⯆`;
  document.getElementById("postsDiv__postNavbar__leftOptions").style.display="none";

  if(sortTitle==="most viral"){
    let url = "https://api.imgur.com/3/gallery/hot/viral/";
    fetchData(url)
  }
  else if(sortTitle==="highest scoring"){
    let url = "https://api.imgur.com/3/gallery/top/top/";
    fetchData(url)
  }
  else if(sortTitle==="user submitted"){
    let url = "https://api.imgur.com/3/gallery/user/rising/";
    fetchData(url)
  }
}

//right side
document.getElementById("rightSortHeader").addEventListener("click",function(){
  let val = document.getElementById("postsDiv__postNavbar__rightOptions").style.display;
  document.getElementById("postsDiv__postNavbar__rightOptions").style.display="block";
  if(val === "block"){
    document.getElementById("postsDiv__postNavbar__rightOptions").style.display="none";
  }
  })

function changeRightOptionTitle(sortTitle){
  document.getElementById("rightSortHeader").textContent = `${sortTitle} \u00A0\u00A0 ⯆`;
  document.getElementById("postsDiv__postNavbar__rightOptions").style.display="none";


  if(sortTitle==="newest"){
    let url = "https://api.imgur.com/3/gallery/hot/time/";
    fetchData(url)
  }
  else if(sortTitle==="popular"){
    let url = "https://api.imgur.com/3/gallery/top/viral/";
    fetchData(url)
  }
  else if(sortTitle==="best"){
    let url = "https://api.imgur.com/3/gallery/top/top/";
    fetchData(url)
  }
  else{
    let urls = ["https://api.imgur.com/3/gallery/hot/time/","https://api.imgur.com/3/gallery/top/viral/",
    "https://api.imgur.com/3/gallery/top/top/","https://api.imgur.com/3/gallery/user/rising/"];

    let num = Math.floor(Math.random()*4);
    let url = urls[num];
    fetchData(url)
  }

 }


 //debouncing section
let queryInputBox = document.getElementById("queryInputBox");
queryInputBox.onchange = debounceData;

let id;

function debounceData(){
  clearTimeout(id)
 id = setTimeout(async()=>{
  let queryIs = queryInputBox.value;
  let queryUrl = `https://api.imgur.com/3/gallery/search?q=${queryIs}`;
  alert("hey")


  await fetch(queryUrl,{
    method:"GET",
    headers:{
      Authorization: 'Client-ID 72ebaa80e0288fb',
    },
})
.then(async(response)=>{
  const res = await response.json();

  data = res.data;

  data.splice(9, data.length)
  console.log('data:', data)

  showDebounceData(data)
})
.catch((e)=>{
  console.log(e)
})

  
 }, 1000)
}


function showDebounceData(data){
  let debounceDiv = document.getElementById("topDiv__debounceDataShowDiv");
  debounceDiv.style.display="block";

    data.forEach((item)=>{
    let queryResult = document.createElement("p");
    queryResult.className = "queryResultItem";
    queryResult.textContent = item.title;

    queryResult.addEventListener("click", ()=>{
      window.location.href = item.link;
    })

    let br = document.createElement("br");

    debounceDiv.append(queryResult, br);
  });

}