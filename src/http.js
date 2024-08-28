export async function fetchAvailableMeals() {
     // Send a GET request to the specified URL
     const response = await fetch('http://localhost:3000/meals');
     // Parse the response data as JSON
     console.log(response)
     const meals = await response.json();
     // Check if the response status is not OK (not in the 200-299 range)
     if (!response.ok) {
         // Throw an error if the fetch request failed
         throw new Error("Failed to fetch places");
     }
     // Return the places data from the response
    
     return meals;
}



export async function submitOrder(items, customerData) {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: {
            items,
            customer: customerData,
          },
        }),
      });
  
      // Check if the response is okay (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Convert the response to JSON
      const result = await response.json();
  
      // Handle the response (e.g., log it or update the UI)
      console.log('Order submitted successfully:', result);
      
      // You can return the result if needed
    //   return result;
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      console.error('Error submitting the order:', error);
    }
  }
  