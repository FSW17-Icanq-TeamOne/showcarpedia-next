let categories = []
let brands=[]
let years=[]
const grades = ["1", "2", "3", "4", "5"];

const fetchData = async () => {
    const response = await fetch("http://localhost:3001/v1/cars/make/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    // years = data.year.map((e) => e.year)
    brands = data.brand.sort()
    categories = data.category.sort()
  };

fetchData()

export {categories,brands,years,grades}