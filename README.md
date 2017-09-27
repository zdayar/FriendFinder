# FriendFinder


This is a compatibility-based "FriendFinder" application -- basically a dating app. This full-stack site will take in results from the users' surveys, thens compare their answers with those from other users. The app then displays the name and picture of the user with the best overall match. 

Express is used to handle routing. The app runs on port 3500. 

Inside the root folder, directories are organized as follow:
  ```
  FriendFinder
    - app
      - data
        - friends.js
      - public
        - home.html
        - survey.html
      - routing
        - apiRoutes.js
        - htmlRoutes.js
    - node_modules
    - package.json
    - server.js
  ```

### Instructions

1. The survey should has 10 questions. Each answer is on a scale of 1 to 5 based on how much the user agrees or disagrees with a question.

2. `server.js` file requires the basic npm packages `express` and `body-parser`.

3. `htmlRoutes.js` includes two routes:

   * A GET Route to `/survey` which displays the survey page.
   * A default, catch-all route that leads to `home.html` which displays the home page. 

4. `apiRoutes.js` contains two routes:

   * A GET route with the url `/api/friends`. Used to display a JSON of all possible friends.
   * A POST routes `/api/friends`, used to handle incoming survey results. This route is also used to handle the compatibility logic. 

5. The application's data is saved in `app/data/friends.js` as an array of objects. 

6. The user's most compatible friend is determined using the following as a guide:

   * each user's answers are converted into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, we compare the difference between current user's scores against those from other users, question by question. Then we add up the differences to calculate the `totalDifference`.
     * Example: 
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * We use the absolute value of the differences. 
   * The closest match will be the user with the least amount of difference.

7. Once we've found the current user's most compatible friend, we display the result as a modal pop-up.
   * The modal displays both the name and picture of the closest match. 