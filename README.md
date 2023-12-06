# kurly

## 깃허브 배포

1. 리파지토리 생성
    - kurly

2. Settings
    - Pages 클릭 > GitHub Pages > Build and deployment (branch) > none 선택 master > 배포주소.io

3. pakage.json
    - "homepage": "https://myusername.github.io/my-app"
    - "homepage": "https://melonstone.github.io/kurly"

4. 깃설정
    - git init
    
5. 깃환경(config) 설정(name, email)
    - git config user.name "melonstone"
    - git config user.email "kyscoo@naver.com"

6. 리모트 오리진 추가
    - git remote add origin https://github.com/melonstone/kurly.git

7. 스테이징(add)
    - git add .

8. 커밋(commit)
    - git commit -m 'Kurly 프로젝트 배포'

9. 푸쉬(push)
    - git push origin master

10. Deployment
    
    ### Github Pages
.......
    Step 1: Add homepage to package.json
        "homepage": "https://melonstone.github.io/kurly"

    Step 2: Install gh-pages and add deploy to scripts in package.json
        npm install --save gh-pages
        npm i gh-pages

---------------------------------------------------------
        배포 속성 추가하기
            package.json script에 추가한다

        * branch 배포
            "predeploy": "npm run build",
            "deploy": "gh-pages -d build"

        * master 배포
            "predeploy": "npm run build",
            "deploy": "gh-pages -b master -d build"
---------------------------------------------------------
        package.json 저장한다

    Step 3: Deploy the site by running npm run deploy
        build
        npm run deploy

       
......
