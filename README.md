### TECHSTACK

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-%230F0813.svg?style=for-the-badge&logo=Turborepo&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-192a32?style=for-the-badge&logo=prettier&logoColor=dc524a)

#### API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

#### FRONTEND

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Axios](https://img.shields.io/badge/AXIOS-blueviolet.svg?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAC4AAAApCAMAAAB9Yuu9AAAAe1BMVEVnHd9oH99qIt9yLeF0MOF%2BP%2BSDRuWMVOeTX%2BiUYOiYZemeb%2BqfceunfOyyje%2B6mPDFqfPJrvTMs%2FTPuPXRu%2FbYxffZxvfZx%2Ffayfjf0Pni1Pnl2Prs4vvs4%2Fvu5fzu5vzv6Pzy6%2F318P349P769%2F76%2BP77%2BP79%2FP%2F%2F%2F%2F9VmOneAAAAg0lEQVR42u3UNQIDMRBDUS06zMycuf8FA61ZTXB%2F%2FQyVIFQVd%2FKhODr3bXzh0MuiznymBoIfGX5pjgi%2BLUHwWQaCdxPE81MDIPh6MpkM4vmzzTt5xTOlVOsYzR%2BpgxC8fSU%2Bk%2FaYv%2BdzIXhnJwQnVmwLjF38YLk96YmLr8RoP6UnteJ32j4RLwzsP6sAAAAASUVORK5CYII%3D)

### FEATURES IN API

-   Authorization
    -   [✅] - creating new accounts
    -   [✅] - logging to accounts
    -   [✅] - change password
-   User
    -   [✅] - getting user data, follows count, following count, posts count
    -   [✅] - updating avatar, bio, account label
    -   [✅] - following / unfollowing user
    -   [✅] - searching user
-   Content
    -   [✅] - uploading images
    -   [✅] - getting uploaded images
-   Posts
    -   [✅] - creating a post with list of images, description
    -   [✅] - getting post
    -   [✅] - getting all posts for one user
    -   [✅] - liking / unliking a post
    -   [✅] - tags
-   Comments
    -   [✅] - creating a comment for a post
    -   [✅] - getting all comments for a post
-   Messages [❌]
-   Reels [❌]
-   Stories [❌]
-   Recommendations [✅] (partly, not the best way)

### FEATURES IN FRONTEND

-   Base
    -   UI almost copied from real instagram
    -   light / dark mode
-   Authorization
    -   Logging to account
    -   Registering new account
    -   Changing password if forgot
-   Navbar
    -   searching users and tags
    -   explore page
    -   create post modal
    -   home page
    -   my profile url
    -   "more" dropdown with changing theme, logout and profile settings
-   Settings
    -   changing / deleting avatar
    -   changing account label
    -   changing biogram
    -   changing password
-   Home page
    -   posts from explore tab but presented in single posts
-   Searching
    -   searching users using Levenshtein algorithm
    -   searching tags if search string is started with "#"
-   Explore Page
    -   recommended posts presented in multiple posts
    -   with tag param, presented recommended posts only with this tag
-   Create modal
    -   uploading files from computer
    -   cropping images to 4/5 format
    -   can add / remove more photos to one post
    -   almost 40 filters to every image
    -   description to post
    -   tags to post with helpers by most popular tags
-   Post modal
    -   can change images with there are more than one
    -   description of post
    -   tags of post (url to explore this tag)
    -   post comments
    -   likes count
    -   possibility to like, comment, and share (copy link to post, but sometimes is bugged idk why)
-   Profile page
    -   followers / following / posts count
    -   possibilty to folow / unfollow user
    -   label and bio of this user
    -   users posts with likes and comments count
-   404 page

### TODO

-   Reels
-   Messages
-   Stories
-   Locales
-   Unit and integrations tests
-   Docker setup
-   Improve recommendation algorithm, because now is so bad
