# Run 
```bash
  npm install 
  
  npm install firebase 
  
  npm install react-leaflet

  npm install react react-dom leaflet
```


-> after cloning the git.

## both frontend and backend code can be found here , since we hosted backend in azure and are using api you can directly just clone the git and run the above commands start using it


# live hosting of project
-> https://faunadive.abhinavramakrishnan.tech/

<br/>


# GDSC Solutions Challenge

## Project Fauna Dive 

A Fisherman’s end to end application that saves him from crossing borders to finding where fishes exist and having the best supply chain optimization for the market to maximize each fisherman’s profit.

In short , “A community based Fishing Management App”

## Problem Statement:
The fishing industry faces challenges such as overfishing, inefficient resource utilization, and the need for real-time border monitoring.
Who is experiencing the problem?
The fishing community, including individual fishermen and related stakeholders.
### What is the problem? 
•	Lack of affordable GPS devices for fishermen.
•	Unintentional and intentional border crossings during fishing activities.
•	Inefficient fishing practices leading to unsustainable yields.
•	Lack of market connectivity and updates.
### Where/when is the problem occurring?
The problem occurs globally, particularly in regions where fishing is a primary economic activity.
### Why is it a problem? Why is it important to address?
•	Threat to marine ecosystems.
•	Legal complications and conflicts arising from border crossings.
•	Economic instability within fishing communities.

### UN Sustainable Development Goals :
The solution aligns with UN Sustainable Development Goals, particularly Goal 8 (Decent Work and Economic Growth), Goal 9 (Industry, Innovation, and Infrastructure), Goal 12 (Responsible Consumption and production), and Goal 14 (Life Below Water).
        

## Solution Overview:
We propose a comprehensive solution consisting of three main components: border monitoring, sustainable fishing practices, and supply chain management.
Border Monitoring:
Integrating LORA technology into smart buoys to alert fishermen of proximity to international borders, addressing unintentional border crossings.
Sustainable Fishing Practices:
Utilizing data collected from smart buoys to analyze environmental parameters and predict fish populations, guiding fishermen towards sustainable fishing areas.
Supply Chain Management:
Implementing a real-time supply chain management app that connects fishermen directly with the market. Features include:
•	Community-based networks to optimize fishing efforts.
•	Real-time updates of catch data to facilitate market demand analysis.
•	Options for buyers to purchase directly from fishermen or from community storage, reducing wastage and ensuring continuous cash flow.

## Highlighting Points :
•	Improved fish stock management: 
More accurate data leads to better fishing practices and c	onservation efforts.
•	Reduced bycatch: 
Targeting specific species means fewer unwanted fish are caught.
•	Increased efficiency:
 Fishermen spend less time searching and more time catching the fish they want.
•	Scientific research: 
Data can be used to study fish populations, migration patterns, and ocean health.
Future Scope:
Further enhancements may include integrating additional environmental sensors into smart buoys for enhanced data collection and analysis.




## Key Features:
![image](https://github.com/Barathj121/faunadive/assets/110909380/440c1d16-c603-4c09-bfc3-f856d5756fb9)

 
### 1.	Smart Border Monitoring:
![image](https://github.com/Barathj121/faunadive/assets/110909380/e83ea2cd-d087-462c-999f-6ddbb1f01c24)

•	Integration of Long-Range (LORA) technology with smart buoys to detect border proximity.
•	Alerts fishermen when nearing international borders to prevent unintentional crossings.
### 2.	Data-driven Fishing Recommendations:
•	Collect environmental data (e.g., temperature, pH, nitrate, ammonia, turbidity) via LORA devices.
•	Analyze data using machine learning algorithms to predict optimal fishing zones and prevalent fish species.
### 3.	End-to-End App for Sustainable Fishing:
•	Guide fishermen towards sustainable fishing practices and maximize profit.
•	Provide real-time suggestions on where to fish based on environmental data and border proximity.
### 4.	Supply Chain Management:
•	Connect fishermen directly with the market via a supply chain management app.
•	Join community groups based on location and interests to receive tailored fishing recommendations.
•	Based on recommendation of fish , recommend the net and fishing gears to maximize the probability of catching it too.
### 5.	Community Storage for efficient supply chain management :
•	Fishermen utilize these facilities to store excess catch during peak harvesting periods or when market demand is low or if some community catches fish othe rthan the suggested ones
•	Buyers have the option to buy from the storage or buy from the suggested sellers based on their interets and needs as storage might have the required quantity.

### 6.	Species Monitoring:
•	Track the types and quantities of fish caught by each fisherman.
•	Leverage machine learning for species identification, enhancing accuracy and contributing to biodiversity conservation.
### 7.  Breeding Season Adjustments:
•	Integrate AI models to predict fish breeding seasons, allowing dynamic adjustments to fishing quotas.
•	Provide real-time recommendations to avoid targeting specific species during critical reproductive periods.

### 8.   Real-time Market Analysis and data capture:
•	Enable fishermen to update their catch in real-time on the app.
•	Allow buyers to place demands for specific fish types and quantities, facilitating real-time market analysis.

### 9. Direct Market Connections:
•	Buyers can choose to purchase directly from recommended fishermen or from community storage.
•	Ensure cash flow and reduce waste by allowing storage and sale of excess catch

### 10. Fishery Chatbot Support :
•	Integrate a chatbot powered by AI to provide instant support and guidance to fishermen answer queries regarding fishery and fishes




## Technology Overview
## Architecture:
The Community-Based Fishing Management  App adopts a modular architecture, utilizing a mix of versatile technologies to provide a seamless and robust solution.

 ![image](https://github.com/Barathj121/faunadive/assets/110909380/ad6cca6f-ca68-4fb8-a0d1-ad4ee335794a)

## High-Level Components:
### 1.	User Interface (UI):
•	Frontend Website: Developed using React.js for a dynamic and responsive web application.
•	Mobile App: Built with Flutter for cross-platform compatibility and a consistent user experience.
### 2.	Backend Server:
•	Employs FastAPI, a lightweight and flexible Python web framework, for implementing catch scheduling algorithms, ML Algorithms.
### 3.	Database, Authentication, and Real-time Alerts:
•	Leverages Firebase for its comprehensive suite of services, including Firestore for database management, Firebase Authentication for secure user authentication, and Firebase Cloud Messaging for real-time alerts.
### 4.	Smart Buoys and Border Alert System:
•	Incorporates custom hardware with Long-Range (LORA) communication technology for the smart buoys, enhancing the Border Alert System's accuracy and responsiveness.
### 5.	External APIs:
•	Utilizes Bard API and Gemini AI API for integrating a chatbot that provides intelligent responses and recommendations. External LLM models from open-source was also used and tested

## Specific Products and Platforms Implemented:
•	Frontend Website: React.js
•	Mobile App: Flutter
•	Backend Framework: FastAPI
•	ML Framework : Custom ML models and Firebase ML 
•	Database, Authentication, and Real-time Alerts: Firebase
•	Smart Buoys: Custom hardware with LORA communication
•	Chatbot and Recommendations: Gemini AI API, open-source LLMs

## Working of App:
### 1)Border Alert System : 
 ![image](https://github.com/Barathj121/faunadive/assets/110909380/2fa26597-10f0-42d0-a420-351872be2820)

As Smart Buoy’s are commonly existing in the national river bodies and are present to collect data for predicting weather and pollution we utilize it by adding a LoRa SX1728 modules to each buoys. By adding these we create a zone of communication for each buoys.
After adding all these by research and study says LoRa has more than 10km to 20km range for transferring data. By this we create a mesh of all buoy’s and connecting all buoy’s together so if a ship comes into contact of one buoy all the buoy’s data can be found. 
By utilizing this mechanism we hardcode each GPS location of latitude and longitude into the LoRa of each buoy , as we know the international border coordinates once a ship comes into zone of a buoy through the buoy’s location we can identify how far he is from border and send an alert to him , if he is very near to it , it calculates distances based on the coordinates and returns the alert “1” which will be displayed as near the border and sent by which buoy with it's ID
 
### 2) Optimal Fishing Zone identification and Fish type finder:
![image](https://github.com/Barathj121/faunadive/assets/110909380/3ca3eb13-b13c-4ae1-b94a-e60cd1c93010)


As shown above we set up coastal unit which will receive data from all the buoy’s by being in contact to one buoy. Based on the data it acquires from Buoys’ : Ammonia, Nitrate, O2, Temperature, pH, turbidity we predict the optimal zones for the fishes and find the fish weight and fish length available in the zones. Based on the fish length and weight we again predict which kind of fish will be available in that zone. The type of fish might not be reliable all the times but optimal fishing zones identification proves to be accurate and efficient.
 
### 3) Supply Chain Management: 
As mentioned buyers(from market ) put all their needs and specific requirements into our app and based on that sellers are given suggestions based on that. 
 ![image](https://github.com/Barathj121/faunadive/assets/110909380/dc703c86-61bc-48cb-afd8-c5ec035240dd)

How suggestions are made is fishermen are asked to join a community and asked their preference of fishes. Once they  join and based on the location of the community and present season considering the breeding season ,market demand of each fishes  etc we suggest the communities to catch the fishes to have maximum profit. Also for each fish we suggest the gears or fishing nets to be used which is again validated from fishermen that maximizes the probability of catching that suggested fish type.
After the catch is done , the fishermen are asked to update the data capture on how much kg they have caught for each type which is used for supply chain management.
As there are circumstances where fishermen might catch the fishes that are not suggested or overfish the suggested more than required or his catch go unsold we introduce a community storage platform where each community stores the fishes remained based on the type and update the quantity and type in the app which will be available for buyers to buy from.
 ![image](https://github.com/Barathj121/faunadive/assets/110909380/0afc0a56-eecd-4aaf-9da3-8b98c84c5f85)


Buyers as given freedom have a choice to buy from either storage available or buy from the suggested community as fresh catch but may or may not the meet the quantity requirements.
He can buy any amount from the storage or buy from the suggested sellers on how much he caught which is upto him.
By the above the complete supply chain management is managed.

-> This is the complete workflow of the app and how unintentional border crossings are alerted and intentional border crossing is diverted by identifying fishing zones and maximizes profit for fish caught which doesn’t force them to cross.


## Conclusion:
The Community-Based Fishing Management App addresses critical challenges faced by the fishing community, offering solutions for border monitoring, sustainable fishing practices, and efficient supply chain management. By leveraging technology and data-driven insights, the app aims to promote environmental sustainability and economic stability within the fishing industry.



