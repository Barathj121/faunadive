import { list } from 'postcss';
import React, { useState, useEffect } from 'react';

function sellerhome() {

    // Sellers page 
    // I)PROFILE PAGE 
    // under that 
    // a) fields to enter worktike , overtime , fish he can catch how much he can meet demand 
    // b) schedule for the week, recommended fish and net type 
    // c) join community or allot a community 
    // d) profile , sale , finance report 
    
// const apiurl="https://example-to9v.onrender.com/add/10";

const [sellers, setSellers] = useState([]);
const [number,setnumber]=useState(0);
// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiurl);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const json = await response.json();
//         console.log(response);
//         setSellers(json);
//       } catch (error) {
//         console.error('There was an error!', error);
//       } finally {
//         console.log('finally');
//       }
//     };
//     fetchData();
//   }, []);

const scheduleapi="https://serious.onrender.com/schedule/";
const [schedule, setSchedule] = useState([]);

  function addnumber(number){
    const apiurl="https://example-to9v.onrender.com/add/"+number;
    const fetchData = async () => {
      try {
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        
        setSellers(json);
        console.log(sellers);
      } catch (error) {
        console.error('There was an error!', error);
      } finally {
        console.log('finally');
      }
    };
    fetchData();
    }
    function scheduledetails(){
      
      const fetchData = async () => {
        try {
          const response = await fetch(scheduleapi);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await response.json();
          console.log(response);
          setSchedule(json);
        } catch (error) {
          console.error('There was an error!', error);
        } finally {
          console.log('finally');
        }
      };
      fetchData(),[];
      }



    


    return (
        <div>
            <h1>Seller Home</h1>
            
            <input  onChange={(e) => setnumber(e.target.value)} type='number' placeholder='Enter the number' />
            <button onClick={() => addnumber(number)} className=" border-2 ">Add number</button>
            <pre>{sellers.result}</pre>
            <button onClick={() => scheduledetails()} className=" border-2 ">Get Schedule</button>
            <pre>{schedule.schedule}</pre>

        </div>

    )
}

export default sellerhome;

//i/p:
//[commmunity1,commmunity2,commmunity3,commmunity4,commmunity5,commmunity6,commmunity7]

//o/p:
//{
//   schedule:
//   {community1:["SATURDAY","salon","net1"]},
//   {community2:["SATURDAY","salon","net1"]},
//   {community3:["SATURDAY","salon","net1"]},
//   {community4:["SATURDAY","salon","net1"]},
//   {community5:["SATURDAY","salon","net1"]
//   {community6:["SATURDAY","salon","net1"]},
//   {community7:["SUNDAY","touna","net1"]},
// }
