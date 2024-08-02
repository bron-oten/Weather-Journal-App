// /* Global Variables */
// let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid='
// let apiKey = '483a8102142c06d859acd05f54f929bd';

// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

// document.getElementById('generate').addEventListener('click', performAction);

// function performAction(e){
//     getZipCode(baseURL, apiKey)
// }

// const getZipCode = async (baseURL, feelings, apiKey) =>{

//     const res = await fetch(baseURL+feelings+apiKey)
//     try {
//         const data = await res.json();
//         console.log(data)
//     } catch(error) {
//         console.log("error", error);
//     }
// }

// const retrieveData = async () =>{
//     const request = await fetch('/all');
//     try {
//     // Transform into JSON
//     const allData = await request.json()
//     console.log(allData)
//     // Write updated data to DOM elements
//     document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
//     document.getElementById('content').innerHTML = allData.feel;
//     document.getElementById("date").innerHTML =allData.date;
//     }
//     catch(error) {
//       console.log("error", error);
//       // appropriately handle the error
//     }
//    }

const apiKEY = '483a8102142c06d859acd05f54f929bd&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Define an async function that makes a GET request to the OpenWeatherMap API
async function getWeather(zipCode) {
  // Construct the URL for the API request
  const url = `${baseURL}?q=${zipCode}&appid=${apiKEY}`;

  // Make the GET request using fetch 
  const response = await fetch(url);

  // Parse the JSON data from the response 
  const data = await response.json();

  // Return the data 
  return data;
}

document.getElementById('generate').addEventListener('click', generateClickHandler);

function generateClickHandler() {
  const zipCode = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;

  getWeather(zipCode)
    .then(data => {
      const temperature = data.main.temp;
      const date = new Date().toLocaleDateString();

      const dataToSend = {
        temperature,
        date,
        userResponse
      };

      return postData('http://localhost:5001/addProjectData', dataToSend); // Update the port here
    })
    .then(responseData => {
      console.log(responseData);
      document.getElementById('temp').innerHTML = Math.round(responseData.temperature) + ' Degrees';
      document.getElementById('date').innerHTML = responseData.date;
      document.getElementById('content').innerHTML = responseData.userResponse;
    })
    .catch(error => {
      console.error(error);
    });
}

async function postData(path, data) {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  return responseData;
}
