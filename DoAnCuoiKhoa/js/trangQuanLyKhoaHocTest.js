var listSumCourse = localStorage.getItem("arrayCourses")
  ? JSON.parse(localStorage.getItem("arrayCourses"))
  : [];
var listCourseRender = [];
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
var myModalUpdateData = new bootstrap.Modal(
  document.getElementById("myModalUpdateData"),
  {
    keyboard: false,
  }
);
var ModalDeleteCourse = new bootstrap.Modal(
  document.getElementById("ModalDeleteCourse"),
  {
    keyboard: false,
  }
);
let currentPage = 1;
//Số dữ liệu muốn render trên table
let recordsPerPage = 10;

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
  let courseId = document.getElementById("courseId");
  let courseName = document.getElementById("courseName");
  let courseTime = document.getElementById("courseTime");
  let courseIdValue = document.getElementById("courseId").value;
  let courseNameValue = document.getElementById("courseName").value;
  let courseTimeValue = document.getElementById("courseTime").value;
  let isCheckCourseIdNow = checkLookCourseId(courseIdValue);
  let isCheckCourseNameNow = checkLookCourseName(courseNameValue);
  if (courseIdValue == "") {
    setError(courseId, "*Không được để trống mã khóa học");
  } else if (isCheckCourseIdNow) {
    setError(courseId, "*Mã khóa học đã bị tồn tại,vui lòng nhập lại");
  } else {
    setSuccess(courseId);
  }
  if (courseNameValue == "") {
    setError(courseName, "*Không được để trống tên khóa học");
  } else if (isCheckCourseNameNow) {
    setError(courseName, "*Tên khóa học đã bị tồn tại,vui lòng nhập lại");
  } else {
    setSuccess(courseName);
  }
  if (courseTimeValue == "") {
    setError(courseTime, "*Không được để trống thời gian");
  } else if (!Number(courseTimeValue) || Number(courseTimeValue) < 0) {
    setError(
      courseTime,
      "*Vui lòng nhập thời gian học là số và có giá trị lớn hơn 0"
    );
  } else {
    setSuccess(courseTime);
  }
}
// validateFormUpdate
function validateFormUpdate() {
  let courseName = document.getElementById("courseNameUpdate");
  let courseTime = document.getElementById("courseTimeUpdate");
  let courseIdValue = document.getElementById("courseIdUpdate").value;
  let courseNameValue = document.getElementById("courseNameUpdate").value;
  let courseTimeValue = document.getElementById("courseTimeUpdate").value;
  let statusValue=document.getElementById("statusUpdate").value;
  let arrayCourses = localStorage.getItem("arrayCourses")
  ? JSON.parse(localStorage.getItem("arrayCourses"))
  : [];
  // console.log("arrayCourses---->",arrayCourses);
  // localStorage.setItem("arrayCourses",JSON.stringify(arrayCourses));
  //   console.log("Sau khi update====>",JSON.parse(localStorage.getItem("arrayCourses")));
  // let isCheckCourseIdNow = checkLookCourseId(courseIdValue);
  // let isCheckCourseNameNow = checkLookCourseName(courseNameValue);
  // if (courseNameValue == "") {
    
  // } 
  arrayCourses.forEach(course=>{  
    if(course.courseId===courseIdValue && course.courseName===courseNameValue){
      // course.courseId=courseIdValue;
      // course.courseName=courseNameValue;
      // course.courseTime=courseTimeValue;
      // course.status=statusValue; 
      setSuccess(courseName);
    } else if(course.courseId!=courseIdValue && course.courseName===courseNameValue){
      setError(courseName, "*Tên khóa học đã bị tồn tại,vui lòng nhập lại");
    }else if(courseNameValue == ""){
      setError(courseName, "*Không được để trống tên khóa học");
    }
  })
  // else if(isCheckCourseIdNow && isCheckCourseNameNow) {
  //   setSuccess(courseName);
  // }
  // else if (isCheckCourseIdNow==false) {
  //   if(isCheckCourseNameNow==true){
  //     setError(courseName, "*Tên khóa học đã bị tồn tại,vui lòng nhập lại");
  //   }
  // }
  // // else {
  // //   setSuccess(courseName);
  // // }
  if (courseTimeValue == "") {
    setError(courseTime, "*Không được để trống thời gian");
  } else if (!Number(courseTimeValue) || Number(courseTimeValue) < 0) {
    setError(
      courseTime,
      "*Vui lòng nhập thời gian học là số và có giá trị lớn hơn 0"
    );
  } else {
    setSuccess(courseTime);
  }
}
//Add Data
function addData() {
  let arrayCourses = localStorage.getItem("arrayCourses")
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
  let courseIdValue = document.getElementById("courseId").value;
  console.log("courseIdValue---->", courseIdValue);

  if (isCheckErrorMessage) {
    let newCourse = getDataForm();
    arrayCourses.unshift(newCourse);
    localStorage.setItem("arrayCourses", JSON.stringify(arrayCourses));
    //Render Data
    listCourseRender = getListCourse(arrayCourses);
    renderData(1, listCourseRender);
    resetForm();
    myModalAddData.hide();
    showToastSuccess();
  }
}

function showToastSuccess() {
  let toastLiveShow = document.getElementById("liveToastCreateSuccess");
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 1000;
  setTimeout(() => {
    toastBootstrap.hide();
  }, autoCloseTimeout);
}
function showToastError() {
  let toastLiveShow = document.getElementById("liveToastDeleteError");
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 1000;
  setTimeout(() => {
    toastBootstrap.hide();
  }, autoCloseTimeout);
}

//Check Xem đã có mã khóa học nào tồn tại trong list khóa học hay chưa
function checkLookCourseId(courseIdNew) {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  for (let i = 0; i < arrayCourses.length; i++) {
    if (arrayCourses[i].courseId === courseIdNew) {
      return true;
    }
  }
  return false;
}
//Check Xem đã có tên khóa học nào tồn tại trong list khóa học hay chưa
function checkLookCourseName(courseNameNew) {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  for (let i = 0; i < arrayCourses.length; i++) {
    if (arrayCourses[i].courseName === courseNameNew) {
      return true;
    }
  }
  return false;
}

let modalCloseAddData = document.getElementById("myModalAddData");
modalCloseAddData.addEventListener("hide.bs.modal", function () {
  resetError();
  resetForm();
  document.getElementById("courseId").readOnly = false;
});
let modalCloseUpdateData = document.getElementById("myModalUpdateData");
modalCloseUpdateData.addEventListener("hide.bs.modal", function () {
  resetError();
  document.getElementById("courseId").readOnly = false;
});

function resetError() {
  let errorMessage = document.querySelectorAll("div .error-message");
  for (let i = 0; i < errorMessage.length; i++) {
    errorMessage[i].innerText = "";
  }
}
//Get Data
function getDataForm() {
  let courseId = document.getElementById("courseId").value.trim();
  let courseName = document.getElementById("courseName").value.trim();
  let courseTime = document.getElementById("courseTime").value.trim();
  let status = document.getElementById("status").value.trim();
  let course = {
    courseId: courseId,
    courseName: courseName,
    courseTime: courseTime,
    status: status,
    arrayClass: [],
    // arrayClass: [],
  };
  return course;
}
function getDataFormUpdate() {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let courseIdUpdate = document.getElementById("courseIdUpdate").value.trim();
  let courseNameUpdate = document
    .getElementById("courseNameUpdate")
    .value.trim();
  let courseTimeUpdate = document
    .getElementById("courseTimeUpdate")
    .value.trim();
  let statusUpdate = document.getElementById("statusUpdate").value.trim();
  let indexID = checkID(arrayCourses, courseIdUpdate);
  let arrayClass = arrayCourses[indexID].arrayClass;
  let courseUpdate = {
    courseId: courseIdUpdate,
    courseName: courseNameUpdate,
    courseTime: courseTimeUpdate,
    status: statusUpdate,
    arrayClass,
  };
  return courseUpdate;
}
//ResetForm
function resetForm() {
  document.getElementById("courseId").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("courseTime").value = "";
  document.getElementById("inActive").selected = true;
  document.getElementById("courseId").readOnly = false;
}
//RenderData

function renderData(page, listCourse) {
  let pageMax = getTotalPage(listCourse);
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
  if (page * recordsPerPage > listCourse.length) {
    indexMaxOnPage = listCourse.length;
  } else {
    indexMaxOnPage = page * recordsPerPage;
  }
  let tbody = document.getElementById("content");
  tbody.innerHTML = "";
  if (indexMaxOnPage != 0) {
    for (let i = indexMinOnPage; i < indexMaxOnPage; i++) {
      if (listCourse.length >= 1) {
        let statusCheck = listCourse[i].status;
        let statusLabel;
        if (statusCheck == 0) {
          statusLabel = "Chưa hoạt động";
        } else if (statusCheck == 1) {
          statusLabel = "Đang hoạt động";
        } else {
          statusLabel = "Đã kết thúc";
        }
        tbody.innerHTML += `
            <tr>
                <td class="text-center">${i + 1}</td>
                <td class="text-start">${listCourse[i].courseId}</td>
                <td>${listCourse[i].courseName}</td>         
                <td>${listCourse[i].courseTime}</td>
                <td>${statusLabel}</td>
                <td class="text-center">
                    <button class="btn btn-warning"id="btnEdit" onclick="editData('${
                      listCourse[i].courseId
                    }')"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="btn btn-danger" id="btnDelete" onclick="deleteData('${
                      listCourse[i].courseId
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
function clickPage(page, listCourse) {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  listCourse = getListCourse(arrayCourses);
  currentPage = page;
  if (listCourseRender.length == 0) {
    listCourseRender = listCourse;
  }
  renderData(page, listCourseRender);
}

// Hàm previewPage
function previewPage() {
  currentPage--;
  //render lại dữ liệu lên table
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let listCourse = getListCourse(arrayCourses);
  if (listCourseRender.length == 0) {
    listCourseRender = listCourse;
  }
  renderData(currentPage, listCourseRender);
}
// Hàm nextPage
function nextPage() {
  currentPage++;
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let listCourse = getListCourse(arrayCourses);
  if (listCourseRender.length == 0) {
    listCourseRender = listCourse;
  }
  renderData(currentPage, listCourseRender);
}

// Hàm tính tổng số trang trên tổng dữ liệu
function getTotalPage(listCourse) {
  return Math.ceil(listCourse.length / recordsPerPage);
}
//Đẩy dữ liệu lên form
function editData(id) {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let i = checkID(arrayCourses, id);
  // console.log("checkID--->", i);
  if (i >= 0) {
    myModalUpdateData.show();
    document.getElementById("courseIdUpdate").value = arrayCourses[i].courseId;
    document.getElementById("courseIdUpdate").readOnly = true;
    document.getElementById("courseNameUpdate").value =
      arrayCourses[i].courseName;
    document.getElementById("courseTimeUpdate").value =
      arrayCourses[i].courseTime;
    if (arrayCourses[i].status == "0") {
      document.getElementById("inActiveUpdate").selected = true;
    } else if (arrayCourses[i].status == "1") {
      document.getElementById("activeUpdate").selected = true;
    } else {
      document.getElementById("endUpdate").selected = true;
    }
  }
}
//Update Data
function updateData() {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let update = getDataFormUpdate();
  let i = checkID(arrayCourses, update.courseId);
  validateFormUpdate();
  let errorMessage = document.querySelectorAll("div .error-message");
  let arrayErrorMessage = [];
  for (let i = 0; i < errorMessage.length; i++) {
    arrayErrorMessage.push(errorMessage[i].innerText);
  }
  let isCheckErrorMessage = arrayErrorMessage.every((value) => value === "");

  if (i > -1 && isCheckErrorMessage) {
    arrayCourses[i] = update;
    localStorage.setItem("arrayCourses", JSON.stringify(arrayCourses));
    resetForm();
    myModalUpdateData.hide();
    listCourseRender = getListCourse(arrayCourses);
    renderData(1, arrayCourses);
    showToastUpdateSuccess();
  }
}
//Show Update Success
function showToastUpdateSuccess() {
  let toastLiveShow = document.getElementById("liveToastUpdateSuccess");
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 1000;
  setTimeout(() => {
    toastBootstrap.hide();
  }, autoCloseTimeout);
}

let btnUpdateData = document.getElementById("btnUpdateData");
btnUpdateData.addEventListener("click", function (event) {
  event.preventDefault();
  updateData();
});

// Delete Data
function deleteData(id) {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  ModalDeleteCourse.show();
  let btnDeleteCourseYes = document.getElementById("btnDeleteCourseYes");
  let btnDeleteCourseNo = document.getElementById("btnDeleteCourseNo");
  btnDeleteCourseYes.onclick = function () {
    let i = checkID(arrayCourses, id);
    if (arrayCourses[i].arrayClass.length >= 1) {
      ModalDeleteCourse.hide();
      showToastError();
    } else {
      arrayCourses.splice(i, 1);
      localStorage.setItem("arrayCourses", JSON.stringify(arrayCourses));
      listCourseRender = getListCourse(arrayCourses);
      renderData(1, arrayCourses);
      ModalDeleteCourse.hide();
      showToastDeleteSuccess();
    }
  };
  btnDeleteCourseNo.onclick = function () {
    ModalDeleteCourse.hide();
  };
}

//Show Delete Success
function showToastDeleteSuccess() {
  let toastLiveShow = document.getElementById("liveToastDeleteSuccess");
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveShow);
  toastBootstrap.show();
  let autoCloseTimeout = 1000;
  setTimeout(() => {
    toastBootstrap.hide();
  }, autoCloseTimeout);
}

//Search Data
function searchData() {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let listCourse = getListCourse(arrayCourses);
  let search = document.getElementById("search").value.trim();
  let searchToLowerCase = search.toLowerCase();
  let filterData = listCourse.filter((value) =>
    value.courseName.toLowerCase().includes(searchToLowerCase)
  );
  localStorage.setItem("searchCourse", JSON.stringify(filterData));
  let searchCourse = localStorage.getItem("searchCourse")
    ? JSON.parse(localStorage.getItem("searchCourse"))
    : [];
  listCourseRender = searchCourse;
  let divNotFound = document.querySelector(".divNotFound");
  let divTable = document.querySelector(".divTable");
  if (listCourseRender.length == 0) {
    divTable.classList.remove("show");
    divTable.classList.add("hide");
    divNotFound.classList.remove("hide");
    divNotFound.classList.add("show");
  } else {
    divTable.classList.remove("hide");
    divTable.classList.add("show");
    divNotFound.classList.remove("show");
    divNotFound.classList.add("hide");
    console.log("filterData----->", searchCourse);
    renderData(1, listCourseRender);
  }
}
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  searchData();
});

// Sắp xếp Data
function handSortCourse() {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let listCourse = getListCourse(arrayCourses);
  let btnSelectValue = document.getElementById("btnSelect").value;

  console.log("btnSelectValue", btnSelectValue);
  switch (btnSelectValue) {
    case "defaultCourse":
      window.onload = renderData(1, listCourse);
      break;
    case "AZ":
      listCourse.sort((a, b) =>
        a.courseName > b.courseName ? 1 : a.courseName < b.courseName ? -1 : 0
      );
      break;
    case "ZA":
      listCourse.sort((a, b) =>
        a.courseName > b.courseName ? -1 : a.courseName < b.courseName ? 1 : 0
      );
      break;
  }
  localStorage.setItem("handSortCourse", JSON.stringify(listCourse));
  let handSortRender = localStorage.getItem("handSortCourse")
    ? JSON.parse(localStorage.getItem("handSortCourse"))
    : [];
  console.log("Sắp xếp mảng theo", handSortRender);
  renderData(1, handSortRender);
}

// Hàm lấy thông tin danh mục theo ID
function checkID(arrayCourses, id) {
  for (let i = 0; i < arrayCourses.length; i++) {
    if (arrayCourses[i].courseId === id) {
      return i;
    }
  }
  return -1;
}
//Add dữ liệu
let btnAddData = document.getElementById("btnAddData");
btnAddData.addEventListener("click", function (event) {
  event.preventDefault();
  addData();
});

//Check trùng ID
function checkCourseID(ID) {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  for (let i = 0; i < arrayCourses.length; i++) {
    if (arrayCourses[i].courseId == ID) {
      return true;
    }
  }
  return false;
}
//LogOut
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
//Check Login
function checkLogin() {
  let email = localStorage.getItem("userLogin");
  if (email == null) {
    window.location.href = "login.html";
  }
}
//Load checkLogin()
document.onload = checkLogin();

//Load tất cả các dữ liệu của course lên trang
function getListCourse(listCourse) {
  let listCourseLoad = [];
  listCourse.forEach((courseItem) => {
    listCourseLoad.push(courseItem);
  });
  return listCourseLoad;
}
listCourseRender = getListCourse(listSumCourse);
console.log("listCourse", listCourseRender);
document.onload = renderData(1, listCourseRender);
