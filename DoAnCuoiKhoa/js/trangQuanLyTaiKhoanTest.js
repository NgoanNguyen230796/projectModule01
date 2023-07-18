var myModalLogOut = new bootstrap.Modal(
    document.getElementById("myModalLogOut"),
    {
      keyboard: false,
    }
  );
  var myModalUserSystemClock = new bootstrap.Modal(
    document.getElementById("myModalUserSystemClock"),
    {
      keyboard: false,
    }
  );
  var myModalUserSystemUnClock = new bootstrap.Modal(
    document.getElementById("myModalUserSystemUnClock"),
    {
      keyboard: false,
    }
  );
  
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
  
  let currentPage = 1;
  //Số dữ liệu muốn render trên table
  let recordsPerPage = 10;
  //RenderData
  function renderData(page, listUser) {
    let pageMax = getTotalPage(listUser);
    if (page < 1) {
      page = 1;
    }
    if (page > pageMax) {
      page = pageMax;
    }
    let indexMinOnPage = (page - 1) * recordsPerPage;
    let indexMaxOnPage;
    if (page * recordsPerPage > listUser.length) {
      indexMaxOnPage = listUser.length;
    } else {
      indexMaxOnPage = page * recordsPerPage;
    }
    let tbody = document.getElementById("content");
    tbody.innerHTML = "";
        for (let i = indexMinOnPage; i < indexMaxOnPage; i++) {
          if(listUser.length!=0){     
            let statusCheck = listUser[i].status;
            let statusLabel;
            if (statusCheck == "active") {
              statusLabel = "Đang hoạt động";
            } else if (statusCheck == "inActive") {
              statusLabel = "Đang bị khóa";
            }
            tbody.innerHTML += `
                <tr>
                    <td class="text-center">${i + 1}</td>
                    <td>${listUser[i].email}</td>
                    <td>${listUser[i].password}</td>         
                    <td>${listUser[i].fullName}</td>
                    <td>${statusLabel}</td>
                    <td class="text-center">
                        <button class="btn btn-danger" onclick="userSystemClock('${listUser[i].email}')"><i class="fa-solid fa-lock"></i></button>
                        <button class="btn btn-warning"onclick="userSystemUnClock('${listUser[i].email}')"><i class="fa-solid fa-unlock"></i></button>            
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

  // Hàm render dữ liệu theo trang khi click vào các trang
  function clickPage(page) {
    currentPage = page;
    let arrayUserSystem = localStorage.getItem("userSystem")
      ? JSON.parse(localStorage.getItem("userSystem"))
      : [];
    renderData(page, arrayUserSystem);
  }
  
  // Hàm previewPage
  function previewPage() {
    currentPage--;
    // render lại dữ liệu lên table
    let arrayUserSystem = localStorage.getItem("userSystem")
      ? JSON.parse(localStorage.getItem("userSystem"))
      : [];
    renderData(currentPage, arrayUserSystem);
  }
  // Hàm nextPage
  function nextPage() {
    currentPage++;
    let arrayUserSystem = localStorage.getItem("userSystem")
      ? JSON.parse(localStorage.getItem("userSystem"))
      : [];
    renderData(currentPage, arrayUserSystem);
  }
  
  function renderPage() {
    let arrayUserSystem = localStorage.getItem("userSystem")
      ? JSON.parse(localStorage.getItem("userSystem"))
      : [];
    let totalPage = getTotalPage(arrayUserSystem);
    // let pagination =document.
  }
  // Hàm tính tổng số trang trên tổng dữ liệu
  function getTotalPage(listUser) {
    return Math.ceil(listUser.length / recordsPerPage);
  }
  
  //userSystemClock
  function userSystemClock(email) {
    let arrayUserSystem = localStorage.getItem("userSystem")
    ? JSON.parse(localStorage.getItem("userSystem"))
    : [];
    myModalUserSystemClock.show();
    let buttonYes = document.getElementById("buttonYes");
    let id=checkID(arrayUserSystem,email);
    buttonYes.onclick = function () {
      let arrayUserSystem = localStorage.getItem("userSystem")
        ? JSON.parse(localStorage.getItem("userSystem"))
        : [];
  
      arrayUserSystem[id].status = "inActive";
      localStorage.setItem("userSystem", JSON.stringify(arrayUserSystem));
      myModalUserSystemClock.hide();
      renderData(1, arrayUserSystem);
    };
  }
  function userSystemUnClock(email) {
    let arrayUserSystem = localStorage.getItem("userSystem")
    ? JSON.parse(localStorage.getItem("userSystem"))
    : [];
    myModalUserSystemUnClock.show();
    let btnYesUnClock = document.getElementById("btnYesUnClock");
    let id=checkID(arrayUserSystem,email);
    btnYesUnClock.onclick = function () {
      let arrayUserSystem = localStorage.getItem("userSystem")
        ? JSON.parse(localStorage.getItem("userSystem"))
        : [];
      arrayUserSystem[id].status = "active";
      localStorage.setItem("userSystem", JSON.stringify(arrayUserSystem));
      myModalUserSystemUnClock.hide();
      renderData(1, arrayUserSystem);
    };
  }
  
  //Search Data
  function searchData() {
    let arrayUserSystem = localStorage.getItem("userSystem")
      ? JSON.parse(localStorage.getItem("userSystem"))
      : [];
    let search = document.getElementById("search").value.trim();
    // let searchToLocaleUpperCase =
    //   search.charAt(0).toLocaleUpperCase() + search.slice(1).toLowerCase();
    let searchToLowerCase = search.toLowerCase();
    let filterData = arrayUserSystem.filter((value) =>
      value.email.toLowerCase().includes(searchToLowerCase)
    );
    let divNotFound=document.querySelector(".divNotFound");
    let divTable=document.querySelector(".divTable");
    if(filterData.length==0){
      divTable.classList.remove("show");
      divTable.classList.add("hide");
      divNotFound.classList.remove("hide");
      divNotFound.classList.add("show");
    }else{
      divTable.classList.remove("hide");
      divTable.classList.add("show");
      divNotFound.classList.remove("show");
      divNotFound.classList.add("hide");
      console.log("filterData", filterData);
      console.log("filterData----->", filterData);
      renderData(1, filterData);
    }
 
  }
  
  let btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", function (event) {
    event.preventDefault();
    searchData();
  });
  
  // Sắp xếp Data
  function handSortEmail() {
    let arrayUserSystem = localStorage.getItem("userSystem")
      ? JSON.parse(localStorage.getItem("userSystem"))
      : [];
    let btnSelectValue = document.getElementById("btnSelect").value;
    console.log("btnSelectValue", btnSelectValue);
    switch (btnSelectValue) {
      case "defaultCourse":
        arrayUserSystem.sort((a, b) =>
          a.userID-b.userID
        );
        break;
      case "AZ":
        arrayUserSystem.sort((a, b) =>
          a.email > b.email ? 1 : a.email < b.email ? -1 : 0
        );
        break;
      case "ZA":
        arrayUserSystem.sort((a, b) =>
          a.email > b.email ? -1 : a.email < b.email ? 1 : 0
        );
        break;
    }
    localStorage.setItem("userSystem", JSON.stringify(arrayUserSystem));
    renderData(1, arrayUserSystem);
  }
  
  
  // Hàm lấy thông tin danh mục theo ID
  function checkID(array,email) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].email == email) {
        return i;
      }
    }
    return -1;
  }
  
  //Load renderData
  let userSystem = localStorage.getItem("userSystem")
    ? JSON.parse(localStorage.getItem("userSystem"))
    : [];
  document.onload = renderData(1, userSystem);
  