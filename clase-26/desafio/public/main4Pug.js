const socket = io.connect();
const { schema, denormalize } = normalizr;

const author = new schema.Entity("author", {}, { idAttribute: "email" });
let user;

const msge = new schema.Entity(
  "message",
  {
    author: author,
  },
  { idAttribute: "_id" }
);

const finalSchema = new schema.Array(msge);

function denormalizeData(data) {
  const denormalizedData = denormalize(data.result, finalSchema, data.entities);
  // console.log("denormalized data: ", denormalizedData);
  return denormalizedData;
}

// const sendNewProduct = document.getElementById("sendNewProduct");

const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const thumbnailInput = document.getElementById("thumbnailInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const firstNameInput = document.getElementById("nombreInput");
const lastNameInput = document.getElementById("apellidoInput");
const ageInput = document.getElementById("edadInput");
const akaInput = document.getElementById("aliasInput");
const avatarInput = document.getElementById("avatarInput");
const messagesTableBody = document.getElementById("messagestTableBody");
const productsTableBody = document.getElementById("productsTableBody");
const messagesTableDiv = document.getElementById("messagesTableDiv");
const logoutBtn = document.getElementById("logoutBtn");

const messageButton = document.getElementById("messageButton");

const tableRow = document.createElement("tr");

// ask for faker-products upon load:
socket.emit("ask4Products");

// ask for chat-history upon load:
socket.emit("ask4ChatHistory");

// render chat history if any is found:
socket.on("sendChatHistoryToClient", (messages) => {
  const messageHistory = denormalizeData(messages);

  messageHistory.forEach((message) => {
    const newTableRow = document.createElement("tr");
    const newTD1 = document.createElement("td");
    const newTD2 = document.createElement("td");
    const newTD3 = document.createElement("td");
    newTD1.textContent = message.author.email;
    newTD2.textContent = message.author.nombre;
    newTD3.textContent = message.text;
    newTableRow.appendChild(newTD1);
    newTableRow.appendChild(newTD2);
    newTableRow.appendChild(newTD3);
    messagesTableBody.appendChild(newTableRow);
  });
});

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

// fetching products generated with faker on the back-end:
fetch("/api/productos-test")
  .then((response) => response.json())
  .then((data) => {
    // console.log("faker data: ", data);

    data.forEach((product) => {
      const newTableRow = document.createElement("tr");
      const newTD1 = document.createElement("td");
      const newTD2 = document.createElement("td");
      const newTD3 = document.createElement("td");
      const imgTag = document.createElement("img");
      newTD1.textContent = product.name;
      newTD2.textContent = product.price;
      imgTag.setAttribute("src", product.thumbnail);
      newTD3.appendChild(imgTag);
      newTableRow.appendChild(newTD1);
      newTableRow.appendChild(newTD2);
      newTableRow.appendChild(newTD3);
      productsTableBody.appendChild(newTableRow);
    });
  });

messageButton.addEventListener("click", () => {
  if (emailInput.value === "") {
    alert("Debe ingresar un email para utilizar el chat");
  } else if (messageInput.value === "") {
    alert("Debe ingresar mensaje");
  } else {
    const newMessage = {
      author: {
        email: emailInput.value,
        nombre: firstNameInput.value,
        apellido: lastNameInput.value,
        edad: ageInput.value,
        alias: akaInput.value,
        avatar: avatarInput.value,
      },
      text: messageInput.value,
    };
    socket.emit("newMessage", newMessage);
  }
});

// logoutBtn.addEventListener("click", () => {
//   console.log("logout clicked");
//   try {
//     fetch("/logout").then((response) => {
//       console.log(response);
//     });
//     // .then(() => (location.href = "/login"));
//   } catch (err) {
//     console.log(err);
//   }
// });
