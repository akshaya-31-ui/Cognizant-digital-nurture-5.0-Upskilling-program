class CommunityEvent {
  constructor(id, name, date, category, availableSeats, totalCost) {
    this.id = id;
    this.name = name; 
    this.date = date;
    this.category = category;
    this.availableSeats = availableSeats;
    this.totalCost = totalCost;
  }
  checkAvailability() {
    return this.availableSeats > 0;
  }
}
let systemEventsCollection = [];
function createRegistrationCounterClosure() {
  let counters = { music: 0, education: 0, social: 0 };
  return {
    increment: function(category) {
      if (counters.hasOwnProperty(category)) {
        counters[category]++;
        return counters[category];
      }
      return 0;
    },
    getCounts: function() { return counters; }
  };
}
const portalCategoryTracker = createRegistrationCounterClosure();
document.addEventListener("DOMContentLoaded", function () {
  alert("Notice: Local Community Portal Module Workspace fully loaded!");
  console.log("Welcome to the Community Portal");

  initializeMockDatabase();
  setupApplicationEventListeners();
  checkAuthenticationState();
});
function initializeMockDatabase() {
  systemEventsCollection.push(new CommunityEvent(1, "Summer Symphony Fest", "2026-07-15", "music", 45, 15.00));
  systemEventsCollection.push(new CommunityEvent(2, "Workshop on Baking Basics", "2026-08-02", "education", 0, 10.00)); 
  systemEventsCollection.push(new CommunityEvent(3, "Jazz under the Moonlight", "2026-06-25", "music", 5, 25.00));
  systemEventsCollection.push(new CommunityEvent(4, "Neighborhood Tree Planting", "2026-06-12", "social", 120, 0.00));
  systemEventsCollection.push(new CommunityEvent(5, "Intro to JavaScript Devs", "2026-09-10", "education", 2, 0.00));
}
function setupApplicationEventListeners() 
{
  document.getElementById("loginForm").addEventListener("submit", handleLoginSubmission);
  document.getElementById("signupForm").addEventListener("submit", handleSignupSubmission);
  document.getElementById("btnLogout").addEventListener("click", handleLogOutAction);
  document.getElementById("categoryFilter").addEventListener("change", handleCategoryFilterChange);
  document.getElementById("quickSearchInput").addEventListener("keydown", handleQuickSearchKeyPress);
  document.getElementById("eventRegisterForm").addEventListener("submit", processFormRegistrationTicket);
  document.getElementById("regMessage").addEventListener("input", handleCharacterCounterMapping);
  document.getElementById("btnFindLocation").addEventListener("click", executeGeolocationScanner);
  document.getElementById("btnClearPreferences").addEventListener("click", clearLocalPreferencesStorage);
  const videoElement = document.getElementById("promoVideo");
  videoElement.addEventListener("canplay", () => {
    document.getElementById("videoStatus").innerText = "✔ Video ready to play";
  });
  window.addEventListener("beforeunload", function (e) {
    if (document.getElementById("regFullName").value !== "") {
      e.preventDefault();
      e.returnValue = "Warning: Form inputs detected. Are you sure you want to exit?";
    }
  });
  document.querySelectorAll(".img-gallery-thumbnail").forEach(imageNode => {
    imageNode.addEventListener("dblclick", function() {
      this.classList.toggle("img-thumbnail-enlarged");
      this.style.transform = this.style.transform === "scale(1.5)" ? "scale(1)" : "scale(1.5)";
      this.style.zIndex = this.style.zIndex === "100" ? "1" : "100";
    });
  });
}
function checkAuthenticationState() {
  const loggedInUser = sessionStorage.getItem("currentUser");
  const isReturningUser = localStorage.getItem("isReturningUser");
  if (loggedInUser) 
  {
    document.getElementById("authContainer").classList.add("d-none");
    const portalNode = document.getElementById("portalDashboard");
    portalNode.classList.remove("d-none");
    const banner = document.getElementById("welcomeBanner");
    if (isReturningUser === "true") 
    {
      banner.innerHTML = `<h3>Welcome User back to CivicHub! <span class="badge bg-danger">Returning Resident</span></h3>`;
    } 
    else 
    {
      banner.innerHTML = `<h3>Welcome ${loggedInUser} to the Community Portal Dashboard</h3>`;
      localStorage.setItem("isReturningUser", "true");
    }
    const preferredCategory = localStorage.getItem("preferredCategory");
    if (preferredCategory) 
    {
      document.getElementById("categoryFilter").value = preferredCategory;
    }
    renderEventCardsData(systemEventsCollection);
  } 
  else 
  {
    document.getElementById("authContainer").classList.remove("d-none");
    document.getElementById("portalDashboard").classList.add("d-none");
  }
}
function handleLoginSubmission(e) 
{
  e.preventDefault();
  const emailVal = document.getElementById("loginEmail").value;
  const derivedUserToken = emailVal.split('@')[0];
  
  sessionStorage.setItem("currentUser", derivedUserToken);
  checkAuthenticationState();
}
function handleSignupSubmission(e) 
{
  e.preventDefault();
  const nameVal = document.getElementById("signupName").value;
  sessionStorage.setItem("currentUser", nameVal);
  checkAuthenticationState();
}
function handleLogOutAction() 
{
  sessionStorage.removeItem("currentUser");
  checkAuthenticationState();
}
function renderEventCardsData(eventsSourceArray) 
{
  const gridContainer = document.getElementById("eventsGridContainer");
  gridContainer.innerHTML = ""; 
  if (eventsSourceArray.length === 0) 
  {
    gridContainer.innerHTML = `<div class="col-12 text-center my-4 text-muted"><p>No active programmatic matching elements discovered.</p></div>`;
    return;
  }
  eventsSourceArray.forEach(item => {
    const colCardNode = document.createElement("div");
    colCardNode.className = "col";
    const isAvailable = item.checkAvailability();
    const statusBadge = isAvailable 
      ? `<span class="badge bg-success">${item.availableSeats} Seats Avail</span>`
      : `<span class="badge bg-danger">Sold Out</span>`;
    colCardNode.innerHTML = `
      <div class="card h-100 shadow-sm eventCard border-0">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-secondary text-uppercase small">${item.category}</span>
            ${statusBadge}
          </div>
          <h5 class="card-title fw-bold text-capitalize">${item.name}</h5>
          <p class="card-text text-muted small"><i class="bi bi-clock me-1"></i> Scheduled: ${item.date}</p>
          <p class="fw-bold text-primary mt-auto fs-5">$${item.totalCost.toFixed(2)}</p>
          <button class="btn btn-sm btn-primary mt-3 w-100 fw-bold btnTriggerReg" 
                  data-event-id="${item.id}" 
                  ${!isAvailable ? 'disabled' : ''}>
            ${isAvailable ? '<i class="bi bi-check-circle-fill me-1"></i> Register' : 'Fully Booked'}
          </button>
        </div>
      </div>
    `;
    colCardNode.querySelector(".btnTriggerReg").addEventListener("click", function() {
      openRegistrationDialogForm(item.id);
    });
    gridContainer.appendChild(colCardNode);
  });
}
function executeQueryFilteringPipeline() 
{
  const selectedCategory = document.getElementById("categoryFilter").value;
  const searchInputVal = document.getElementById("quickSearchInput").value.toLowerCase();
  const clonedEventsList = [...systemEventsCollection];
  const processedOutputCollection = clonedEventsList.filter(event => {
    const matchesCategory = (selectedCategory === "all" || event.category === selectedCategory);
    const matchesSearch = event.name.toLowerCase().includes(searchInputVal);
    return matchesCategory && matchesSearch;
  });
  renderEventCardsData(processedOutputCollection);
}
function handleCategoryFilterChange(e) 
{
  localStorage.setItem("preferredCategory", e.target.value);
  executeQueryFilteringPipeline();
}
function handleQuickSearchKeyPress() 
{
  setTimeout(() => { executeQueryFilteringPipeline(); }, 50);
}
function openRegistrationDialogForm(eventId) 
{
  const targetEvent = systemEventsCollection.find(e => e.id === Number(eventId));
  if (!targetEvent) return;
  document.getElementById("eventRegisterForm").reset();
  document.getElementById("eventRegisterForm").classList.remove("was-validated");
  document.getElementById("formConfirmationOutput").classList.add("d-none");
  document.getElementById("modalAlertBox").className = "d-none";
  document.getElementById("formTargetEventId").value = targetEvent.id;
  document.getElementById("regEventName").value = targetEvent.name;
  document.getElementById("regCategory").value = targetEvent.category;
  console.log("Inspecting Targeted Object Entities entries structures:");
  console.table(Object.entries(targetEvent));
  const modalTargetNode = document.getElementById("registrationModal");
  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalTargetNode);
  modalInstance.show();
}
function handleCharacterCounterMapping(e) 
{
  const currentLength = e.target.value.length;
  document.getElementById("charCounter").innerText = `${currentLength} characters`;
}
function processFormRegistrationTicket(e) 
{
  e.preventDefault();
  const formElement = e.target;
  const alertBox = document.getElementById("modalAlertBox");
  const confirmationOutput = document.getElementById("formConfirmationOutput");
  if (!formElement.checkValidity()) 
  {
    e.stopPropagation();
    formElement.classList.add("was-validated");
    return;
  }
  const eventId = Number(document.getElementById("formTargetEventId").value);
  const targetEventIndex = systemEventsCollection.findIndex(item => item.id === eventId);
  const selectedEvent = systemEventsCollection[targetEventIndex];
  try 
  {
    if (!selectedEvent || selectedEvent.availableSeats <= 0) {
      throw new Error("Registration Failure: No seat elements remaining inside this allocation block.");
    }
    selectedEvent.availableSeats--;
    const updatedCategoryCount = portalCategoryTracker.increment(selectedEvent.category);
    document.getElementById(`count-${selectedEvent.category}`).innerText = 
      `${selectedEvent.category.toUpperCase()}: ${updatedCategoryCount}`;
    confirmationOutput.className = "alert alert-success mt-3 small text-center fw-bold";
    confirmationOutput.value = `✔ Registered successfully to ${selectedEvent.name}!`;
    const packagePayload = {
      applicantName: document.getElementById("regFullName").value,
      applicantEmail: document.getElementById("regEmail").value,
      targetEventCode: eventId,
      bookingTimestamp: new Date().toISOString()
    };
    console.log("Form dispatch transaction string transmission initialization payload:", packagePayload);
    triggerMockFetchPostOperation(packagePayload);
  } 
  catch (errorException) 
  {
    console.error("Runtime Exception Block Trap Intercepted:", errorException.message);
    alertBox.className = "alert alert-danger py-2 px-3 small mb-3 d-block";
    alertBox.innerText = errorException.message;
  }
}
async function triggerMockFetchPostOperation(payloadData) 
{
  const spinner = document.getElementById("loadingSpinner");
  spinner.classList.remove("d-none");
  const apiSimulationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payloadData.applicantName.toLowerCase() === "error") {
        reject(new Error("Database connection interrupted inside isolated server blocks."));
      } else {
        resolve({ status: 201, msg: "Remote payload processed successfully into registration databases." });
      }
    }, 1500); 
  });
  try {
    const backendResult = await apiSimulationPromise;
    console.log("Mock API Response Status Code:", backendResult.status, backendResult.msg);
    executeQueryFilteringPipeline();
    setTimeout(() => {
      const modalTargetNode = document.getElementById("registrationModal");
      const currentModalInstance = bootstrap.Modal.getInstance(modalTargetNode);
      if (currentModalInstance) currentModalInstance.hide();
    }, 1000);
  } 
  catch (apiError) 
  {
    alert("Warning: Asynchronous backend parsing failures encountered: " + apiError.message);
  } 
  finally 
  {
    spinner.classList.add("d-none");
  }
}
function executeGeolocationScanner() 
{
  const geoBox = document.getElementById("geoOutput");
  geoBox.classList.remove("d-none", "alert-danger", "alert-info");
  geoBox.classList.add("alert-info");
  geoBox.innerText = "Scanning telemetry tracking coordinate vectors...";
  if (!navigator.geolocation) 
  {
    geoBox.className = "alert alert-danger p-2 small mt-2";
    geoBox.innerText = "Geolocation engine missing over platform configuration variables.";
    return;
  }
  const trackingOptionsConfiguration = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(
    (positionCoordinateObject) => {
      const latVal = positionCoordinateObject.coords.latitude.toFixed(4);
      const lonVal = positionCoordinateObject.coords.longitude.toFixed(4);
      geoBox.className = "alert alert-success p-2 small mt-2";
      geoBox.innerHTML = `<strong>Telemetry Matrix Found:</strong> Lat ${latVal} | Long ${lonVal}`;
    },
    (errorFaultToken) => {
      geoBox.className = "alert alert-danger p-2 small mt-2";
      geoBox.innerText = `Error Flag (${errorFaultToken.code}): Processing coordinates rejected.`;
    },
    trackingOptionsConfiguration
  );
}
function clearLocalPreferencesStorage() 
{
  localStorage.removeItem("preferredCategory");
  localStorage.removeItem("isReturningUser");
  sessionStorage.removeItem("currentUser");
  
  alert("Local cache parameters and operational configuration matrices cleared.");
  window.location.reload();
}