

import "./Listpage.scss";
import Filter from "../../filter/Filter";
import Card from "../../card/Card";
import Map from "../../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
function Listpage (){

 const data = useLoaderData();
 //console.log(data);
    return (<>
        <div className="Listpage">
            <div className="listContainer">
                <div className="wrapper">
                  <Filter/>
                 <Suspense fallback={<p>Loading...</p>}>
                 <Await
          resolve={data.postResponse}
          errorElement={<p>Error loading posts!</p>}
        >
          {(postResponse) =>
          postResponse.data.map((post)=>(
            <Card key={post.id} item={post} />
          )
         ) }
        </Await>
                 </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                {/* <Map items={posts}/> */}
                <Suspense fallback={<p>Loading...</p>}>
                 <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error loading posts!</p>
          }
        >
          {(postResponse) => <Map items={postResponse.data}/>}
        </Await>
                 </Suspense>
            </div>
        </div>
    </>);
}

export default Listpage;