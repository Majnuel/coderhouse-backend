const socket = io.connect();

const sendNewProduct = document.getElementById("sendNewProduct");
const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const thumbnailInput = document.getElementById("thumbnailInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const messageButton = document.getElementById("messageButton");

socket.emit("ask4Products");

socket.on("refreshList", (list) => {
  renderProducts("tableBody", list);
});

socket.on("emitNewMessage", (newMessage) => {
  renderMessages("messages", newMessage);
});

const renderProducts = (parentId, data) => {
  const newContent = data
    .map((item) => {
      return `<tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><img src=${item.thumbnail} style= "height: 40px"></td>
        </tr>
        `;
    })
    .join(" ");
  document.getElementById(`${parentId}`).innerHTML = newContent;
};

const renderMessages = (parentId, data) => {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div>
  <span>* ${data.author}</span>
  <span>(@${data.time}):</span>
  <span>${data.msg}</span>
  </div>`;
  document.getElementById(`${parentId}`).appendChild(newDiv);
};

sendNewProduct.addEventListener("click", () => {
  const newProduct = {
    name: nameInput.value,
    price: priceInput.value,
    thumbnail: thumbnailInput.value,
  };
  socket.emit("newProduct", newProduct);
});

messageButton.addEventListener("click", () => {
  if (emailInput.value === "") {
    alert("Debe ingresar un email para utilizar el chat");
  } else if (messageInput.value === "") {
    alert("Debe ingresar mensaje");
  } else {
    const newMessage = {
      msg: messageInput.value,
      email: emailInput.value,
    };
    socket.emit("newMessage", newMessage);
  }
});
