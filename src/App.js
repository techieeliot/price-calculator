import { useState, useEffect } from "react";

const App = () => {
  const [region, setRegion] = useState('');
  const [numberOfMessages, setNumberOfMessages] = useState('');
  const [result, setResult] = useState("hello");
  const API_URL_BASE =
    "https://axon-cloud-console.dev.axoniq.net/api/public/price/";
  
  const options =
    [
      { locale: "us-east1", isSupported: "yes" },
      { locale: "europe-west4", isSupported: "yes" },
      { locale: "northamerica-northeast2", isSupported: "yes" },
      { locale: "asia-east1", isSupported: "yes" },
      { locale: "asia-south2", isSupported: "no" },
      { locale: "asia-southeast1", isSupported: "no" },
      { locale: "europe-west2", isSupported: "no" },
      { locale: "asia-east2", isSupported: "yes" },
      { locale: "australia-southeast1", isSupported: "no" },
      { locale: "southamerica-east1", isSupported: "yes" },
    ]

  useEffect(() => {
    console.log("effect");
    console.log(region)
    const fetchRegionResponse = async () => {
      if (!region) return;
      try {
        const response = await fetch(
          `${API_URL_BASE}cluster?region=${region}`
          );
          if (!response.ok) throw Error("Not Found");
          const data = await response.json();
          setResult({
            large: data.pricePerClusterType.Large.monthlyFee,
            small: data.pricePerClusterType.Small.monthlyFee
          });
        } catch (error) {
          console.log(error)
        }
      }
      
      fetchRegionResponse();
      
      
      // }
  }, [numberOfMessages, region]);
  
   useEffect(() => {
      
// const fetchNumberOfMessagesData = async () => {

//     try {
//       const response = await fetch(
//         `${API_URL_BASE}context?numberOfMessages=${numberOfMessages}`
//       );
//       if (!response.ok) throw Error("Not Found");
//       const data = await response.json();
//       console.log(response.body);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchNumberOfMessagesData();
      
      // }
  }, [numberOfMessages]);  
    return (
    <div className="App">
      <div>
        <label htmlFor="region">Choose a region:</label>

        <select name="regions" id="region-select"
          name="region"
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
            <option value="">--Please choose an option--</option>
          {
            options.map((option, index)=>
              <option
                key={index}
                value={option.locale}
                disabled={option.isSupported === "yes" ? false : true }
              >
                {`${option.locale} - ${option.isSupported === "yes" ? "supported" : "coming soon"}`}
              </option>)
          }
        </select>
      </div>
      <div>
        {region && result &&
          (<div>
            <div >
            Select a cluster type
        </div>
          <input type="radio" id="result" name="fee"   value={result.large} />
          <label htmlFor="fee">
           {result.large} 
          </label>
          <input type="radio" id="result" name="fee"  value={result.small} />
          <label>
          {result.small}
          </label>


          </div>)
        }
      </div>

      <div>
        <label htmlFor="number-input">Input a number of messages:</label>
        <input
          name="number-input"
          type="text"
          value={numberOfMessages}
          onChange={(e) => setNumberOfMessages(e.target.value)}
        />
      </div>

    </div>
  );
}

export default App;
