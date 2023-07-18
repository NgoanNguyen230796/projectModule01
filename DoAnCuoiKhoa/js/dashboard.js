var myModalLogOut = new bootstrap.Modal(document.getElementById("myModalLogOut"), {
  keyboard: false,
});

function checkLogin() {
  let email = localStorage.getItem("userLogin");
  if (email == null) {
    window.location.href = "login.html";
  }

  let studentManagement = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let courseNumber = 0;
  let classNumber = 0;
  let activeClassNumber = 0;
  let inActiveClassNumber = 0;
  let waitClassNumber = 0;
  let sumStudentNumber = 0;
  let sumWaitStudentNumber = 0;
  let sumActiveStudentNumber = 0;
  let sumInActiveStudentNumber = 0;
  let sumGraduateStudentNumber = 0;

  studentManagement.forEach((course) => {
    //Số lượng khóa học hiện tại
    courseNumber++;
    course.arrayClass.forEach(classOfNumber=>{
        //Số lượng lớp học
        classNumber++;
      
        if(classOfNumber.status==0){
            // lớp học chờ hoạt động (0)
            waitClassNumber++;
           
        }else if(classOfNumber.status==1){
              // lớp học đang hoạt động (1)
              activeClassNumber++;
             
        }else{
           // lớp học đã kết thúc(2)
           inActiveClassNumber++;
        }

        classOfNumber.arrayStudent.forEach(student=>{
            sumStudentNumber++;
            if(student.status==0){
                //Đang chờ 0
                sumWaitStudentNumber++;              
            }else if(student.status==1){
                //Đang học 1
                sumActiveStudentNumber++;
            }else if(student.status==2){
                //Bảo lưu,đình chỉ 2
                sumInActiveStudentNumber++;
            }else{
                //Tốt nghiệp 3
                sumGraduateStudentNumber++;

            }                       
        });

    })
  });
//Thống kê khóa học
  document.getElementById("courseNumber").innerText = courseNumber;
  //Thống kê lớp học
  document.getElementById("classNumber").innerText =classNumber;
  document.getElementById("activeClassNumber").innerText =activeClassNumber;
  document.getElementById("inActiveClassNumber").innerText =inActiveClassNumber;
  document.getElementById("waitClassNumber").innerText =waitClassNumber;

  //Thống kê sinh viên
  document.getElementById("sumStudentNumber").innerText =sumStudentNumber;
  document.getElementById("sumWaitStudentNumber").innerText =sumWaitStudentNumber;
  document.getElementById("sumActiveStudentNumber").innerText = sumActiveStudentNumber;
  document.getElementById("sumInActiveStudentNumber").innerText = sumInActiveStudentNumber;
  document.getElementById("sumGraduateStudentNumber").innerText =sumGraduateStudentNumber;

}
function logOut() {
  localStorage.removeItem("userLogin");
  window.location.href = "login.html";
}
let btnYes = document.getElementById("btnYes");
btnYes.addEventListener("click", function (event) {
  event.preventDefault();
  logOut();
});
let btnNo = document.getElementById("btnNo");
btnNo.addEventListener("click", function (event) {
  event.preventDefault();
  myModalLogOut.hide();
});



document.onload = checkLogin();
