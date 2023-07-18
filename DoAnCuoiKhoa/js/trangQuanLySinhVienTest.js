var listSumCourses = localStorage.getItem("arrayCourses")
  ? JSON.parse(localStorage.getItem("arrayCourses"))
  : [];
var listStudentRender = [];
var myModalLogOut = new bootstrap.Modal(
  document.getElementById("myModalLogOut"),
  {
    keyboard: false,
  }
);
var myModalAddData = new bootstrap.Modal(
  document.getElementById("myModalAddData"),
  {
    keyboard: false,
  }
);
let myModalUpdateData = new bootstrap.Modal(
  document.getElementById("myModalUpdateData"),
  {
    keyboard: false,
  }
);
var ModalDeleteStudent = new bootstrap.Modal(
  document.getElementById("ModalDeleteStudent"),
  {
    keyboard: false,
  }
);


function setError(input, message) {
  var parentInput = input.parentElement;
  var error = parentInput.querySelector(".error-message");
  error.innerText = message;
}
function setSuccess(input) {
  var parentInput = input.parentElement;
  var error = parentInput.querySelector(".error-message");
  error.innerText = "";
}

// ValidateForm
function validateForm() {
  let studentId = document.getElementById("studentId");
  let studentName = document.getElementById("studentName");
  let year = document.getElementById("year");
  let address = document.getElementById("address");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let studentIdValue = document.getElementById("studentId").value;
  let studentNameValue = document.getElementById("studentName").value;
  let yearValue = document.getElementById("year").value;
  let addressValue = document.getElementById("address").value;
  let emailValue = document.getElementById("email").value;
  let phoneValue = document.getElementById("phone").value;
  let isCheckLookId = checkLookId(studentIdValue);
  let validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // let validationPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  let validationPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  if (studentIdValue == "") {
    setError(studentId, "*Không được để trống mã sinh viên");
  } else if (isCheckLookId) {
    setError(studentId, "*Mã sinh viên đã bị tồn tại,vui lòng nhập lại");
  } else {
    setSuccess(studentId);
  }

  if (studentNameValue == "") {
    setError(studentName, "*Không được để trống tên sinh viên");
  } else {
    setSuccess(studentName);
  }
  if (yearValue == "") {
    setError(year, "*Không được để trống năm sinh");
  } else if (!Number(yearValue) || Number(yearValue) < 1995) {
    setError(year, "*Vui lòng nhập năm sinh là số và có giá trị lớn hơn 1995");
  } else {
    setSuccess(year);
  }
  if (addressValue == "") {
    setError(address, "*Không được để trống địa chỉ");
  } else {
    setSuccess(address);
  }
  if (emailValue == "") {
    setError(email, "*Không được để trống email");
  } else if (!emailValue.match(validationEmail)) {
    setError(email, "*Vui lòng nhập đúng định dạng email");
  } else {
    setSuccess(email);
  }
  if (phoneValue == "") {
    setError(phone, "*Không được để trống số phone");
  } else if (!phoneValue.match(validationPhone)) {
    setError(phone, "*Vui lòng nhập đúng định dạng số phone");
  } else {
    setSuccess(phone);
  }
}

let btnCreateStudent = document.getElementById("btnCreateStudent");
btnCreateStudent.addEventListener("click", function (event) {
  event.preventDefault();
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let btnSelectCourseOfCourse = document.getElementById("courseName");
  btnSelectCourseOfCourse.innerHTML = "";
  arrayCourses.forEach((course) => {
    btnSelectCourseOfCourse.innerHTML += `
    <option value="${course.courseId}">${course.courseName}</option>    
    `;
  });
});


function getToClass() {
  let courseNameOfStudentSelect =
    document.getElementById("courseName").value;
  console.log("courseNameOfStudentSelect---->", courseNameOfStudentSelect);
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let className = document.getElementById("className");
  className.innerHTML = "";
  listCourse.forEach((course) => {
    if (course.courseId === courseNameOfStudentSelect) {
      course.arrayClass.forEach((classOfCourse) => {
        className.innerHTML += `
            <option value="${classOfCourse.classId}">${classOfCourse.className}</option> `;
      });
    }
  });
}
function getToClassUpdate(){
  let listCourse = localStorage.getItem("arrayCourses")
  ? JSON.parse(localStorage.getItem("arrayCourses"))
  : [];
  let courseNameUpdate=document.getElementById("courseNameUpdate").value;
  let classNameUpdate = document.getElementById("classNameUpdate");
  classNameUpdate.innerHTML = "";
  listCourse.forEach(course=>{
    if(course.courseId===courseNameUpdate){
      course.arrayClass.forEach(classOfCourse=>{
        classNameUpdate.innerHTML+=`
        <option value="${classOfCourse.classId}">${classOfCourse.className}</option>        
        `;
      })
    }
  })

}

let btnAddData = document.getElementById("btnAddData");
btnAddData.addEventListener("click", function (event) {
  event.preventDefault();
  addData();
});

//CheckTrungID
function checkLookId(studentCheckID) {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      for (
        let k = 0;
        k < arrayCourses[i].arrayClass[j].arrayStudent.length;
        k++
      ) {
        if (
          arrayCourses[i].arrayClass[j].arrayStudent[k].studentId ===
          studentCheckID
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

//Get Data
function getDataForm() {
  let studentId = document.getElementById("studentId").value.trim();
  let studentName = document.getElementById("studentName").value.trim();
  let year = document.getElementById("year").value.trim();
  let address = document.getElementById("address").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let status = document.getElementById("status").value.trim();

  let studentOfCLass = {
    studentId: studentId,
    studentName: studentName,
    year: year,
    address: address,
    email: email,
    phone: phone,
    status: status,
  };
  return studentOfCLass;
}
// Hàm lấy thông tin danh mục theo ID
function checkCourseID(arrayCourses, className) {
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      if (arrayCourses[i].arrayClass[j].classId === className) {
        return i;
      }
    }
  }
  return -1;
}
// Hàm lấy thông tin danh mục theo StudentID
function checkCourseIDOfStudentID(arrayCourses, studentId) {
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      for (
        let k = 0;
        k < arrayCourses[i].arrayClass[j].arrayStudent.length;
        k++
      ) {
        if (
          arrayCourses[i].arrayClass[j].arrayStudent[k].studentId === studentId
        ) {
          return i;
        }
      }
    }
  }
  return -1;
}

// Hàm lấy thông tin danh mục theo ID
function checkClassID(arrayCourses, className) {
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      if (arrayCourses[i].arrayClass[j].classId === className) {
        return j;
      }
    }
  }
  return -1;
}
// Hàm lấy thông tin danh mục theo ID
function checkClassIDOfStudentID(arrayCourses, studentId) {
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      for (
        let k = 0;
        k < arrayCourses[i].arrayClass[j].arrayStudent.length;
        k++
      ) {
        if (
          arrayCourses[i].arrayClass[j].arrayStudent[k].studentId === studentId
        ) {
          return j;
        }
      }
    }
  }
  return -1;
}
// Hàm lấy thông tin danh mục theo ID
function checkStudentID(arrayCourses, studentId) {
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      for (
        let k = 0;
        k < arrayCourses[i].arrayClass[j].arrayStudent.length;
        k++
      ) {
        if (
          arrayCourses[i].arrayClass[j].arrayStudent[k].studentId === studentId
        ) {
          return k;
        }
      }
    }
  }
  return -1;
}

//Add Data
function addData() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  validateForm();
  myModalAddData.show();
  let errorMessage = document.querySelectorAll("div .error-message");
  let arrayErrorMessage = [];
  for (let i = 0; i < errorMessage.length; i++) {
    arrayErrorMessage.push(errorMessage[i].innerText);
  }
  let isCheckErrorMessage = arrayErrorMessage.every((value) => value === "");
  let studentIdValue = document.getElementById("studentId").value;
  if (isCheckErrorMessage) {
    //Lấy dữ liệu trên form Class
    let newClass = getDataForm();
    //Lấy dữ liệu của className
    let classNameID = document.getElementById("className").value;
    //Lấy chỉ số của course
    let courseIndex = checkCourseID(listCourse, classNameID);
    //Lấy chỉ số của class
    let classIndex = checkClassID(listCourse, classNameID);
    // console.log("classIIndex------>", classID);
    if (classIndex >= 0) {
      //Thêm sinh viên vào lớp học tương ứng
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent.unshift(
        newClass
      );
      //Đè giữ liệu vào
      localStorage.setItem("arrayCourses", JSON.stringify(listCourse));
      resetForm();
      myModalAddData.hide();
      //Render Data
      listStudentRender = getListStudent(listCourse);
      renderData(1, listStudentRender);
      showToastSuccess();
    }
  }
}

//Reset error
function resetError() {
  let errorMessage = document.querySelectorAll("div .error-message");
  for (let i = 0; i < errorMessage.length; i++) {
    errorMessage[i].innerText = "";
  }
}
//ResetForm
function resetForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("year").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("inActive").selected = true;
  document.getElementById("studentId").readOnly = false;
  let optionFirst = document.getElementById("className");
  if (optionFirst.length != 0) {
    optionFirst[0].selected = true;
  }
}
let currentPage = 1;
//Số dữ liệu muốn render trên table
let recordsPerPage = 10;
//RenderData
function renderData(page, listStudent) {
  //Lấy dữ liệu từ local lên
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let pageMax = getTotalPage(listStudent);
  if (page < 1) {
    page = 1;
  }
  if (page > pageMax) {
    page = pageMax;
  }
  let indexMinOnPage = (page - 1) * recordsPerPage;
  if (indexMinOnPage <= 0) {
    indexMinOnPage = 0;
  }
  let indexMaxOnPage;
  if (page * recordsPerPage > listStudent.length) {
    indexMaxOnPage = listStudent.length;
  } else {
    indexMaxOnPage = page * recordsPerPage;
  }
  //Render dữ liệu
  let tbody = document.getElementById("content");
  tbody.innerHTML = "";
  if (indexMaxOnPage >= 1) {
    for (let i = indexMinOnPage; i < indexMaxOnPage; i++) {
      if (listStudent.length >= 1) {
        var statusCheck = listStudent[i].status;
        var statusLabel;
        if (statusCheck == 0) {
          statusLabel = "Đang chờ lớp học";
        } else if (statusCheck == 1) {
          statusLabel = "Đang học";
        } else if (statusCheck == 2) {
          statusLabel = "Bảo lưu/ Đình chỉ";
        } else {
          statusLabel = "Đã tốt nghiệp";
        }

        let courseIndex = checkCourseIDOfStudentID(
          listCourse,
          listStudent[i].studentId
        );
        let classIndex = checkClassIDOfStudentID(
          listCourse,
          listStudent[i].studentId
        );
        let classNameNow =
          listCourse[courseIndex].arrayClass[classIndex].className;

        tbody.innerHTML += `
        <tr>
            <td class="text-center">${i + 1}</td>
            <td>${listStudent[i].studentId}</td>
            <td>${listStudent[i].studentName}</td>
            <td>${classNameNow}</td>
            <td>${listStudent[i].year}</td>
            <td>${listStudent[i].address}</td>
            <td>${listStudent[i].email}</td>
            <td>${listStudent[i].phone}</td>
            <td>${statusLabel}</td>
            <td class="text-center">
                <button class="btn btn-warning"id="btnEdit" onclick="editData('${
                  listStudent[i].studentId
                }')"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn btn-danger" id="btnDelete" onclick="deleteData('${
                  listStudent[i].studentId
                }')"><i class="fa-solid fa-trash"></i></button>            
            </td>

        </tr>       
        `;

        //Render ra các trang
        let listPage = document.getElementById("listPage");
        listPage.innerHTML = "";
        listPage.innerHTML += `
        <li  class="page-item ${currentPage <= 1 ? "disabled" : ""}">
          <a class="page-link" href="javascript:previewPage()" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
      `;
        for (let i = 1; i <= pageMax; i++) {
          listPage.innerHTML += `
          <li class="page-item ${currentPage === i ? "active" : ""}">
            <a class="page-link" href="javascript:clickPage(${i})">${i}</a>
          </li>
        `;
        }
        listPage.innerHTML += `
        <li class="page-item ${currentPage >= pageMax ? "disabled" : ""}">
          <a class="page-link" href="javascript:nextPage()" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      `;
      }
    }
  }
}

// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page, listStudent) {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  currentPage = page;
  listStudent = getListStudent(listCourse);
  if (listStudentRender.length == 0) {
    listStudentRender = listStudent;
  }
  renderData(page, listStudentRender);
}

// Hàm previewPage
function previewPage() {
  currentPage--;
  // render lại dữ liệu lên table
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  listStudent = getListStudent(listCourse);
  if (listStudentRender.length == 0) {
    listStudentRender = listStudent;
  }
  renderData(currentPage, listStudentRender);
}
// Hàm nextPage
function nextPage() {
  currentPage++;
  // render lại dữ liệu lên table
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  listStudent = getListStudent(listCourse);
  if (listStudentRender.length == 0) {
    listStudentRender = listStudent;
  }
  renderData(currentPage, listStudentRender);
}

// Hàm tính tổng số trang trên tổng dữ liệu
function getTotalPage(listStudent) {
  return Math.ceil(listStudent.length / recordsPerPage);
}

//Đẩy dữ liệu lên form
function editData(id) {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];

  let btnSelectCourseUpdate=document.getElementById("courseNameUpdate");
  btnSelectCourseUpdate.innerHTML="";
  listCourse.forEach(course=>{
    btnSelectCourseUpdate.innerHTML+=`
    <option value="${course.courseId}">${course.courseName}</option>
    `;
  })
  //Lấy chỉ số của student
  let courseOfClassOfStudentID = checkStudentID(listCourse, id);
  //Lấy chỉ số của class
  let classIndex = checkClassIDOfStudentID(listCourse, id);
  //Lấy chỉ số của course
  let courseIndex = checkCourseIDOfStudentID(listCourse, id);

  if (classIndex >= 0 && courseIndex >= 0 && courseOfClassOfStudentID >= 0) {
    let classNameUpdate = document.getElementById("classNameUpdate");
    classNameUpdate.innerHTML = "";
    listCourse.forEach((course) => {
      course.arrayClass.forEach((courseOfClass) => {
        classNameUpdate.innerHTML += `
      <option value="${courseOfClass.classId}">${courseOfClass.className}</option>       
      `;
      });
    });

    myModalUpdateData.show();
    document.getElementById("studentIdUpdate").value =
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].studentId;
    document.getElementById("studentNameUpdate").value =
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].studentName;
    document.getElementById("yearUpdate").value =
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].year;
    document.getElementById("addressUpdate").value =
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].address;
    document.getElementById("emailUpdate").value =
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].email;
    document.getElementById("phoneUpdate").value =
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].phone;
    document.getElementById("studentIdUpdate").readOnly = true;

    if (
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].status == "0"
    ) {
      document.getElementById("inActiveUpdate").selected = true;
    } else if (
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].status == "1"
    ) {
      document.getElementById("activeUpdate").selected = true;
    } else if (
      listCourse[courseIndex].arrayClass[classIndex].arrayStudent[
        courseOfClassOfStudentID
      ].status == "2"
    ) {
      document.getElementById("reserveUpdate").selected = true;
    } else {
      document.getElementById("endUpdate").selected = true;
    }

    let classNameUpdateSelected = document.getElementById("classNameUpdate");
    for (let i = 0; i < classNameUpdateSelected.length; i++) {
      if (
        classNameUpdateSelected[i].value ===
        listCourse[courseIndex].arrayClass[classIndex].classId
      ) {
        classNameUpdateSelected[i].selected = true;
      }
    }

    let courseNameUpdateSelected=document.getElementById("courseNameUpdate");
    for (let i = 0; i < courseNameUpdateSelected.length; i++) {
      if(courseNameUpdateSelected[i].value===listCourse[courseIndex].courseId){
        courseNameUpdateSelected[i].selected=true;
      }
      
    }
  }
}

//Update Data
function updateData() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let update = getDataFormUpdate();

  // Tìm vị trí hiện tại của Student thông qua studentIdUpdate

  let studentIdUpdate = document.getElementById("studentIdUpdate").value;
  //Lấy chỉ số của student
  let studentIDNow = checkStudentID(listCourse, studentIdUpdate);

  //Lấy chỉ số của class
  let classIDNow = checkClassIDOfStudentID(listCourse, studentIdUpdate);
  //Lấy chỉ số của course
  let courseIDNow = checkCourseIDOfStudentID(listCourse, studentIdUpdate);

  //Lấy dữ liệu của className sau khi thay đổi
  let classNameUpdate = document.getElementById("classNameUpdate").value;
  //Lấy chỉ số của course sau khi className thay đổi
  let courseIDChange = checkCourseID(listCourse, classNameUpdate);
  //Lấy chỉ số của class sau khi className thay đổi
  let classIDChange = checkClassID(listCourse, classNameUpdate);
  //
  validateFormUpdate();
  let errorMessage = document.querySelectorAll("div .error-message");
  let arrayErrorMessage = [];
  for (let m = 0; m < errorMessage.length; m++) {
    arrayErrorMessage.push(errorMessage[m].innerText);
  }
  let isCheckErrorMessage = arrayErrorMessage.every((value) => value === "");

  if (courseIDChange >= 0 && classIDChange >= 0 && isCheckErrorMessage) {
    //Xóa vị trí hiện tại của arrayClass đi
    listCourse[courseIDNow].arrayClass[classIDNow].arrayStudent.splice(
      studentIDNow,
      1
    );
    //Add vào arrayClass bị thay đổi
    // arrayCourses[id].arrayClass.unshift(update);
    listCourse[courseIDChange].arrayClass[classIDChange].arrayStudent.unshift(
      update
    );
    //Đè dữ liệu vào local
    localStorage.setItem("arrayCourses", JSON.stringify(listCourse));
    resetFormUpdate();
    myModalUpdateData.hide();
    listStudentRender = getListStudent(listCourse);
    renderData(1, listStudentRender);
    showToastUpdateSuccess(); 
  }
}

let btnUpdate = document.getElementById("btnUpdate");
btnUpdate.addEventListener("click", function () {
  updateData();
});

//Validate Form Update
function validateFormUpdate() {
  let studentIdUpdate = document.getElementById("studentIdUpdate");
  let studentNameUpdate = document.getElementById("studentNameUpdate");
  let yearUpdate = document.getElementById("yearUpdate");
  let addressUpdate = document.getElementById("addressUpdate");
  let emailUpdate = document.getElementById("emailUpdate");
  let phoneUpdate = document.getElementById("phoneUpdate");

  let studentIdUpdateValue = document.getElementById("studentIdUpdate").value;
  let studentNameUpdateValue =
    document.getElementById("studentNameUpdate").value;
  let yearUpdateValue = document.getElementById("yearUpdate").value;
  let addressUpdateValue = document.getElementById("addressUpdate").value;
  let emailUpdateValue = document.getElementById("emailUpdate").value;
  let phoneUpdateValue = document.getElementById("phoneUpdate").value;
  let validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // let validationPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  let validationPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  if (studentIdUpdateValue == "") {
    setError(studentIdUpdate, "*Không được để trống mã sinh viên");
  } else {
    setSuccess(studentIdUpdate);
  }

  if (studentNameUpdateValue == "") {
    setError(studentNameUpdate, "*Không được để trống tên sinh viên");
  } else {
    setSuccess(studentNameUpdate);
  }
  if (yearUpdateValue == "") {
    setError(yearUpdate, "*Không được để năm sinh");
  } else if (!Number(yearUpdateValue) || Number(yearUpdateValue) < 1995) {
    setError(
      yearUpdate,
      "*Vui lòng nhập năm sinh là số và có giá trị lớn hơn 1995"
    );
  } else {
    setSuccess(yearUpdate);
  }
  if (addressUpdateValue == "") {
    setError(addressUpdate, "*Không được để trống địa chỉ");
  } else {
    setSuccess(addressUpdate);
  }
  if (emailUpdateValue == "") {
    setError(emailUpdate, "*Không được để trống email");
  } else if (!emailUpdateValue.match(validationEmail)) {
    setError(emailUpdate, "*Vui lòng nhập đúng định dạng email");
  } else {
    setSuccess(emailUpdate);
  }
  if (phoneUpdateValue == "") {
    setError(phoneUpdate, "*Không được để trống số phone");
  } else if (!phoneUpdateValue.match(validationPhone)) {
    setError(phoneUpdate, "*Vui lòng nhập đúng định dạng số phone");
  } else {
    setSuccess(phoneUpdate);
  }
}

//Get Data
function getDataFormUpdate() {
  let studentIdUpdate = document.getElementById("studentIdUpdate").value.trim();
  let studentNameUpdate = document
    .getElementById("studentNameUpdate")
    .value.trim();
  let yearUpdate = document.getElementById("yearUpdate").value.trim();
  let addressUpdate = document.getElementById("addressUpdate").value.trim();
  let emailUpdate = document.getElementById("emailUpdate").value.trim();
  let phoneUpdate = document.getElementById("phoneUpdate").value.trim();
  let statusUpdate = document.getElementById("statusUpdate").value.trim();
  let studentOfCLass = {
    studentId: studentIdUpdate,
    studentName: studentNameUpdate,
    year: yearUpdate,
    address: addressUpdate,
    email: emailUpdate,
    phone: phoneUpdate,
    status: statusUpdate,
  };
  return studentOfCLass;
}

//ResetForm
function resetFormUpdate() {
  document.getElementById("studentIdUpdate").value = "";
  document.getElementById("studentNameUpdate").value = "";
  document.getElementById("yearUpdate").value = "";
  document.getElementById("addressUpdate").value = "";
  document.getElementById("emailUpdate").value = "";
  document.getElementById("phoneUpdate").value = "";
  document.getElementById("inActiveUpdate").selected = true;
  document.getElementById("studentIdUpdate").readOnly = false;
  let optionFirst = document.getElementById("classNameUpdate");
  if (optionFirst.length != 0) {
    optionFirst[0].selected = true;
  }
}

// Delete Data
function deleteData(id) {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  ModalDeleteStudent.show();
  let btnDeleteStudentYes = document.getElementById("btnDeleteStudentYes");
  let btnDeleteStudentNo = document.getElementById("btnDeleteStudentNo");
  btnDeleteStudentYes.onclick = function () {
    //Lấy chỉ số của student
    let studentIDNow = checkStudentID(listCourse, id);
    //Lấy chỉ số của class
    let classIDNow = checkClassIDOfStudentID(listCourse, id);
    //Lấy chỉ số của course
    let courseIDNow = checkCourseIDOfStudentID(listCourse, id);
    if (studentIDNow >= 0 && classIDNow >= 0 && courseIDNow >= 0) {
      listCourse[courseIDNow].arrayClass[classIDNow].arrayStudent.splice(
        studentIDNow,
        1
      );
      localStorage.setItem("arrayCourses", JSON.stringify(listCourse));
      listStudentRender = getListStudent(listCourse);
      renderData(1, listStudentRender);
      ModalDeleteStudent.hide();
      showToastDeleteSuccess();
    }
  };
  btnDeleteStudentNo.onclick = function () {
    ModalDeleteStudent.hide();
  };
}

function logOut() {
  localStorage.removeItem("userLogin");
  window.location.href = "login.html";
}

//Check Login
function checkLogin() {
  let email = localStorage.getItem("userLogin");
  if (email == null) {
    window.location.href = "login.html";
  }
}
//Load checkLogin()
document.onload = checkLogin();
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

//Search Data
function searchData() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let listStudent = getListStudent(listCourse);
  console.log("listStudent trc khi filter", listStudent);
  let search = document.getElementById("search").value.trim();
  let searchToLowerCase = search.toLowerCase();

  var filterData = listStudent.filter((value) =>
    value.studentName.toLowerCase().includes(searchToLowerCase)
  );
  localStorage.setItem("searchCStudent", JSON.stringify(filterData));
  let searchCStudent = localStorage.getItem("searchCStudent")
    ? JSON.parse(localStorage.getItem("searchCStudent"))
    : [];
    let divNotFound=document.querySelector(".divNotFound");
    let divTable=document.querySelector(".divTable");
  listStudentRender = searchCStudent;
  if(listStudentRender.length==0){
    divTable.classList.remove("show");
    divTable.classList.add("hide");
    divNotFound.classList.remove("hide");
    divNotFound.classList.add("show");
  }else{
    divTable.classList.remove("hide");
    divTable.classList.add("show");
    divNotFound.classList.remove("show");
    divNotFound.classList.add("hide");
    console.log("listStudent sau khi filter", listStudentRender);
    renderData(1, listStudentRender);
  }
}
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  searchData();
});

// Sắp xếp Data
function handSortStudent() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let btnSelectValue = document.getElementById("btnSelect").value;
  console.log("btnSelectValue", btnSelectValue);
  let listStudent = getListStudent(listCourse);
  console.log("listStudent khi chưa handal là", listStudent);
  switch (btnSelectValue) {
    case "defaultCourse":
      document.onload = renderData(1, listStudent);
      break;
    case "AZ":
      listStudent.sort((a, b) =>
        a.studentName > b.studentName
          ? 1
          : a.studentName < b.studentName
          ? -1
          : 0
      );
      break;
    case "ZA":
      listStudent.sort((a, b) =>
        a.studentName > b.studentName
          ? -1
          : a.studentName < b.studentName
          ? 1
          : 0
      );
      break;
  }
  localStorage.setItem("handSortStudent", JSON.stringify(listStudent));
  let handSortRender = localStorage.getItem("handSortStudent")
    ? JSON.parse(localStorage.getItem("handSortStudent"))
    : [];
  listStudentRender = handSortRender;
  console.log("Sau khi handSortStudent là", listStudentRender);
  renderData(1, handSortRender);
}
let modalCloseAddData = document.getElementById("myModalAddData");
modalCloseAddData.addEventListener("hide.bs.modal", function () {
  resetError();
  resetForm();
});
let myModalCloseUpdateData = document.getElementById("myModalUpdateData");
myModalCloseUpdateData.addEventListener("hide.bs.modal", function () {
  resetError();
  resetForm();
});

function showToastSuccess(){
  let toastLiveShow = document.getElementById('liveToastCreateSuccess');
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 1000;
    setTimeout(() => {
      toastBootstrap.hide();
    }, autoCloseTimeout);
}

//Show Update Success
function showToastUpdateSuccess(){
  let toastLiveShow = document.getElementById('liveToastUpdateSuccess');
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 1000;
    setTimeout(() => {
      toastBootstrap.hide();
    }, autoCloseTimeout);
}

//Show Delete Success
function showToastDeleteSuccess(){
  let toastLiveShow = document.getElementById('liveToastDeleteSuccess');
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 1000;
    setTimeout(() => {
      toastBootstrap.hide();
    }, autoCloseTimeout);
}
function getListStudent(listCourseOfClass) {
  let listStudentLoad = [];
  listCourseOfClass.forEach((courseItem) => {
    courseItem.arrayClass.forEach((classItem) => {
      classItem.arrayStudent.forEach((studentItem) => {
        listStudentLoad.push(studentItem);
      });
    });
  });
  return listStudentLoad;
}

let listStudent = getListStudent(listSumCourses);
document.onload = renderData(1, listStudent);
