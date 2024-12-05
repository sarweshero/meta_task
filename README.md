#backend
pyton -m venv env
env\scripts\activate.bat

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver

#frontend
npm install
npm i axios react-route-dom jwt-decode
npm run dev
