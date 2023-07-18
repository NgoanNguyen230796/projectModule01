var listSumCourses = localStorage.getItem("arrayCourses")
  ? JSON.parse(localStorage.getItem("arrayCourses"))
  : [];
var listClassRender = [];
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

var ModalDeleteClass = new bootstrap.Modal(
  document.getElementById("ModalDeleteClass"),
  {
    keyboard: false,
  }
);
// Delete Data
function deleteData(id) {
  let listClass = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  ModalDeleteClass.show();
  let btnDeleteYes = document.getElementById("btnDeleteClassYes");
  let btnDeleteNo = document.getElementById("btnDeleteClassNo");
  btnDeleteYes.onclick = function () {
    let idCourseFind = checkCourseOfClassID(listClass, id);
    let idClassFind = checkClassID(listClass, id);
    if (
      listClass[idCourseFind].arrayClass[idClassFind].arrayStudent.length >= 1
    ) {
      showToastError();
      ModalDeleteClass.hide();
    } else {
      showToastDeleteSuccess();
      listClass[idCourseFind].arrayClass.splice(idClassFind, 1);
      localStorage.setItem("arrayCourses", JSON.stringify(listClass));
      listClassRender = getListClass(listClass);
      renderData(1, listClassRender);
      console.log("listClassRender sau khi xóa là", listClassRender);
      ModalDeleteClass.hide();
    }
  };
  btnDeleteNo.onclick = function () {
    ModalDeleteClass.hide();
  };
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

let classId = document.getElementById("classId");
let className = document.getElementById("className");
let lecturer = document.getElementById("lecturer");
let descriptions = document.getElementById("descriptions");
let totalNumber = document.getElementById("totalNumber");
let status = document.getElementById("status");

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

function validateForm() {
  let classIdValue = document.getElementById("classId").value;
  let classNameValue = document.getElementById("className").value;
  let lecturerValue = document.getElementById("lecturer").value;
  let descriptionsValue = document.getElementById("descriptions").value;
  let totalNumberValue = document.getElementById("totalNumber").value;
  let isCheckClassIdNow = checkLookClassId(classIdValue);
  let isCheckClassNameNow = checkLookClassName(classNameValue);
  if (classIdValue == "") {
    setError(classId, "*Không được để trống mã lớp học");
  } else if (isCheckClassIdNow) {
    setError(classId, "*Mã lớp học đã bị tồn tại,vui lòng nhập lại");
  } else {
    setSuccess(classId);
  }

  if (classNameValue == "") {
    setError(className, "*Không được để trống tên lớp học");
  } else if (isCheckClassNameNow) {
    setError(className, "*Tên lớp học đã bị tồn tại,vui lòng nhập lại");
  } else {
    setSuccess(className);
  }
  if (lecturerValue == "") {
    setError(lecturer, "*Không được để trống tên giảng viên");
  } else {
    setSuccess(lecturer);
  }
  if (descriptionsValue == "") {
    setError(descriptions, "*Không được để trống phần mô tả");
  } else {
    setSuccess(descriptions);
  }

  if (totalNumberValue == "") {
    setError(totalNumber, "*Không được để trống sĩ số");
  } else if (!Number(totalNumberValue) || Number(totalNumberValue) < 0) {
    setError(
      totalNumber,
      "*Vui lòng nhập sĩ số lớp học là số và có giá trị lớn hơn 0"
    );
  } else {
    setSuccess(totalNumber);
  }
}

let btnCreateClass = document.getElementById("btnCreateClass");
btnCreateClass.addEventListener("click", function () {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let courseName = document.getElementById("courseName");
  courseName.innerHTML = "";
  arrayCourses.forEach((course) => {
    courseName.innerHTML += `
      <option value="${course.courseId}">${course.courseName}</option>       
      `;
  });
});

let modalCloseAddData = document.getElementById("myModalAddData");
modalCloseAddData.addEventListener("hide.bs.modal", function () {
  resetError();
  resetForm();
});

//ResetForm
function resetForm() {
  document.getElementById("classId").value = "";
  document.getElementById("className").value = "";
  document.getElementById("lecturer").value = "";
  document.getElementById("descriptions").value = "";
  document.getElementById("totalNumber").value = "";
  document.getElementById("inActive").selected = true;
  let optionFirst = document.getElementById("courseName");
  if (optionFirst.length != 0) {
    optionFirst[0].selected = true;
  }
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
  let classIdValue = document.getElementById("classId").value;
  console.log("OK");

  if (isCheckErrorMessage) {
    //Lấy dữ liệu trên form Class
    let newClass = getDataForm();
    //Lấy dữ liệu của courseName
    let courseNameID = document.getElementById("courseName").value;
    //Thêm lớp vào khóa học mà nó thuộc về
    let id = checkID(listCourse, courseNameID);
    console.log("id------>", id);
    if (id >= 0) {
      //Thêm lớp vào khóa học
      listCourse[id].arrayClass.unshift(newClass);
    }
    //Đè giữ liệu vào
    localStorage.setItem("arrayCourses", JSON.stringify(listCourse));
    resetForm();
    myModalAddData.hide();
    //Render Data
    listClassRender = getListClass(listCourse);
    console.log("listClassRender sau khi thêm mới", listClassRender);
    renderData(1, listClassRender);
    showToastSuccess();
  }
}

//CheckTrungID
function checkLookClassId(classIdNow) {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  for (let i = 0; i < listCourse.length; i++) {
    for (let j = 0; j < listCourse[i].arrayClass.length; j++) {
      if (listCourse[i].arrayClass[j].classId === classIdNow) {
        return true;
      }
    }
  }
  return false;
}
//CheckTrungID
function checkLookClassName(classNameNow) {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  for (let i = 0; i < listCourse.length; i++) {
    for (let j = 0; j < listCourse[i].arrayClass.length; j++) {
      if (listCourse[i].arrayClass[j].className === classNameNow) {
        return true;
      }
    }
  }
  return false;
}

//Reset error
function resetError() {
  let errorMessage = document.querySelectorAll("div .error-message");
  for (let i = 0; i < errorMessage.length; i++) {
    errorMessage[i].innerText = "";
  }
}

//Get Data
function getDataForm() {
  let classId = document.getElementById("classId").value.trim();
  let className = document.getElementById("className").value.trim();
  let lecturer = document.getElementById("lecturer").value.trim();
  let descriptions = document.getElementById("descriptions").value.trim();
  let totalNumber = document.getElementById("totalNumber").value.trim();
  let status = document.getElementById("status").value.trim();

  let courseClass = {
    classId: classId,
    className: className,
    lecturer: lecturer,
    descriptions: descriptions,
    totalNumber: totalNumber,
    status: status,
    arrayStudent: [],
  };
  return courseClass;
}

// Hàm lấy thông tin danh mục theo ID
function checkID(listCourse, courseID) {
  for (let i = 0; i < listCourse.length; i++) {
    if (listCourse[i].courseId === courseID) {
      return i;
    }
  }
  return -1;
}

let currentPage = 1;
//Số dữ liệu muốn render trên table
let recordsPerPage = 10;
//RenderData
function renderData(page, listClass) {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let pageMax = getTotalPage(listClass);
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
  if (page * recordsPerPage > listClass.length) {
    indexMaxOnPage = listClass.length;
  } else {
    indexMaxOnPage = page * recordsPerPage;
  }
  let tbody = document.getElementById("content");
  tbody.innerHTML = "";
  for (let i = indexMinOnPage; i < indexMaxOnPage; i++) {
    if (listClass.length >= 1) {
      var statusCheck = listClass[i].status;
      var statusLabel;
      if (statusCheck == 0) {
        statusLabel = "Đang chờ lớp học";
      } else if (statusCheck == 1) {
        statusLabel = "Đang hoạt động lớp học";
      } else {
        statusLabel = "Đã kết thúc lớp học";
      }
      let courseIndex = checkCourseOfClassID(listCourse, listClass[i].classId);
      // let classIndex = checkClassID(listCourse, listClass[i].classId);
      let courseNameNow = listCourse[courseIndex].courseName;
      tbody.innerHTML += `
          <tr>
              <td>${i + 1}</td>
              <td class="text-start">${listClass[i].classId}</td>
              <td class="text-start">${listClass[i].className}</td>         
              <td>${courseNameNow}</td>     
              <td class="text-start">${listClass[i].lecturer}</td>
              <td class="text-start">${listClass[i].descriptions}</td>
              <td>${listClass[i].totalNumber}</td>
              <td class="text-start">${statusLabel}</td>
              <td class="text-center">
                  <button class="btn btn-warning" onclick="editData('${
                    listClass[i].classId
                  }')"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button class="btn btn-danger" onclick="deleteData('${
                    listClass[i].classId
                  }')"><i class="fa-solid fa-trash"></i></button>            
              </td>
  
          </tr>       
          `;
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
// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page, listClass) {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  currentPage = page;
  listClass = getListClass(listCourse);
  if (listClassRender.length == 0) {
    listClassRender = listClass;
  }
  renderData(page, listClassRender);
}

// Hàm previewPage
function previewPage() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  currentPage--;
  let listClass = getListClass(listCourse);
  if (listClassRender.length == 0) {
    listClassRender = listClass;
  }
  renderData(currentPage, listClassRender);
}
// Hàm nextPage
function nextPage() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  currentPage++;

  let listClass = getListClass(listCourse);
  if (listClassRender.length == 0) {
    listClassRender = listClass;
  }
  renderData(currentPage, listClassRender);
}

//Hàm tính tổng số trang trên tổng dữ liệu
function getTotalPage(listClass) {
  // Sao đây lại la listCourse em nhỉ? Nó phải là class chứ
  return Math.ceil(listClass.length / recordsPerPage);
}
let btnAddData = document.getElementById("btnAddData");
btnAddData.addEventListener("click", function (event) {
  event.preventDefault();
  addData();
});

//Đẩy dữ liệu lên form
function editData(id) {
  let listClass = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let i = checkCourseOfClassID(listClass, id);
  let j = checkClassID(listClass, id);
  console.log("checkID--->", i);
  if (i >= 0 && j >= 0) {
    let courseNameUpdate = document.getElementById("courseNameUpdate");
    courseNameUpdate.innerHTML = "";
    listClass.forEach((course) => {
      courseNameUpdate.innerHTML += `
      <option value="${course.courseId}">${course.courseName}</option>       
      `;
    });
    myModalUpdateData.show();
    document.getElementById("classIdUpdate").value =
      listClass[i].arrayClass[j].classId;
    document.getElementById("classIdUpdate").readOnly = true;
    document.getElementById("classNameUpdate").value =
      listClass[i].arrayClass[j].className;
    document.getElementById("lecturerUpdate").value =
      listClass[i].arrayClass[j].lecturer;
    document.getElementById("descriptionsUpdate").value =
      listClass[i].arrayClass[j].descriptions;
    document.getElementById("totalNumberUpdate").value =
      listClass[i].arrayClass[j].totalNumber;

    if (listClass[i].arrayClass[j].status == "0") {
      document.getElementById("inActiveUpdate").selected = true;
    } else if (listClass[i].arrayClass[j].status == "1") {
      document.getElementById("activeUpdate").selected = true;
    } else {
      document.getElementById("endUpdate").selected = true;
    }
    let courseNameUpdateCheck = document.getElementById("courseNameUpdate");
    courseNameUpdateCheck[i].selected = true;
  }
}

//Update Data
function updateData() {
  let listClass = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let update = getDataFormUpdate();
  //Lấy dữ liệu của courseName
  let courseNameUpdateID = document.getElementById("courseNameUpdate").value;
  let id = checkID(listClass, courseNameUpdateID);
  //Lấy dữ liệu của classIdUpdate
  let classIdUpdate = document.getElementById("classIdUpdate").value;
  let i = checkCourseOfClassID(listClass, classIdUpdate);
  let j = checkClassID(listClass, classIdUpdate);
  validateFormUpdate();
  let errorMessage = document.querySelectorAll("div .error-message");
  let arrayErrorMessage = [];
  for (let m = 0; m < errorMessage.length; m++) {
    arrayErrorMessage.push(errorMessage[m].innerText);
  }
  let isCheckErrorMessage = arrayErrorMessage.every((value) => value === "");

  if (id >= 0 && isCheckErrorMessage) {
    //Xóa vị trí hiện tại của arrayClass đi
    listClass[i].arrayClass.splice(j, 1);
    //Add vào arrayClass bị thay đổi
    listClass[id].arrayClass.unshift(update);
    //Đè dữ liệu vào local
    localStorage.setItem("arrayCourses", JSON.stringify(listClass));
    resetFormUpdate();
    myModalUpdateData.hide();
    listClassRender = getListClass(listClass);
    console.log("listClassRender sau khi update", listClassRender);
    renderData(1, listClassRender);
    showToastUpdateSuccess();
  }
}

//Hàm check ID của Class
function checkClassID(arrayCourses, classId) {
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      if (arrayCourses[i].arrayClass[j].classId == classId) {
        return j;
      }
    }
  }
  return -1;
}
//Hàm check ID của Class
function checkCourseOfClassID(arrayCourses, classId) {
  for (let i = 0; i < arrayCourses.length; i++) {
    for (let j = 0; j < arrayCourses[i].arrayClass.length; j++) {
      if (arrayCourses[i].arrayClass[j].classId == classId) {
        return i;
      }
    }
  }
  return -1;
}

let myModalUpdateDataUpdate = document.getElementById("myModalUpdateData");
myModalUpdateDataUpdate.addEventListener("hide.bs.modal", function () {
  resetError();
  resetFormUpdate();
});

//ResetForm
function resetFormUpdate() {
  document.getElementById("classIdUpdate").value = "";
  document.getElementById("classIdUpdate").readOnly = false;
  document.getElementById("classNameUpdate").value = "";
  document.getElementById("lecturerUpdate").value = "";
  document.getElementById("descriptionsUpdate").value = "";
  document.getElementById("totalNumberUpdate").value = "";
  let courseNameUpdateCheck = document.getElementById("courseNameUpdate");
  if (courseNameUpdateCheck.length != 0) {
    courseNameUpdateCheck[0].selected = true;
    document.getElementById("inActiveUpdate").selected = true;
  }
}

//Validate Form Update
function validateFormUpdate() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let classNameUpdate = document.getElementById("classNameUpdate");
  let lecturerUpdate = document.getElementById("lecturerUpdate");
  let descriptionsUpdate = document.getElementById("descriptionsUpdate");
  let totalNumberUpdate = document.getElementById("totalNumberUpdate");

  let classIdUpdateValue = document.getElementById("classIdUpdate").value;
  let classNameUpdateValue = document
    .getElementById("classNameUpdate")
    .value.trim();
  let lecturerUpdateValue = document
    .getElementById("lecturerUpdate")
    .value.trim();
  let descriptionsUpdateValue = document
    .getElementById("descriptionsUpdate")
    .value.trim();
  let totalNumberUpdateValue = document
    .getElementById("totalNumberUpdate")
    .value.trim();
  listCourse.forEach((course) => {
    course.arrayClass.forEach((classOfCourse) => {
      if (
        classOfCourse.classId === classIdUpdateValue &&
        classOfCourse.className === classNameUpdateValue
      ) {
        setSuccess(classNameUpdate);
      } else if (
        classOfCourse.classId != classIdUpdateValue &&
        classOfCourse.className === classNameUpdateValue
      ) {
        setError(
          classNameUpdate,
          "*Tên lớp học đã bị tồn tại,vui lòng nhập lại"
        );
      } else if (classNameUpdateValue == "") {
        setError(classNameUpdate, "*Không được để trống tên lớp học");
      }
    });
  });

  if (lecturerUpdateValue == "") {
    setError(lecturerUpdate, "*Không được để trống tên giảng viên");
  } else {
    setSuccess(lecturerUpdate);
  }
  if (descriptionsUpdateValue == "") {
    setError(descriptionsUpdate, "*Không được để trống phần mô tả");
  } else {
    setSuccess(descriptionsUpdate);
  }
  if (totalNumberUpdateValue == "") {
    setError(totalNumberUpdate, "*Không được để trống sĩ số");
  } else if (
    !Number(totalNumberUpdateValue) ||
    Number(totalNumberUpdateValue) < 0
  ) {
    setError(
      totalNumberUpdate,
      "*Vui lòng nhập sĩ số lớp học là số và có giá trị lớn hơn 0"
    );
  } else {
    setSuccess(totalNumberUpdate);
  }
}

//Get Data
function getDataFormUpdate() {
  let arrayCourses = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];

  //Lấy dữ liệu của classIdUpdate
  let classIdUpdate = document.getElementById("classIdUpdate").value.trim();
  let classNameUpdate = document.getElementById("classNameUpdate").value.trim();
  let lecturerUpdate = document.getElementById("lecturerUpdate").value.trim();
  let descriptionsUpdate = document
    .getElementById("descriptionsUpdate")
    .value.trim();
  let totalNumberUpdate = document
    .getElementById("totalNumberUpdate")
    .value.trim();
  let statusUpdate = document.getElementById("statusUpdate").value.trim();
  let classIdUpdateCheck = document.getElementById("classIdUpdate").value;
  let i = checkCourseOfClassID(arrayCourses, classIdUpdateCheck);
  let j = checkClassID(arrayCourses, classIdUpdateCheck);
  let arrayStudent = arrayCourses[i].arrayClass[j].arrayStudent;
  let courseClassUpdate = {
    classId: classIdUpdate,
    className: classNameUpdate,
    lecturer: lecturerUpdate,
    descriptions: descriptionsUpdate,
    totalNumber: totalNumberUpdate,
    status: statusUpdate,
    arrayStudent,
  };
  return courseClassUpdate;
}
let btnUpdate = document.getElementById("btnUpdate");
btnUpdate.addEventListener("click", function () {
  updateData();
});

//Search Data
function searchData() {
  let listCourse = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let listClass = getListClass(listCourse);
  console.log("listClass Trc Khi Search", listClass);
  let search = document.getElementById("search").value.trim();
  let searchToLowerCase = search.toLowerCase();
  var filterData = listClass.filter((value) =>
    value.className.toLowerCase().includes(searchToLowerCase)
  );
  if (searchToLowerCase == 0) {
    document.onload = renderData(1, listClass);
  }
  localStorage.setItem("searchClass", JSON.stringify(filterData));
  let searchClass = localStorage.getItem("searchClass")
    ? JSON.parse(localStorage.getItem("searchClass"))
    : [];
  let divNotFound = document.querySelector(".divNotFound");
  let divTable = document.querySelector(".divTable");
  listClassRender = searchClass;
  if (listClassRender.length == 0) {
    divTable.classList.remove("show");
    divTable.classList.add("hide");
    divNotFound.classList.remove("hide");
    divNotFound.classList.add("show");
  } else {
    divTable.classList.remove("hide");
    divTable.classList.add("show");
    divNotFound.classList.remove("show");
    divNotFound.classList.add("hide");
    console.log("filterData", listClassRender);
    renderData(1, listClassRender);
  }
}

let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  searchData();
});

// Sắp xếp Data
function handSortClass() {
  let listClassFirst = localStorage.getItem("arrayCourses")
    ? JSON.parse(localStorage.getItem("arrayCourses"))
    : [];
  let listClass = getListClass(listClassFirst);
  console.log("listClassFirst khi chưa sắp xếp là", listClass);
  let btnSelectValue = document.getElementById("btnSelect").value;
  console.log("btnSelectValue là", btnSelectValue);
  switch (btnSelectValue) {
    case "defaultCourse":
      document.onload = renderData(1, listClass);
      break;
    case "AZ":
      listClass.sort((a, b) =>
        a.className > b.className ? 1 : a.className < b.className ? -1 : 0
      );
      break;
    case "ZA":
      listClass.sort((a, b) =>
        a.className > b.className ? -1 : a.className < b.className ? 1 : 0
      );
      break;
  }
  localStorage.setItem("handSortClass", JSON.stringify(listClass));
  let handSortRender = localStorage.getItem("handSortClass")
    ? JSON.parse(localStorage.getItem("handSortClass"))
    : [];
  console.log("handSortClass sau khi sắp xếp là", handSortRender);
  renderData(1, handSortRender);
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

function getListClass(listCourseOfClass) {
  let listClassLoad = [];
  listCourseOfClass.forEach((courseItem) => {
    courseItem.arrayClass.forEach((classItem) => {
      listClassLoad.push(classItem);
    });
  });
  return listClassLoad;
}

let listClass = getListClass(listSumCourses);
console.log("listClass", listClass);
document.onload = renderData(1, listClass);
