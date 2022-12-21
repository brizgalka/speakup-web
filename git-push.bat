git add .
git commit -m "new commit"
git branch -M dev
git remote add speakup-web https://github.com/brizgalka/speakup-web.git
git pull speakup-web dev
git push speakup-web dev