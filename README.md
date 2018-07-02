# Cab-trips

## Install

Download or clone the project and run 

$ `npm install`

## Running the app

This app requires the local instance of mysql running. Please update the mysql connection details in connection.js file.

Run following command to start app: 
`npm start`

This will run the server listening on localhost:3000

Endpoints:
1. To calculate trips using cache:
http://localhost:3000/trips, there are two query parameters - medallionArray and dateIn
http://localhost:3000/trips?medallionArray=array of medallion&dateIn=date for which trips are required

Example of this is following:
http://localhost:3000/trips?medallionArray=["A18CC3E9191D21F604DFC2423916E6A2", "B672154F0FD3D6B5277580C3B7CBBF8E", "E579E10E8266E926D6122CD8633FCD82", "F8897EEB725EA8BCEA42E48D3E46F0FE" ]&dateIn="06/12/2013"

2.To calculate trips without cached data:
http://localhost:3000/trips/noCache, there are two query parameters - medallionArray and dateIn
http://localhost:3000/trips/noCache?medallionArray=array of medallion&dateIn=date for which trips are required

Example of this is following:
http://localhost:3000/trips/noCache?medallionArray=["A18CC3E9191D21F604DFC2423916E6A2", "B672154F0FD3D6B5277580C3B7CBBF8E", "E579E10E8266E926D6122CD8633FCD82", "F8897EEB725EA8BCEA42E48D3E46F0FE" ]&dateIn="06/12/2013"

3. To clear the cache:
http://localhost:3000/trips/clearCache