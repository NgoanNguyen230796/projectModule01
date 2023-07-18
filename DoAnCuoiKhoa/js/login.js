let userSystem=[
    {
        userID:1,
        email:"ngoanxitrum2307@gmail.com",
        password:"ngoan23071996",
        fullName:"Nguyễn Thị Ngoan",
        status:"active"
    },
    {   userID:2,
        email:"nguyenngan0112@gmail.com",
        password:"meoLuoi01121992",
        fullName:"Nguyễn Thị Ngần",
        status:"inActive"
    },
    {
        userID:3,
        email:"medung2303@gmail.com",
        password:"doDung23031965",
        fullName:"Đỗ Thị Dung",
        status:"inActive"
    }, 
       {
        userID:4,
        email:"doAn@gmail.com",
        password:"doAn2023",
        fullName:"Đỗ Thị An",
        status:"inActive"
    }, 
    {
        userID:5,
        email:"doDai@gmail.com",
        password:"doDai2012",
        fullName:"Đỗ Văn Đại",
        status:"inActive"
 },{
        userID:6,
        email:"quynhChi@gmail.com",
        password:"quynhChi2019",
        fullName:"Nguyễn Thị Quỳnh Chi",
        status:"active"
},
{
    userID:7,
    email:"vuHieu@gmail.com",
    password:"vuHieu2023",
    fullName:"Vũ Minh Hiếu",
    status:"inActive"
},
{
    userID:8,
    email:"kimNgan@gmail.com",
    password:"kimNgan2023",
    fullName:"Vũ Thị Kim Ngân",
    status:"inActive"
}, 
   {
    userID:9,
    email:"vuHoa@gmail.com",
    password:"vuHoa2023",
    fullName:"Vũ Văn Hòa",
    status:"inActive"
}, 
{
    userID:10,
    email:"nguyenTrang@gmail.com",
    password:"nguyenTrang2023",
    fullName:"Nguyễn Thị Trang",
    status:"inActive"
},
{
    userID:11,
    email:"binhAn@gmail.com",
    password:"binhAn2023",
    fullName:"Nguyễn Bình An",
    status:"inActive"
}, 
{
    userID:12,
    email:"thuTrang@gmail.com",
    password:"thuTrang2023",
    fullName:"Nguyễn Thu Trang",
    status:"inActive"
}, 
{
    userID:13,
    email:"vanNam@gmail.com",
    password:"vanNam2023",
    fullName:"Nguyễn Văn Nam",
    status:"inActive"
}
];
localStorage.setItem("userSystem", JSON.stringify(userSystem));
function validateData(){
    let userSystem = localStorage.getItem("userSystem") ? JSON.parse(localStorage.getItem("userSystem")) : [];
    let emailValue=document.getElementById("email").value.trim();
    let passwordValue=document.getElementById("password").value.trim(); 
    let checkLogin=checkUserExist(emailValue,passwordValue);
    if(checkLogin){
        for (let i = 0; i < userSystem.length; i++) {
            if (userSystem[i].email == emailValue && userSystem[i].password == passwordValue) {
                console.log("OK---->",userSystem[i].status);
                if(userSystem[i].status=="active"){
                    localStorage.setItem("userLogin",emailValue);
                    localStorage.setItem("status",userSystem[i].status);
                    window.location.href="dashboard.html";
                }else{
                    alert("Rất tiếc tài khoản của bạn đã bị khóa");
                }
                
            }
        } 
    }else{
        alert("Sai email hoặc password, vui lòng đăng nhập lại");
    }
      
}
//Check email and pass
function checkUserExist(email, password) {
    let userSystem = localStorage.getItem("userSystem") ? JSON.parse(localStorage.getItem("userSystem")) : [];
    for (let i = 0; i < userSystem.length; i++) {
        if (userSystem[i].email == email && userSystem[i].password == password) {
            return true;
        }
    } 
    return false;
}
//Check email pass va lay active
// function getIndex(email, password) {
//     let userSystem = localStorage.getItem("userSystem") ? JSON.parse(localStorage.getItem("userSystem")) : [];
//     for (let i = 0; i < userSystem.length; i++) {
//         if (userSystem[i].email == email && userSystem[i].password == password) {
//            return i;
//         }
//     } 
//     return -1;
// }
function resetData(){
    document.getElementById("email")="";
    document.getElementById("password")="";
}
let btnLogin=document.getElementById("btnLogin");
btnLogin.addEventListener("click",function(event){
    event.preventDefault();
    // localStorage.setItem("arrayCourses", JSON.stringify(arrayCourses));
    validateData();
});
