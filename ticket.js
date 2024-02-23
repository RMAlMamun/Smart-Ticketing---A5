const tableData = document.getElementById("tableData");

const seatLeft = document.getElementById("seatLeft");

const seat = document.getElementById("seat");

const ticketMsg = document.getElementById("ticketMessage");

const ticketBtn = document.querySelectorAll("#ticketBtn");

const ticketPrice = 550;

const couponInput = document.getElementById("couponInput");

const totalPrice = document.getElementById("totalPrice");

const grandTotalPrice = document.getElementById("grandTotalPrice");

const couponDiv = document.getElementById("couponDiv");

const couponCodes = ["NEW15", "Couple 20"];

const number = document.getElementById("number");

const discountPrice = document.getElementById("discountPrice");

const discountDiv = document.getElementById("discount");

const couponPercent = {NEW15: 15, Couple_20: 20};

const applyBtn = document.getElementById("applyBtn");

const couponAlert = document.getElementById("couponAlert");

let discount = 0;
let ticketCounter = 0;
ticketBtn.forEach((ticket) => {
  ticket.addEventListener("click", (e) => {
    ticketFunction(e.target);
  });
});

const ticketFunction = (ticket) => {
  if (ticket.classList.contains("bg-green-500")) {
    addErrorMessageBooked(ticket.innerText);
  } else if (ticket.classList.contains("border-green-500")) {
    removeMethod(ticket);
    ticketCounter--;
  } else {
    if (ticketCounter > 3) {
      return false;
    }
    const success = addSuccessMessageBooked(ticket.innerText);
    if (success) {
      ticket.classList.add("border-green-500", "border-4");
      ticketCounter++;
    }
  }

  if (ticketCounter < 4) {
    applyBtn.setAttribute("disabled", true);
    if (couponDiv.childNodes.length > 5) {
      Xcoupon(document.getElementById("Xcbtn"), false);
    }
  }

  if (ticketCounter > 3) {
    applyBtn.removeAttribute("disabled");
  }
};

//message alert of selected seat & remove seat\\

const addErrorMessageBooked = (ticketNumber) => {
  if (ticketMsg.childNodes.length > 0) {
    let valid = 0;
    ticketMsg.childNodes.forEach((singleNode) => {
      if (singleNode.innerText.includes(ticketNumber)) {
        valid = 1;
      }
    });
    if (valid === 0) {
      insertErrorNode(ticketNumber);
      return true;
    }
  } else {
    insertErrorNode(ticketNumber);
    return true;
  }

  return false;
};

const addSuccessMessageBooked = (ticketNumber) => {
  if (ticketMsg.childNodes.length > 0) {
    let valid = 0;
    ticketMsg.childNodes.forEach((singleNode) => {
      if (singleNode.innerText.includes(ticketNumber)) {
        valid = 1;
      }
    });
    if (valid === 0) {
      insertSuccessNode(ticketNumber);
      return true;
    }
  } else {
    insertSuccessNode(ticketNumber);
    return true;
  }

  return false;
};

const insertErrorNode = (ticketNumber) => {
  const msgNode = document.createElement("div");
  msgNode.classList.add("text-red-500");
  msgNode.innerText = `${ticketNumber} is booked`;
  ticketMsg.appendChild(msgNode);
  setTimeout(() => {
    msgNode.remove();
  }, 5000);
};

const insertSuccessNode = (ticketNumber) => {
  //success message\\
  const msgNode = document.createElement("div");
  msgNode.classList.add("text-green-500");
  msgNode.innerText = `${ticketNumber} is added`;
  ticketMsg.appendChild(msgNode);

  setTimeout(() => {
    msgNode.remove();
  }, 5000);

  //new row insert\\
  const tableRow = document.createElement("tr");
  const tableBody1 = document.createElement("td");
  const tableBody2 = document.createElement("td");
  const tableBody3 = document.createElement("td");
  tableBody1.innerText = ticketNumber;
  tableBody2.innerText = "Economoy Specialist";
  tableBody3.innerText = ticketPrice;
  tableRow.classList.add(ticketNumber);
  tableRow.appendChild(tableBody1);
  tableRow.appendChild(tableBody2);
  tableRow.appendChild(tableBody3);

  tableData.appendChild(tableRow);

  //minus from left seat\\

  seatLeft.innerText = parseInt(seatLeft.innerText) - 1;

  //plus into seat\\

  seat.innerText = parseInt(seat.innerText) + 1;

  //total price plus\\

  const total = parseInt(totalPrice.innerText) + ticketPrice;

  totalPrice.innerText = total;

  //grand total amount\\

  grandTotalPrice.innerText =
    parseInt(totalPrice.innerText) -
    (parseInt(totalPrice.innerText) / 100) * discount;
};

const removeMethod = (ticket) => {
  //remove alert message\\
  ticket.classList.remove("border-green-500", "border-4");
  const msgNode = document.createElement("div");
  msgNode.classList.add("text-orange-500");
  msgNode.innerText = `${ticket.innerText} is removed`;
  ticketMsg.appendChild(msgNode);
  setTimeout(() => {
    msgNode.remove();
  }, 5000);

  //plus on left seat\\
  seatLeft.innerText = parseInt(seatLeft.innerText) + 1;

  //minus from seat\\
  seat.innerText = parseInt(seat.innerText) - 1;

  //remove table child\\
  document.querySelectorAll("." + ticket.innerText).forEach((tr) => {
    tr.remove();
  });

  //total price minus\\

  const total = parseInt(totalPrice.innerText) - ticketPrice;

  totalPrice.innerText = total;

  //grand total amount\\
  grandTotalPrice.innerText =
    parseInt(totalPrice.innerText) -
    (parseInt(totalPrice.innerText) / 100) * discount;
};

//coupon validator CHeck\\

const coupon = (btn) => {
  if (couponCodes.includes(couponInput.value)) {
    couponInput.setAttribute("disabled", true);
    btn.innerText = "Applied";
    btn.setAttribute("disabled", true);

    const Xbtn = document.createElement("button");
    Xbtn.classList.add(
      "btn",
      "join-item",
      "bg-red-500",
      "text-white",
      "rounded-box",
      "border-0"
    );
    Xbtn.innerText = "X";

    Xbtn.setAttribute("onclick", "Xcoupon(this)");
    Xbtn.setAttribute("id", "Xcbtn");

    couponDiv.appendChild(Xbtn);
    couponAlert.innerHTML = "";
    //adding discount coupon\\

    const couponCode = couponInput.value.replace(" ", "_");
    discount = couponPercent[couponCode];
    grandTotalPrice.innerText =
      parseInt(totalPrice.innerText) -
      (parseInt(totalPrice.innerText) / 100) * discount;
    discountDiv.classList.remove("hidden");
    discountPrice.innerText = (parseInt(totalPrice.innerText) / 100) * discount;
  } else {
    const alert = document.createElement("span");
    alert.innerText = "Invalid Code";
    alert.classList.add("text-red-500", "text-base");
    couponAlert.appendChild(alert);
  }
};

const Xcoupon = (Xbtn, remove = true) => {
  Xbtn.remove();
  couponInput.removeAttribute("disabled");
  discountDiv.classList.add("hidden");
  applyBtn.innerText = "Apply";
  if (remove) {
    applyBtn.removeAttribute("disabled");
  }

  grandTotalPrice.innerText = totalPrice.innerText;
  discount = 0;
  //   couponDiv.childNodes(2).removeAttribute("disabled");
};

const next = (e) => {
  if (number.value.length > 10) {
    my_modal_1.showModal();
    if (!document.getElementById("numberError").classList.contains("hidden")) {
      document.getElementById("numberError").classList.add("hidden");
    }
  } else {
    document.getElementById("numberError").classList.remove("hidden");
  }
};

document.getElementById("reload").addEventListener("click", () => {
  window.location.href = window.location.href;
});