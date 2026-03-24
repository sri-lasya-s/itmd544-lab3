In this assignment, I built a REST API for a UX Research Study Tracker. The API allows users to create, view, update, and delete studies, and 
also includes a custom endpoint to show active studies. I chose this domain because I am interested in UX and it felt easier for me to understand 
compared to other options. I used Node.js, Express, and openapi-backend to build the API. At first, I did not fully understand how everything works, 
but as I followed the steps, I learned how to connect the OpenAPI file with the backend code and how the endpoints work.
One important thing I learned is the contract-first approach. Instead of writing code first, I had to define the API in a YAML file. 
This file controls how the API behaves, including validation. Because of this, I did not need to write manual validation code, and the API automatically 
returned errors like 400 when the input was wrong. I faced several challenges while working on this assignment. I was confused about how to connect operationIds, 
how to test using Swagger UI, and how to fix errors. Deployment was also difficult at first, especially setting up GitHub and Render. But after trying step by step,
I was able to complete it. Compared to writing code first, I think the contract-first approach is more structured because it clearly defines what the API should do 
before coding. Even though it was confusing in the beginning, it helped me understand how APIs are designed and tested.
Overall, this assignment helped me learn how to build and deploy an API, even though I found some parts difficult.
