import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards from "../components/cards";

function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,setsearch] = useState(" ")

  const loadData = async () => {
    try {
      const fetchResponse = await fetch("http://localhost:5000/api/fooddata", {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await fetchResponse.json();

      setfoodItem(responseData[0]);
      setfoodCat(responseData[1]);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
      <div id="carouselExampleFade" class="carousel slide carousel-fade" style={{objectFit:"contain !important"}} data-bs-ride="carousel">
  <div class="carousel-inner" id="carousel">
  <div className="carousel-caption" style={{zIndex:"10"}}>
        <div class="d-flex justify-content-center">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
      
    </div>
        </div>
    <div class="carousel-item active">
      <img src="https://www.cdc.gov/foodsafety/images/comms/features/GettyImages-1091281658-500px.jpg?_=74029" style={{filter: "brightness(30%)"}} class="d-block w-100 h-50" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://cdn.sanity.io/images/cctd4ker/production/9296da795070ca0b6d9147d9507ab54d9e2dba84-1440x960.jpg?w=3840&q=75&fit=clip&auto=format" class="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg" style={{filter: "brightness(30%)"}} class="d-block w-100 h-50" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
 
      </div>

      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName)
                  && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                  )
                  .map((filteritems) => (
                    <div key={filteritems._id} className="col-12 col-md-6 col-lg-4">
                      <Cards
                        foodItems = {filteritems}
                        options={filteritems.options[0]}
                        
                      />
                    </div>
                  ))
              ) : (
                <div>Not Found Data </div>
              )}
            </div>
          ))
        )}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
