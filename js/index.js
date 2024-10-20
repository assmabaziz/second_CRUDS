/// <reference types = '../@types/jquery/' />
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDescription = document.getElementById("productDescription");
let productImage = document.getElementById("productImage");
const btnAdd = document.getElementById("btnAdd");
const searchInput = document.getElementById("searchInput");
const btnUppdate = document.getElementById("btnUppdate");
const htmlElements = document.getElementsByTagName("input");
const validationName = document.getElementById("msgName");
const validationPrice = document.getElementById("msgPrice");
const validationCategory = document.getElementById("msgCategory");
const validationDescription = document.getElementById("msgDescription");
const infoToUser = document.getElementById("infoToUser");
let productsList = [];
let indexItem = 0;
let regex = {};
if (JSON.parse(localStorage.getItem("products")) != null) {
  productsList = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}
//=================================================================== add product ========================================
btnAdd.addEventListener("click", function () {
  if (
    regex[productName.id].test(productName.value) &&
    regex[productPrice.id].test(productPrice.value) &&
    regex[productCategory.id].test(productCategory.value)
  ) {
    let product = {
      productName: productName.value,
      productPrice: productPrice.value,
      productCategory: productCategory.value,
      productDescription: productDescription.value,
      productImage: `images/${
        productImage.files[0]?.name
          ? productImage.files[0]?.name
          : "thumb16 (1).jpg"
      }`,
    };
    productsList.push(product);
    uppdateLocalStorage();
    displayProduct();
    clearForm();
  }
});
//=================================================================== clear form ========================================
function clearForm() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;
}
//=================================================================== display product ========================================
function displayProduct() {
  let container = "";
  for (let i = 0; i < productsList.length; i++) {
    container += `<tr class="border-b-2 border-black py-2 text-center" >
                      <td>${i + 1}</td>
                      <td>${productsList[i].productName}</td>
                      <td>${productsList[i].productPrice}</td>
                      <td>${productsList[i].productCategory}</td>
                      <td>${productsList[i].productDescription}</td>
                      <td><img src="${
                        productsList[i].productImage
                      }" class="w-[100px] mx-auto" alt="mobile"></td>
                      <td>
                         <button onClick="deleteProdcut(${i})" class="border-[1px] border-red-500 hover:bg-red-500 hover:text-white rounded-lg py-1 px-2 font-medium">delete</button>
                         <button onClick="setDataProduct(${i})" class="border-[1px] border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg py-1 px-2 font-medium">uppdate</button>
                      </td>
                    </tr> 
        `;
    document.getElementById("data").innerHTML = container;
  }
}
//=================================================================== delete product ========================================
function deleteProdcut(index) {
  productsList.splice(index, 1);
  uppdateLocalStorage();
  displayProduct();
}
function uppdateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(productsList));
}
//=================================================================== search Element ========================================
searchInput.addEventListener("keyup", function () {
  let searchValue = searchInput.value;
  let container = "";
  for (let i = 0; i < productsList.length; i++) {
    if (
      productsList[i].productName
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) {
      container += `<tr class="border-b-2 border-black py-2 text-center" >
        <td>${i + 1}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productDescription}</td>
        <td><img src="${
          productsList[i].productImage
        }" class="w-[100px] mx-auto" alt="mobile"></td>
        <td>
            <button onClick="deleteProdcut(${i})" class="border-[1px] border-red-500 hover:bg-red-500 hover:text-white rounded-lg py-1 px-2 font-medium">delete</button>
            <button onClick="setDataProduct(${i})" class="border-[1px] border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg py-1 px-2 font-medium">uppdate</button>
        </td>
      </tr> 
`;
      document.getElementById("data").innerHTML = container;
    }
  }
});
//=================================================================== function to set data in inputs to uppdate ========================================
function setDataProduct(index) {
  productName.value = productsList[index].productName;
  productPrice.value = productsList[index].productPrice;
  productCategory.value = productsList[index].productCategory;
  productDescription.value = productsList[index].productDescription;
  indexItem = index;

  btnAdd.classList.add("hidden");
  btnUppdate.classList.remove("hidden");
}
//=================================================================== function to uppdate data  ========================================
btnUppdate.addEventListener("click", function () {
  let product = {
    productName: productName.value,
    productPrice: productPrice.value,
    productCategory: productCategory.value,
    productDescription: productDescription.value,
    productImage: `images/${
      productImage.files[0]?.name
        ? productImage.files[0]?.name
        : "thumb16 (1).jpg"
    }`,
  };
  console.log(indexItem);
  productsList.splice(indexItem, 1, product);
  displayProduct();
  uppdateLocalStorage();
  clearForm();
  btnUppdate.classList.add("hidden");
  btnAdd.classList.remove("hidden");
});
//=================================================================== Validation ========================================

for (const element of htmlElements) {
  element.addEventListener("keyup", function () {
    let nextElement = this.nextElementSibling;
    regex = {
      productName: /^[A-Za-z0-9]{3,}$/,
      productPrice: /^[1-9][0-9]$/,
      productCategory: /^(Apple|Sumsung|Oppo|Huawei|Xiaomi)$/i,
    };
    if (regex[this.id].test(this.value)) {
      this.classList.add("bg-green-200");
      this.classList.remove("bg-red-200");
      nextElement.classList.add("hidden");
      return true;
    } else {
      this.classList.remove("bg-green-200");
      this.classList.add("bg-red-200");
      nextElement.classList.remove("hidden");
      return false;
    }
  });
}
