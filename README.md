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

## Conclusion:
The Community-Based Fishing Management App addresses critical challenges faced by the fishing community, offering solutions for border monitoring, sustainable fishing practices, and efficient supply chain management. By leveraging technology and data-driven insights, the app aims to promote environmental sustainability and economic stability within the fishing industry.



